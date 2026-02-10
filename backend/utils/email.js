const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send an email using Resend
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - Email body (HTML)
 * @returns {Promise<Object>} - Resend API response
 */
const sendEmail = async (to, subject, html, attachments = []) => {
  try {
    const data = await resend.emails.send({
      from: 'Samyak Ayurvedic Hospital <onboarding@resend.dev>', // Default Resend sender
      to: [to],
      subject: subject,
      html: html,
      attachments: attachments
    });

    if (data.error) {
      console.error("❌ Resend Email Failed:", data.error);
      throw new Error(data.error.message);
    }

    console.log("✅ Email sent successfully via Resend to:", to);
    return data;
  } catch (error) {
    console.error("❌ Email send FAILED:", error);
    throw error;
  }
};

module.exports = { sendEmail };
