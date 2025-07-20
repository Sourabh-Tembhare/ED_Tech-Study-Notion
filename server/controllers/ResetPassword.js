const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");

//resetPasswordToken
exports.resetPasswordToken = async(req,res)=>{
    try {

        // fetch email
        const {email} = req.body;

        // validation
        if(!email){
            return res.status(404).json({
                success:false,
                message:"Please fill all the input fields",
            })
        }

        // check is user exist or not
        const isUserExist = await User.findOne({email:email});

        // if user not exist then return response
        if(!isUserExist){
            return res.status(404).json({
                success:false,
                message:"User not exist",
            })
        }
        
        // generate token
        const token = crypto.randomUUID();

        // update user by adding token and expiration time
        const updatedUser = await User.findOneAndUpdate({email:email},{
            token:token,
            resetPasswordExpires:Date.now() + 5 * 60 * 1000 ,
        })

        // create url
        const url = `http://localhost:3000/reset-password/${token}`;

        mailSender(email,"For Reset Password",`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Reset Your Password</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body, table, td, a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      body {
        margin: 0;
        padding: 0;
        width: 100% !important;
        height: 100% !important;
        background-color: #f4f4f4;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      table {
        border-collapse: collapse !important;
      }
      .email-container {
        max-width: 600px;
        margin: 30px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        width: 100%;
      }
      .email-header {
        background-color: #2d3748;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      }
      .email-header h1 {
        margin: 0;
        font-size: 24px;
      }
      .email-body {
        padding: 30px 20px;
        color: #2d2d2d;
      }
      .email-body h2 {
        font-size: 20px;
        margin-top: 0;
      }
      .email-body p {
        font-size: 16px;
        line-height: 1.6;
        margin: 10px 0;
      }
      .reset-button {
        display: inline-block;
        background-color: #3182ce;
        color: #ffffff !important;
        padding: 12px 24px;
        margin-top: 20px;
        text-decoration: none;
        border-radius: 6px;
        font-size: 16px;
      }
      .email-footer {
        background-color: #f7fafc;
        padding: 20px;
        text-align: center;
        font-size: 14px;
        color: #6b7280;
      }
      .email-footer a {
        color: #3182ce;
        text-decoration: none;
      }

      @media only screen and (max-width: 600px) {
        .email-header h1 {
          font-size: 20px;
        }
        .email-body h2 {
          font-size: 18px;
        }
        .email-body p {
          font-size: 15px;
        }
        .email-container {
          margin: 10px;
          border-radius: 0;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1>Study Notion</h1>
      </div>
      <div class="email-body">
        <h2>Reset Your Password</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password for your Study Notion account.</p>
        <p>Click the button below to set a new password:</p>
        <a class="reset-button" href="${url}" target="_blank">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
        <p>Stay safe,<br />Sourabh Tembhare<br />Founder, Study Notion</p>
      </div>
      <div class="email-footer">
        Need help? Contact us at
        <a href="mailto:sourabhtembhare65@gmail.com">sourabhtembhare65@gmail.com</a>
      </div>
    </div>
  </body>
</html>
`)

// return response
return res.status(200).json({
    sucess:true,
    message:"Reset password link is send in your gmail account",
})



        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
        
        
    }
}

//resetPassword
exports.resetPassword = async(req,res)=>{
  try {
    
    // fetch data
    const {password,confirmPassword,token} = req.body;

    // validation
    if(!password || !confirmPassword){
      return res.status(403).json({
        success:false,
        message:"Please fill all the input fields",
      })
    }
    
    if(!token){
      return res.status(403).json({
        success:false,
        message:"Something went wrong",
      })
    }

    // get user details from db using token
    const userDetails = await User.findOne({token:token});

    // validation
    if(!userDetails){
      return res.status(403).json({
        success:false,
        message:'Invalid token',
      })
    }

    // check token time
    if(Date.now() > userDetails.resetPasswordExpires){
      return res.status(403).json({
        success:false,
        message:"Invalid Link, please generate again reset password link"
      })

    }

    // hash password
    const hashPassword = await bcrypt.hash(password,10);

    // update the password
    const updateUser = await User.findOneAndUpdate({token:token},{
      password:hashPassword,
    })

    // return response
    return res.status(200).json({
      success:true,
      message:"Password updated sucessfully",
    })

    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Internal Server Error",
    })
    
    
  }
}