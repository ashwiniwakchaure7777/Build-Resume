const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: process.env.TRASNPORTER_HOST,
  port: process.env.TRASNPORTER_HOST_PORT,
  secure: false,
  auth: {
    user: process.env.SENDINBLUE_USER,
    pass: process.env.SENDINBLUE_PASS,
  },
  logger: true,
  //   debug: true,
});



const mailOptions = {
  from: "ashwiniwakchaure808@gmail.com", // Sender address
  to: "ashwiniwakchaure808@gmail.com", // List of recipients
  subject: "Test Email from Sendinblue", // Subject line
  text: "Hello from Sendinblue using SMTP and Nodemailer!", // Plain text body
  html: "<b>Hello from Sendinblue using SMTP and Nodemailer!</b>", // HTML body (optional)
};

// Send email
const sendMail = () => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error:", error);
    }
    console.log("Email sent:", info.response);
  });
};

module.exports = { sendMail };
