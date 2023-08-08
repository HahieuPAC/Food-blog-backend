import express from "express";
import { getHomePage } from "../controller/homeController";

let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', getHomePage);

    router.get('/example', (req, res) => {
        return res.send('This is example page');
    });

    app.use('/', router);

}

module.exports = initWebRoutes;
