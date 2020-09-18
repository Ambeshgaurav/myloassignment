const nodeMailer = require('nodemailer');
require('dotenv').config();

let sendEmail = async (toEmail, subject, bodyHtml) => {
  const transporter = nodeMailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  let mailOptions = {
    to: toEmail,
    subject: subject,
    html: `${bodyHtml}`
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = {
  sendEmail
};
