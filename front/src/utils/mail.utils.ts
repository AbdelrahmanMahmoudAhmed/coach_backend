import nodemailer from 'nodemailer';
import SMTPTransporter from "nodemailer/lib/smtp-transport"
import {SendEmailOptions} from "@/types/types"


const transporter = nodemailer.createTransport({
  port:  process.env.EMAIL_PORT,
  service:  process.env.EMAIL_SERVICE ,
  host: process.env.EMAIL_SERVICE,
  secure: true,
    auth: {
      pass:  process.env.EMAIL_PASSWORD,
      user: process.env.EMAIL_USER,
    },
} as SMTPTransporter.Options)


export const sendEmail = async (option :SendEmailOptions) => {
  // CREATE A TRANSPORTER
  const emailOptions = {
    from:option.sender,
    to: option.recipient,
    subject: option.subject,
    text: option.message,
    html: option.html
  };

  try {
    let info = await transporter.sendMail(emailOptions);

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }};


