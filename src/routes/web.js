import express from "express";
import { getHomePage, getAboutPage, getCRUD, postCRUD, displayGetCRUD, getEditCRUD, putCRUD, getDeleteCRUD } from "../controller/homeController";

let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', getHomePage);
    router.get('/about', getAboutPage);
    router.get('/crud', getCRUD);
    router.get('/get-crud', displayGetCRUD);
    router.get('/edit-crud?:id', getEditCRUD);

    router.post('/put-crud', putCRUD)
    router.post('/post-crud', postCRUD);
    router.get('/delete-crud', getDeleteCRUD);

    app.use('/', router);

}

module.exports = initWebRoutes;
