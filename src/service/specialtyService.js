const { reject } = require("lodash");
import db from "../../models";

let createNewSpecialty = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if (!data.name 
                || !data.descriptionHTML 
                || !data.descriptionMarkdown
                || !data.imageBase64) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing parameter"
                })
            }
            else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown

                })

                resolve({
                    errCode: 0,
                    errMessage: "Create Specialtties succeed"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllSpecialty = () => {
    return new Promise (async(resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = data.image = new Buffer.from(item.image, 'base64').toString('binary');
                    return item
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'ok',
                data
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewSpecialty: createNewSpecialty,
    getAllSpecialty: getAllSpecialty
}