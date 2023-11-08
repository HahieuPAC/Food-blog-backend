import { resolve } from 'path';
import db from '../../models';
import { rejects } from 'assert';
import e from 'express';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const fs = require('fs');

let createNewFood = async (data) => {
    return  new Promise( async (resolve, reject) => {
        console.log(">> check data: ", data)
        try {
            if (!data.foodName || !data.characteristic || !data.categories)
            {
                resolve({
                    errCode: -1,
                    errMessage: "Missing your parameters!!!"
                })
            }
            await db.Food.create({
                foodName: data.foodName,
                image: data.image,
                characteristicId: data.characteristic,
                categoriesId: data.categories
            })
            resolve('Oke create a new food');

        } catch (error) {
            reject(error);
        }
    })
}

let getAllFoodInfo = () => {
    return new Promise( async(resolve, reject) => {
        try {
            let data = await db.Food.findAll();
            if (data) {
                resolve({
                    errCode: 0,
                    errMessage: "Get all food info succeed",
                    data: data
                })
            }            
        }
        catch (error) {
            reject(error)
        }
    })
}

let getAllCode = (typeInput) => {
    return new Promise( async(resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing your parameter"
                })
            }
            else {
                let res = {};
                let allCode = await db.AllCode.findAll({
                    where: { type: typeInput}
                });
                res.errCode = 0;
                res.data = allCode;
                resolve(res);
            }
        }
        catch (error) {
            reject(error)
        }
    })
}

let checkUsedFoodName = (foodName) => {
    return new Promise( async (resolve, reject) => {
        try {
            let food = await db.Food.findOne({
                where: {foodName: foodName}
            })
            if (food) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleCreateNewFood = (data) => {
    return new Promise( async (resolve, reject) => {
        let check = await checkUsedFoodName(data.foodName);
        if (check) {
            resolve({
                errCode: 1,
                errMessage: `Food's name is exist`});
        }
        else {
            try {
                await db.Food.create({
                    foodName: data.foodName,
                    characteristicId: data.characteristicId,
                    categoriesId: data.categoriesId,
                    image: data.image
                })
                resolve({
                    errCode: 0,
                    message: 'Ok'});
            } catch (error) {
                reject(error);
            }
        }
    })
} 


module.exports = {
    createNewFood,
    getAllFoodInfo,
    getAllCode,
    handleCreateNewFood
}