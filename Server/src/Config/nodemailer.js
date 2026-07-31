import nodemailer, { createTransport } from "nodemailer"
import "dotenv/config"

const transporter = createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
})

export default transporter;