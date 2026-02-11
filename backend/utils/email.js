const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // Helps with some self-signed cert issues or strict firewalls
  },
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000,
  socketTimeout: 10000
});

async function sendEmail(to, subject, html, attachments = []) {
  try {
    const info = await transporter.sendMail({
      from: `"Hospital" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html,
      attachments: attachments
    });

    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
}

module.exports = sendEmail;
