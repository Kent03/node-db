import userService from "../services/userService";         //mới tạo trong folder services

let handeLogin=async(req,res)=>{
    let email=req.body.email;
    // console.log('your email:'+ email);
    let password=req.body.password;
    if(!email || !password){
        return res.status(500).json({
           errCode:1,
           message:'lỗi thiếu tham số đầu vào'
        })
    }

    let userData = await userService.handleUserLogin(email,password);
    //check email
    //compare pass
    //return userInfo
    //access_token:jwt   json web token
  return res.status(200).json({
    errCode:userData.errCode,
    message:userData.errMessage,
      user:userData.user ? userData.user:{}
  })
}
module.exports={
    handeLogin:handeLogin
}