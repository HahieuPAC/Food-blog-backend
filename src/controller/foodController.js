import express from "express";
import db from '../../models/index';
import CRUDFoodService from "../service/CRUDFoodService";
import CommonUtils from "../tools/CommonUtils";
const fs = require('fs');

let getCRUDFood = (req,res) => {
    return res.render('crudFood');
}

let postCRUDFood = async (req,res) => {
    let message = await CRUDFoodService.createNewFood(req.body);
    console.log(message);
    return res.redirect('/crud-food');
}

let getAllFoodInfo = async (req, res) => {
    try {
        let data = await CRUDFoodService.getAllFoodInfo();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    } 
}

let getAllCode = async (req, res) => {
    try {
        let data = await CRUDFoodService.getAllCode(req.query.type);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    } 
}

let handleCreateNewFood = async (req,res) => {
    try {
        console.log(">> check handleCreateNewFood: ", req.body)
        let message = await CRUDFoodService.handleCreateNewFood(req.body);
        return res.status(200).json(message);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}


module.exports = {
    getCRUDFood,
    postCRUDFood,
    getAllFoodInfo,
    getAllCode,
    handleCreateNewFood
}