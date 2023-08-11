import express from "express";
import { getHomePage, getAboutPage, getCRUD, postCRUD, displayGetCRUD, getEditCRUD, putCRUD } from "../controller/homeController";

let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', getHomePage);
    router.get('/about', getAboutPage);
    router.get('/crud', getCRUD);
    router.get('/get-crud', displayGetCRUD);
    router.get('/edit-crud?:id', getEditCRUD);

    router.post('/post-crud', postCRUD);

    router.put('/put-crud', putCRUD);
    app.use('/', router);

}

module.exports = initWebRoutes;
