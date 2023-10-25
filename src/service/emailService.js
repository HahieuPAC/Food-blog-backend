require('dotenv').config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async(dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    const info = 
    await transporter.sendMail({
        from: '"hahieupac👻" <hahieupac@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lệnh khám bệnh", // Subject line
        html: getBodyHtmlEmail(dataSend),
    });

    console.log(">>> check env email: ", process.env.EMAIL_APP)
} 

let getBodyHtmlEmail = (dataSend) => {
    
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào  ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Bookingcare</p>
        <p>Thông tin đặt lệnh khám bệnh</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Nếu các thông tin trên là chính xác, xin vui lòng click vào đường dẫn bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>

        <div>Xin chân thành cảm ơn</div>

        `
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Hello, ${dataSend.patientName}</h3>
        <p>You are receiving this email because you have booked an online medical appointment on Bookingcare</p>
        <p>Appointment Information</p>
        <div><b>Appointment Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p>If the above information is correct, please click on the link below to confirm and complete the appointment booking process.</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>

        <div>Thank you very much</div>
        `
    }

    return result
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,

}