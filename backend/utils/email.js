const { Resend } = require('resend');

// Temporary: Check if key is loaded (remove in production if needed, but useful for debugging now)
if (!process.env.RESEND_API_KEY) {
  console.error("❌ FATAL: RESEND_API_KEY is missing in environment variables!");
} else {
  console.log("✅ RESEND_API_KEY loaded:", process.env.RESEND_API_KEY.substring(0, 5) + "...");
}

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
    const data = await resend.emails.send({
      from: 'Samyak Ayurvedic Hospital <onboarding@resend.dev>', // Default Resend sender for free tier
      to: [to],
      subject: subject,
      html: html,
      attachments: attachments
    });

    if (data.error) {
      console.error("❌ Resend Email Failed:", data.error);
      throw new Error(`Email sending failed: ${data.error.message}`);
    }

    console.log("✅ Email sent successfully via Resend to:", to);
    return data;
  } catch (error) {
    console.error("❌ Email send FAILED:", error);
    // Throw a clean error message that can be sent to client
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

module.exports = { sendEmail };
