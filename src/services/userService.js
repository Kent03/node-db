import db from '../models/index';
import bcrypt from 'bcryptjs'; 



let handleUserLogin=(email,password)=>{
return new Promise(async(resolve,reject)=>{
    try{
        let userData={};
          let isExist=await checkUserEmail(email);
          if(isExist){
              //người dùng tồn tại
              let user=await db.User.findOne({
                attributes: ['email','roleId','password'],
                  where:{email:email},
                  raw:true
                  
              });
              if(user){
             //ssanh pass
             let check=await bcrypt.compareSync(password, user.password); // false
            if(check){
                userData.errCode=0;
                userData.errMessage='ok',
console.log(user);
                delete user.password;
                userData.user=user;
             }else{
                userData.errCode=3;
                userData.errMessage='Wrong password';
             }

              }else{
                userData.errCode=2;
                userData.errMessage='user không tồn tại! '

              }

         
          }else{
              //lỗi
              userData.errCode=1;
              userData.errMessage='Email không tồn tại! hãy thử email khác'
              
          }
          resolve(userData)
    }catch(e){
        reject(e)
    }
})
}




let checkUserEmail=(userEmail)=>{
    return new Promise(async(resolve,reject)=>{
        try{
          let user =await db.User.findOne({
              where:{email:userEmail}
          })
          if(user){
              resolve(true)
          }else{
              resolve(false)
          }
        }catch(e){
            reject(e);
        }
    })
}


module.exports={
    handleUserLogin:handleUserLogin
}