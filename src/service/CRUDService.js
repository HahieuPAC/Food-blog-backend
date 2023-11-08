import { resolve } from 'path';
import db from '../../models';
import { rejects } from 'assert';
import e from 'express';
const bcrypt = require('bcrypt');
const saltRounds = 10;

let createNewUser = async (data) => {
    return  new Promise( async (resolve, reject) => {
        try {
            let hashUserPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashUserPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true:false,
                roleId: data.roleId,
            })
            resolve('Oke create a new user');

        } catch (error) {
            reject(error);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassWord = await bcrypt.hashSync(password, saltRounds);
            resolve(hashPassWord);
        } catch (error) {
            reject(error);
        }
    });
} 

let getAllUser = () => {
    return new Promise (async(resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw : true,
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}

let getUserInfoById = (id) => {
    return new Promise ((resolve, reject) => {
        try {
            let user = db.User.findOne({
                where: {id: id},
                raw: true,
            });

            if(user) {
                resolve(user);
            }
            else {
                resolve({});
            }Users
        } catch (error) {
            reject(error);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, rejects) => {
        try {
            let userData = await db.User.findOne({
                where: {id: data.id}
            });
            if (userData) {
                userData.firstName = data.firstName;
                userData.lastName = data.lastName;
                userData.address = data.address;

                await userData.save();
                resolve();
            } 
            else {
                resolve();
            }
        } catch (error) {
            rejects(error);
        }
    })
}

let deleteUserData = (id) => {
    return new Promise ( async (resolve, rejects) => {
        try {
            let userData = await db.User.findOne({
                where: {id: id}
            });
            if (userData) {
                await db.User.destroy({
                    where: { id: id }
                });
                resolve();
            }
            else {
                resolve();
            }
        } catch (error) {
            rejects(error);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserData: deleteUserData,
}