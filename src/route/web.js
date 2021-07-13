import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);   //lưu dlieu xuống db
    router.get('/get-crud', homeController.displayGetCRUD);   //hiện dlieu ra ngoài dùng get
    router.get('/edit-crud', homeController.getEditCRUD);   // tạo sửa dlieu
    router.post('/put-crud', homeController.putCRUD);   // update dlieu
    router.get('/delete-crud', homeController.deleteCRUD);   // xóa dlieu
   
    router.post('/api/login', userController.handeLogin)

    return app.use("/", router);
}

module.exports = initWebRoutes;