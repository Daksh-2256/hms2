const { Resend } = require('resend');

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send an email using Resend
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - Email body (HTML)
 * @param {Array} attachments - Optional attachments
 * @returns {Promise<Object>} - Resend API response
 */
const sendEmail = async (to, subject, html, attachments = []) => {
  try {
    const response = await resend.emails.send({
      from: 'Samyak Ayurvedic Hospital <onboarding@resend.dev>', // Default Resend sender
      to: [to],
      subject: subject,
      html: html,
      attachments: attachments
    });

    if (response.error) {
      console.error("❌ Resend Email Failed:", response.error);
      throw new Error(`Email sending failed: ${response.error.message}`);
    }

    console.log("✅ Email sent successfully via Resend to:", to);
    return response;
  } catch (error) {
    console.error("❌ Resend error:", error);
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

module.exports = sendEmail;
