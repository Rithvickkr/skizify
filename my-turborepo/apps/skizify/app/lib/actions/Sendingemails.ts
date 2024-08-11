"use server";
export default async function SendingEmails({to,to2,name,subject,body}: {to: string, to2:string, name: string, subject: string, body: string}) {
    const nodemailer = require("nodemailer");
  const { SMTP_PASSWORD, SMTP_EMAIl } = process.env;
  const transporter = nodemailer.createTransport({  
    host: "smtp.gmail.com",
    port: 587,
   
    secure: false, 
    auth: {
      user: SMTP_EMAIl,
      pass: SMTP_PASSWORD,
    },
  });
 try {
    const testresult=await transporter.verify();
    console.log(testresult);
 }
  catch(err){
    console.log(err);
  }
  try {
    const info = await transporter.sendMail({
      from: SMTP_EMAIl,
      to: to,to2,
      subject: subject,
      text: body,
    });
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("There was an error sending the email");
  }
}