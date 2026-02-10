const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to, subject, html, attachments = []) {
  try {
    const response = await resend.emails.send({
      from: "Hospital <onboarding@resend.dev>",
      to: to,
      subject: subject,
      html: html,
      attachments: attachments
    });

    if (response.error) {
      console.error("Resend API Error:", response.error);
      throw new Error(response.error.message || "Failed to send email");
    }

    console.log("Email sent successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Resend error:", error);
    throw error;
  }
}

module.exports = sendEmail;
