import Mail from "nodemailer/lib/mailer"

export type SendEmailOptions = {
    sender : Mail.Address,
    recipient: Mail.Address,
    subject:string,
    message?:string,
    html?:string
} 

export type Option = {
    value: string;
    label: JSX.Element | string;
  }