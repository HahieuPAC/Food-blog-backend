import express from "express";
import bodyParser from "body-parser"; //get query params
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import 'dotenv/config';
import connectDB from "../config/connectDB";

const app = express();
const port = process.env.PORT || 8081;
console.log('>>check port:', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// config app

configViewEngine(app);
initWebRoutes(app);
connectDB();

app.listen(port, () => {
    console.log ("Backend Nodejs is running on the port: ", port);
});