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



let getDetailSpecialtyById = (inputId, location) => {
    return new Promise (async(resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing parameter"
                })
            }
            else {
                let data = [];
                    data = await db.Specialty.findOne({
                        where: {
                            id: inputId
                        },
                        attribute : ['descriptionHTML', 'descriptionMarkdown']
                    })
                    if (data) {
                        let doctorSpecialty = [];
                        if (location === 'ALL') {
                            doctorSpecialty = await db.doctor_info.findAll({
                                where: {
                                    specialtyId: inputId
                                }, 
                                attribute : ['doctorId', 'provinceId']
                            })
                        }
                        else {
                            //find by location
                            doctorSpecialty = await db.doctor_info.findAll({
                                where: {
                                    specialtyId: inputId,
                                    provinceId: location
                                }, 
                                attribute : ['doctorId', 'provinceId']
                            })
                        }
                        data.doctorSpecialty = doctorSpecialty;
                    }
                    else {
                        data = []
                    }
        
                    resolve({
                        errCode: 0,
                        errMessage: "ok",
                        data: data
                    })
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewSpecialty: createNewSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById
}