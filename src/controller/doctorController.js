import doctorService from "../service/doctorService";
const moment = require('moment');


let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 8;
    try {
        let doctor = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(doctor); 
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}

let getAllDoctor = async(req, res) => {
    try {
        let doctor = await doctorService.getAllDoctor();
        return res.status(200).json(doctor);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let postInfoDoctor = async(req, res) => {
    try {
        let response = await doctorService.saveDetailInfoDoctor(req.body)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return {
            errCode: -1,
            errMessage: "Error from server"
        }
    }
}

let getDetailDoctorById = async(req, res) => {
    try {
        if (!req.query.id) {
            return  res.status(200).json({
                errCode: -2,
                errMessage: "missing req.query.id"
            })
        }
        let info = await doctorService.getDetailDoctorById(req.query.id);
        return res.status(200).json(info)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let bulkCreateSchedule = async(req, res) => {
    try {
        let response = await doctorService.bulkCreateSchedule(req.body)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return {
            errCode: -1,
            errMessage: "Error from server"
        }
    }
}


let getScheduleByDate = async (req, res) => {
    try {
        console.log(req.query.doctorId, "----- ",req.query.date)
        let momentDate = moment(req.query.date).format('YYYY-MM-DD HH:mm:ss');
        console.log(req.query.doctorId, "----- ",momentDate)
        let response = await doctorService.getScheduleByDate(req.query.doctorId, momentDate)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return {
            errCode: -1,
            errMessage: "Error from server"
        }
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    postInfoDoctor: postInfoDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
}