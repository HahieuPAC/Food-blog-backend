import express from "express";
import homeController from "../controller/homeController";
import userController from  "../controller/userController";
import doctorController from "../controller/doctorController";

let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud?:id', homeController.getEditCRUD);

    router.post('/put-crud', homeController.putCRUD)
    router.post('/post-crud', homeController.postCRUD);
    router.get('/delete-crud', homeController.getDeleteCRUD);
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-user', userController.handleGetAllUser);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/allcode', userController.getAllCode);
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctor', doctorController.getAllDoctor);


    app.use('/', router);

}

module.exports = initWebRoutes;
