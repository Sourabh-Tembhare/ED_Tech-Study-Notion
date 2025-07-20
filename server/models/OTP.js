const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    otp: {
        type:String,
        required:true,
    },
    createdAt: {
        type:Date,
        default:Date.now,
        expires: 5*60,
    }
});


//a function -> to send emails
async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email, "Verification Email from StudyNotion", `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your OTP Code</title>
  <style>
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
        padding: 10px !important;
      }
      .content-box {
        padding: 20px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table class="email-container" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color: #0a0a23; color: #ffffff; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">Study Notion</h1>
              <p style="margin: 0; font-size: 14px;">Secure Verification</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="content-box" style="padding: 30px;">
              <h2 style="color: #333333;">🔐 Your OTP Code</h2>
              <p style="font-size: 16px; color: #555555;">
                Hello,
              </p>
              <p style="font-size: 16px; color: #555555;">
                Use the following One-Time Password (OTP) to complete your verification process:
              </p>
              <p style="font-size: 28px; font-weight: bold; color: #0a0a23; text-align: center; letter-spacing: 4px; margin: 30px 0;">
                ${otp}
              </p>
              <p style="font-size: 16px; color: #555555;">
                This OTP is valid for the next 5 minutes. Please do not share it with anyone.
              </p>
              <p style="margin-top: 30px; font-size: 14px; color: #888888;">
                – Team Study Notion
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`);
        console.log("Email sent Successfully: ", mailResponse);
    }
    catch(error) {
        console.log("error occured while sending mails: ", error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
}) 



module.exports = mongoose.model("OTP", OTPSchema);

