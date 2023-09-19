import db from "../../models";


let getTopDoctorHome = (limitInput) => {
    return new Promise( async(resolve, reject) => {
        try {
            let user = await db.user.findAll({
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
            let doctor = await db.user.findAll({
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

let saveDetailInfoDoctor = (inputData) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown
                || !inputData.action ) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing parameter"
                })
            } 
            else {
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
                let data = await db.user.findOne({
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
                        attributes: ['valueEn', 'valueVi']
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

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    saveDetailInfoDoctor: saveDetailInfoDoctor,
    getDetailDoctorById: getDetailDoctorById
}