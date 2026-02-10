const { sendEmail } = require("./email");

module.exports = async (email, otp) => {
  const html = `
    <h2>OTP Verification</h2>
    <p>Your OTP is:</p>
    <h1>${otp}</h1>
    <p>Valid for 5 minutes.</p>
  `;

  await sendEmail(email, "Your OTP Verification Code", html);
};
// OTP sender utility — sends an email using Resend
