const sendEmail = require("./email");

module.exports = async (email, token, host) => {
  // Construct activation link
  // Construct activation link
  let baseUrl = process.env.FRONTEND_URL;
  if (!baseUrl) {
    if (host) {
      const protocol = host.includes('localhost') ? 'http' : 'https';
      baseUrl = `${protocol}://${host}`;
    } else {
      baseUrl = 'https://hms2-production.up.railway.app';
    }
  }
  const link = `${baseUrl}/activate.html?token=${token}&email=${email}`;

  const html = `
    <h2>Welcome to Samyak Hospital</h2>
    <p>A patient record has been created for you.</p>
    <p>Please click the button below to set your password and activate your account:</p>
    <a href="${link}" style="display:inline-block;padding:10px 20px;background:#155c3b;color:#fff;text-decoration:none;border-radius:5px;font-weight:bold;">Activate Account</a>
    <p style="margin-top:20px;font-size:12px;color:#666;">This link expires in 24 hours.</p>
  `;

  await sendEmail(email, "Activate Your Patient Account", html);
};
