require('dotenv').config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async(receiverEmail) => {
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

    const info = await transporter.sendMail({
        from: '"hahieupac👻" <hahieupac@gmail.com>', // sender address
        to: receiverEmail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log(">>> check env email: ", process.env.EMAIL_APP)
} 


module.exports = {
    sendSimpleEmail: sendSimpleEmail,

}