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

let timestampToDateTime = (timestamp) => {
    // Chuyển đổi timestamp thành số
    timestamp = parseInt(timestamp);

    let date = new Date(timestamp);
    
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
    
    let formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    return formattedDateTime;
}



let getScheduleByDate = async (req, res) => {
    try {
        console.log(req.query.doctorId, "----- ", req.query.date);
        let momentDate = timestampToDateTime(req.query.date);
        console.log(req.query.doctorId, "----- ", momentDate);
        let response = await doctorService.getScheduleByDate(req.query.doctorId, momentDate);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from server"
        });
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