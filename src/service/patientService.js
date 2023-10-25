import emailService from "./emailService";
import db from "../../models";
require('dotenv').config();
import { v4 as uuidv4 } from 'uuid';
import { errorMonitor, promises } from "nodemailer/lib/xoauth2";


let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result;
}

let postBookAppointment = (data) => {
    console.log(">>> check data postBookAppointment: ", data)
    return new Promise ( async(resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing parameter"
                })
            }
            else {
                let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
                let dataSend = {
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)

                };
                console.log(">>> check dataSend: ", dataSend);


                await emailService.sendSimpleEmail(dataSend)
                //upsert patient
                let user = await db.user.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',

                    },
                });

                console.log(">>> check user: ", user[0]);
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id
                        },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }

                //create a booking record 
                resolve({
                    errCode: 0,
                    errMessage: "save info doctor success"
                })
            }
        } catch (error) {
            reject(error);
        }
    }) 

}

let postVerifyBookAppointment = (data) => {
    console.log(">>> check postVerifyBookAppointment: ", data)
    return new Promise( async(resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing parameter"
                })
            }
            else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusID: 'S1'
                    },
                    raw: false
                })
                console.log(">>> check appointment: ", appointment)

                if (appointment) {
                    
                    appointment.statusId = 'S2';
                    await appointment.save()
                    resolve({
                        errCode: 0,
                        errMessage: 'update appointment succeed'
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        errMessage: "Appointment has been activated or not exist"
                    })
                    
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}