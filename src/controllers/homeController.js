import db from '../models/index';
import CRUDService from "../services/CRUDService";
let getHomePage = async (req, res) => {
    try{
let data=await db.User.findAll();

    return res.render('homepage.ejs',{
            data:JSON.stringify(data)

    });
    }catch(e){
        console.log(e);
    }
    
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}


let getCRUD = (req, res) => {
    return res.render('test/crud.ejs');
}
let postCRUD = async (req, res) => {
    let message= await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud');
}

let displayGetCRUD = async(req, res) => {
    let data=await CRUDService.getAllUser();
    console.log('------------------');
    console.log(data);
    console.log('------------------');

    return res.render('test/display-CRUD.ejs',{
        dataTable:data
    });
}

let getEditCRUD= async (req,res)=>{
    let userId=req.query.id;  //lệnh lấy id url
    
    if(userId){
            let userData= await CRUDService.getUserInfoById(userId);
            // console.log('-------------');
            // console.log(userData);
            // console.log('---------------');
            return res.render('test/edit-CRUD.ejs',{
                user:userData
            });

    }else{
            return res.send("ko tồn tại")    //tạo chơi để test

    }
}

let putCRUD= async(req,res)=>{
    let data=req.body;
    let allUsers= await CRUDService.updateUserData(data);
    return res.render('test/display-CRUD.ejs',{
        dataTable:allUsers
    })
}


let deleteCRUD= async(req,res)=>{
    let id=req.query.id;
    if(id){
      await CRUDService.deleteUserById(id);
    return res.send('xóa thành công');  
    }else{
        return res.send('xóa thất bại');
    }
    
}

// khai báo các module để sử dụng
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD:getCRUD,
    postCRUD:postCRUD,
    displayGetCRUD:displayGetCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
    deleteCRUD:deleteCRUD
}
