
const nodemailer = require('nodemailer');




function sendEmail(contactEmail , option) {


// Create transporter
const transporter = nodemailer.createTransport({
  port: process.env.EMAIL_PORT,
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_SERVICE,
  secure: true,
  auth: {
    pass: process.env.EMAIL_PASSWORD,
    user: contactEmail || process.env.EMAIL_USER,
  },
});



  // sending email
  const emailOptions = {
    from: option.sender,
    to: Array.isArray(option.recipient) ? option.recipient.join(',') : option.recipient,
    subject: option.subject,
    text: option.message,
    html: option.html,
  };

  return new Promise(function (resolve, reject) {
    transporter.sendMail(emailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
        return reject(error);
      }
      resolve(info);
    });
  });
}

module.exports = { sendEmail };

