import emailService from "./emailService";
import db from "../../models";
require('dotenv').config();

let postBookAppointment = (data) => {
    console.log(">>> check data postBookAppointment: ", data)
    return new Promise ( async(resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing parameter"
                })
            }
            else {

                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: 'Hà Trung Hiếu',
                    time: '8:00-9:00 Chủ nhật nhày 01 tháng 08 năm 2023',
                    doctorName: "Khuyên",
                    redirectLink: "http://www.youtube.com"

                })
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
                            timeType: data.timeType
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

module.exports = {
    postBookAppointment: postBookAppointment
}