import nodemailer from "nodemailer"
import "dotenv/config"
import verifyEmailTemplate from "../../assets/templates/verifyEmailTemplate.js"
import transporter from "../Config/nodemailer.js";


const verifyMail = async (email , username , verificationToken) =>{

    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

    const html = verifyEmailTemplate(
        username,
        verificationLink
    );

    const mailConfigurations = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Verify your Email Account",
        html
    }

    transporter.sendMail(mailConfigurations , function(error , info){
        if(error){
            throw new Error(error);
        }

        console.log("Email Sent Successfully");
        console.log(info);
        
        
    })
}

export default verifyMail;