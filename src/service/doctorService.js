import db from "../../models";
import 'dotenv/config';
import _ from "lodash";

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
let getTopDoctorHome = (limitInput) => {
    return new Promise( async(resolve, reject) => {
        try {
            let user = await db.User.findAll({
                limit: limitInput,
                where: {roleId: 'R2'},
                order: [["createdAt", "DESC"]],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']},
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']},
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: user
            })
        } catch (error) {
            reject(error);
        }
    })
}

let getAllDoctor = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let doctor = await db.User.findAll({
                where: {roleId: "R2"},
                attributes: {
                    exclude: ['password', 'image']
                },
            })
            resolve({
                errCode: 0,
                data: doctor
            });
        } catch (error) {
            reject(error);
        }
    })
}

let checkRequiredFields = () => {

}

let saveDetailInfoDoctor = (inputData) => {
    return new Promise(async(resolve, reject) => {
        console.log(">>> check inputdata: ", inputData)
        try {
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown
                || !inputData.action || !inputData.selectedPrice || !inputData.selectedPayment || !inputData.selectedProvince || !inputData.nameClinic || !inputData.addressClinic || !inputData.note 
                || !inputData.specialtyId) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing parameter"
                })
            } 
            else {

                // upsert to Markdown table
                if (inputData.action === "CREATE") {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId
                    })
                }
                else if (inputData.action === "EDIT") {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: {doctorId: inputData.doctorId},
                        raw: false
                    })
                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = inputData.contentHTML;
                        doctorMarkdown.contentMarkdown = inputData.contentMarkdown; 
                        doctorMarkdown.description = inputData.description;
                        await doctorMarkdown.save();
                    }
                }

                // upsert to Doctor_info table 
                let doctorInfo = await db.doctor_info.findOne({
                    where: {
                        doctorId: inputData.doctorId,
                        
                    },
                    raw: false
                })  

                if (doctorInfo) {
                    //Update
                    doctorInfo.doctorId = inputData.doctorId;
                    doctorInfo.priceId = inputData.selectedPrice;
                    doctorInfo.provinceId = inputData.selectedProvince; 
                    doctorInfo.paymentId = inputData.selectedPayment;
                    doctorInfo.nameClinic = inputData.nameClinic;
                    doctorInfo.addressClinic = inputData.addressClinic; 
                    doctorInfo.note = inputData.note,
                    doctorInfo.specialtyId = inputData.specialtyId,
                    // doctorInfo.clinicId = inputData.clinicId
                    await doctorInfo.save();
                }
                else {
                    // create
                    await db.doctor_info.create({
                        doctorId: inputData.doctorId,
                        priceId : inputData.selectedPrice,
                        provinceId : inputData.selectedProvince, 
                        paymentId : inputData.selectedPayment,
                        nameClinic : inputData.nameClinic,
                        addressClinic : inputData.addressClinic,
                        note : inputData.note,
                        specialtyId: inputData.specialtyId,
                        // clinicId: inputData.clinicId
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: "Save info doctor success"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getDetailDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: "missing require parameter"
                })
            }
            else {
                let data = await db.User.findOne({
                    where: {
                        id: id
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { 
                            model: db.Markdown, 
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        { 
                            model: db.Allcode, as: 'positionData', 
                            attributes: ['valueEn', 'valueVi'],
                        },
                        { 
                            model: db.doctor_info, 
                            attributes: {
                                exclude: ['id', 'doctorId', 'createdAt', 'updatedAt']
                            },
                            include: [
                                { 
                                    model: db.Allcode, as: 'priceTypeData', 
                                    attributes: ['valueEn', 'valueVi'],
                                },{ 
                                    model: db.Allcode, as: 'provinceTypeData', 
                                    attributes: ['valueEn', 'valueVi'],
                                },
                                { 
                                    model: db.Allcode, as: 'paymentTypeData', 
                                    attributes: ['valueEn', 'valueVi'],
                                }
                            ]
                        },
                            
                        
                    ],
                    raw: false,
                    nest: true
                })

                if (data && data.image) {
                    data.image = new Buffer.from(data.image, 'base64').toString('binary');
                }

                if (!data) data = {};

                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let bulkCreateSchedule = (data) => {
    return new Promise( async(resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.date) {
                resolve({
                    arrCode: 1,
                    errMessage: "Missing required parameters"
                })
            }
            else{
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }
                let existing = await db.Schedule.findAll({
                    Where: { doctorId: data.doctorId, date: data.date},
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw: true
                });

                if (existing && existing.length > 0) {
                    existing = existing.map(item => {
                        item.date = new Date(item.date).getTime();
                        return item
                    })
                }

                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date;
                });
                
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate)
                }
                
                resolve({
                    errCode: 0,
                    errMessage: "ok"
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getScheduleByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: "1",
                    errMessage: "missing require parameters"
                })
            }
            else {
                let data = await db.Schedule.findAll({
                    where: {doctorId: doctorId,
                    date: date},
                    include: [
                        { 
                            model: db.Allcode, as: 'timeTypeData', 
                        attributes: ['valueEn', 'valueVi']
                        },
                        { 
                            model: db.User, as: 'doctorData', 
                        attributes: ['firstName', 'lastName']
                        },
                    ],
                    raw: false,
                    nest: true
                })

                if (!data) data =[];

                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (error) {
            reject(error);
        }
    })
} 

let getExtraInfoDoctorById = (doctorId) => {
    return new Promise( async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameters"
                })
            }
            else {
                let data = await db.doctor_info.findOne({
                    where: {
                        doctorId: doctorId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { 
                            model: db.Allcode, as: 'priceTypeData', 
                            attributes: ['valueEn', 'valueVi'],
                        },{ 
                            model: db.Allcode, as: 'provinceTypeData', 
                            attributes: ['valueEn', 'valueVi'],
                        },
                        { 
                            model: db.Allcode, as: 'paymentTypeData', 
                            attributes: ['valueEn', 'valueVi'],
                        }
                    ],
                    raw: false,
                    nest: true
                })
                if (!data) {
                    data ={};
                }
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getProfileDoctorById = (doctorId) => {
    return new Promise( async(resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters"
                })
            }
            else {
                let data = await db.User.findOne({
                    where: {
                        id: doctorId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { 
                            model: db.Allcode, as: 'positionData', 
                            attributes: ['valueEn', 'valueVi'],
                        },
                        { 
                            model: db.Markdown, 
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        { 
                            model: db.doctor_info, 
                            attributes: {
                                exclude: ['id', 'doctorId', 'createdAt', 'updatedAt']
                            },
                            include: [
                                { 
                                    model: db.Allcode, as: 'priceTypeData', 
                                    attributes: ['valueEn', 'valueVi'],
                                },{ 
                                    model: db.Allcode, as: 'provinceTypeData', 
                                    attributes: ['valueEn', 'valueVi'],
                                },
                                { 
                                    model: db.Allcode, as: 'paymentTypeData', 
                                    attributes: ['valueEn', 'valueVi'],
                                }
                            ]
                        },
                            
                        
                    ],
                    raw: false,
                    nest: true
                })

                if (data && data.image) {
                    data.image = new Buffer.from(data.image, 'base64').toString('binary');
                }

                if (!data) data = {};

                resolve({
                    errCode: 0,
                    data: data
                })
            }
            
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    saveDetailInfoDoctor: saveDetailInfoDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInfoDoctorById: getExtraInfoDoctorById,
    getProfileDoctorById: getProfileDoctorById,
}