const mailer = require("nodemailer");


// const transporter = mailer.createTransport({
//     port: process.env.EMAIL_PORT,
//     // service: process.env.EMAIL_HOST,
//     host: process.env.EMAIL_HOST,
//     secure: false,
//     auth: {
//       pass: process.env.EMAIL_PASSWORD,
//       user: process.env.EMAIL_USER,
//     },
//   });

  const transporter = mailer.createTransport({
    // port: process.env.EMAIL_PORT,
    service: "gmail",
    // host: process.env.EMAIL_HOST,
    secure: false,
    auth: {
      pass: "zopl mide oidc ddqn",
      user: 'abdelrahman.mahmoud.developer@gmail.com',
    },
  })


const sendEmail = async (option) => {
    console.log("option" , process.env.EMAIL_PASSWORD)
  // CREATE A TRANSPORTER
  const emailOptions = {
    from:'no replay',
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  try {
    let info = await transporter.sendMail(emailOptions);

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }};

module.exports = sendEmail;
