import express from "express";
import db from '../../models/index';
import {createNewUser} from "../service/CRUDService";


let getHomePage = async (req,res) => {
    try {
        let data = await db.user.findAll();
        return res.render('homePage', {
            data: JSON.stringify(data),
        });
    } catch (error) {
        console.log(error)
    }
}

let getAboutPage = (req,res) => {
        return res.render('test/about');
}

let getCRUD = (req,res) => {
    return res.render('crud');
}

let postCRUD = async (req,res) => {
    await createNewUser(req.body);
    return res.send('postCRUD from sv');
}


module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD
}