import patientService from "../service/patientService";

let  postBookAppointment = async (req, res) => {
    try {
        console.log(">>> check data controller postBookAppointment: ", req.body)
        let doctor = await patientService.postBookAppointment(req.body);
        return res.status(200).json(doctor); 
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}

let postVerifyBookAppointment = async (req, res) => {
    try {
        console.log(">>> check data controller postBookAppointment: ", req.body)
        let doctor = await patientService.postVerifyBookAppointment(req.body);
        return res.status(200).json(doctor); 
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}



module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment,
}