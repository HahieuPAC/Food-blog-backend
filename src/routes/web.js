import express from "express";
import homeController from "../controller/homeController";
import userController from  "../controller/userController";
import doctorController from "../controller/doctorController";
import patientController from "../controller/patientController";
import specialtyController from "../controller/specialtyController";
import foodController from "../controller/foodController";

let router = express.Router();

let initWebRoutes = (app) => {
    //CRUD user
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud?:id', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD)
    router.post('/post-crud', homeController.postCRUD);
    router.get('/delete-crud', homeController.getDeleteCRUD);

    //CRUD food
    router.get('/crud-food', foodController.getCRUDFood);
    router.post('/post-crud-food', foodController.postCRUDFood);
    router.get("/api/get-all-food-info", foodController.getAllFoodInfo)
    router.get("/api/all-code", foodController.getAllCode);
    router.post('/api/create-new-food', foodController.handleCreateNewFood);


    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-user', userController.handleGetAllUser);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/allcode', userController.getAllCode);

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctor', doctorController.getAllDoctor);
    router.post('/api/save-info-doctor', doctorController.postInfoDoctor);
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate);
    router.get('/api/get-extra-info-doctor-by-id', doctorController.getExtraInfoDoctorById);
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);

    router.post('/api/patient-book-appointment', patientController.postBookAppointment);
    router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment);

    router.post('/api/create-new-specialty', specialtyController.createNewSpecialty);
    router.get('/api/get-specialty', specialtyController.getAllSpecialty);
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById)
    


    app.use('/', router);

}

module.exports = initWebRoutes;
