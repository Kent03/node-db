import bcrypt from 'bcryptjs';  //thêm lib vào
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async(resolve,reject)=>{
        try{
         let hashPasswordFromBcrypt = await hashUserPassword (data.password);      //câu lệnh này copy bên tai lieu huong dẫn đổi var thành let vì thích vậy
         await db.User.create({         //truyền oject trong file user model để thêm mới tên
    email: data.email,
    password:  hashPasswordFromBcrypt ,
    firstName: data.firstName,
    lastName: data.lastName,
    address:data.address,
    phonenumber: data.phonenumber,
    gender:data.gender ==='1'? true :false,
    roleid:data.roleid
})
resolve('tạo user thành công')
        } catch(e){
            reject(e);
        }
    })
   
}



//cài lib bcryptjs
// password dạng mã hóa dưới db    dùng promise để đảm bảo hàm luôn trả ra kqua tránh bất đồng bộ trong js-
//  resolve: chạy nếu ok, ngược lại: reject
// cặp đôi async await có tác dụng giúp chạy đúng trình tự vì trong js cái nào đến trước thì chạy trước
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }


    })
}


//hiện danh sách người dùng
let getAllUser=()=>{
    return new Promise(async(resolve,reject)=>{
try{
     let users=db.User.findAll({
         raw:true,
     });
     resolve(users);
}catch(e){
    reject(e)
}
    })
}


let getUserInfoById=(usersId)=>{
    return new Promise(async(resolve,reject)=>{
        try{
      let user= await db.User.findOne({
          where:{id:usersId},raw:true,
      })
      if(user){
          resolve(user)
      }else{
          resolve({})
      }
        }catch(e){
            reject(e);
        }
    })
}


// code sửa du lieu ten, dia chỉ

let updateUserData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let user= await db.User.findOne({      //tìm user trong id với ddkien where
                where:{id:data.id}
            })
            if(user){
                //cập nhật thông tin mới qua biến db truyền vào
                user.firstName=data.firstName;
                user.lastName=data.lastName;
                user.address=data.address;

            //lưu infomation
                await user.save();

                let allUsers=await db.User.findAll();
                resolve(allUsers);
            }else{
                resolve();
            }

        }catch(e){
            console.log(e);
        }
    })
}


let deleteCRUD=(userId)=>{
    return new Promise(async(resolve,reject)=>{
         try{
            let user =await db.User.findOne({
                where: {id:userId}
            })
            
            if(user){
                await user.destroy();
            }
            resolve();   //lệnh thoát ra
         }catch(e){
             reject(e);
         }
    })
}



module.exports = {
    createNewUser: createNewUser,
    getAllUser:getAllUser,
    getUserInfoById:getUserInfoById,
    updateUserData:updateUserData,
    deleteUserById:deleteCRUD,
   
}