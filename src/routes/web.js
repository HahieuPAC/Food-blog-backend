import express from "express";
import homeController from "../controller/homeController";
import userController from  "../controller/userController";
import doctorController from "../controller/doctorController";
import patientController from "../controller/patientController"

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
    router.post('/api/save-info-doctor', doctorController.postInfoDoctor);
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate);
    router.get('/api/get-extra-info-doctor-by-id', doctorController.getExtraInfoDoctorById);
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);

    router.post('/api/patient-book-appointment', patientController.postBookAppointment);
    


    app.use('/', router);

}

module.exports = initWebRoutes;
