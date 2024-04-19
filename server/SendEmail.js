const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, sendTo) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587, // Change port number accordingly
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const options = {
            from: process.env.EMAIL_USER,
            to: sendTo,
            subject: subject,
            html: message,
        };

        const info = await transporter.sendMail(options);
        console.log("Email sent:", info.response);
        return { success: true, message: "Email Sent" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send email" };
    }
};

module.exports = sendEmail;

