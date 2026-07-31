import forgotPasswordTemplate from "../../assets/templates/forgotPasswordTemplate.js";
import transporter from "../Config/nodemailer.js";

const sendOtpViaMail = async (username , email , otp) => {

    const html = forgotPasswordTemplate(
        username,
        otp
    )

    const mailConfigurations = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Password reset Otp",
        html
    }

    await transporter.sendMail(mailConfigurations , )
}

export default sendOtpViaMail;