import express from "express";
import homeController from "../controller/homeController";
import userController from  "../controller/userController";

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

    app.use('/', router);

}

module.exports = initWebRoutes;
