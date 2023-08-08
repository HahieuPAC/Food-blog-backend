import express from "express";
import bodyParser from "body-parser"; //get query params
import configViewEngine from "./src/config/viewEngine";
import initWebRoutes from "./src/routes/web";
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 8081;
console.log('>>check port:', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// config app

configViewEngine(app);
initWebRoutes(app);

app.listen(port, () => {
    console.log ("Backend Nodejs is running on the port: ", port);
});