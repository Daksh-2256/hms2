require("dotenv").config();
const { sendEmail } = require("./utils/email");

(async () => {
  try {
    // sending to self as per Resend free tier restriction
    await sendEmail("dakshk5610@gmail.com", "TEST EMAIL FROM RESEND", "<p>If you receive this, Resend integration works!</p>");
    console.log("EMAIL SENT");
  } catch (err) {
    console.error("EMAIL ERROR:", err);
  }
})();
