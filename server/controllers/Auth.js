const OTP = require("../models/OTP");
const User = require("../models/User");
const otpGenerate = require("otp-generator");
const bcrypt = require("bcryptjs");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { cloudinaryUploader } = require("../utils/cloudinaryUploader");

require("dotenv").config();

//sendOTP
exports.otpSend = async(req,res)=>{

   try {
     // fetch email 
    const {email} = req.body;
    
     if(!email){
      return res.status(404).json({
        success:false,
        message:"Email not fetched"
      })
    }

    // check user is already exist or not
    const findUser = await User.findOne({email});
    
    // if user is exist then return response
    if(findUser){
        return res.status(401).json({
            success:false,
            message:"User is already registered"
        })
    }

    // generate otp
const generateOTP = otpGenerate.generate(6,{
    upperCaseAlphabets:false,
    lowerCaseAlphabets:false,
    specialChars:false,
})

// create entry in DB
const otpEntry = await OTP.create({otp:generateOTP,email:email});

// return response
return res.status(200).json({
    success:true,
    response:otpEntry,
    message:"OTP Send Sucessfully"
})
    
   } catch (error) {
    console.log(error);

    // return response with error
    return res.status(500).json({
    success:false,
    message:error.message,
    })   
   }
}

//signUp
exports.signUp = async(req,res)=>{
    try {
        
        // fetch data from request ki body
        const {
            firstName,
            lastName,
            password,
            confirmpassword,
            accountType,
            otp,
            email
        } = req.body;
     
        // validation
       if(!firstName || !lastName || !password || !confirmpassword || !otp){
            return res.status(403).json({
                success:false,
                message:"Please fill all the input fields"
            })
        }

        // validate password and confirmPassword is same or not
        if (password !== confirmpassword){
            return res.status(400).json({
                success:false,
                messahe:"Password and confirmPassword is not matched"
            })
        }

        // check user is already exist or not
      const  userExistance = await User.findOne({email});
      // if find user then return response 
    if(userExistance){
        return res.status(401).json({
            success:false,
            message:"User is already exist"
        })
    }

    // most recent otp of the user
    const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);

      // validate otp
    if(otp !== recentOtp[0].otp){
        return res.status(400).json({
            sucess:false,
            message:"OTP not matched"
        })
    }
    // hashing password
     const hashPassword = await bcrypt.hash(password,10);

     // create profile byDeafult null entry because to add profile id in user model
     const profileData = await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null,

     })

     // generate profile picture of user by its first and last Name
     const profilePicture = `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}%20${lastName}`;

     // create user entry in DB
     const user = await User.create({
        firstName,
        lastName,
        password:hashPassword,
        accountType,
        email,
        additionalDetails:profileData._id,
        image:profilePicture

     })
    
     // return response

     return res.status(200).json({
        success:true,
        response:user,
        message:"Account created sucessfully"
     })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}

//Login
exports.login = async(req,res)=>{
    try {
        
        // fetch email and password from req ki body
        const {email,password} = req.body;

        // validation
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"Please fill all the input fields"
            })
        }

        // check is user exist or not
        const isUserExist = await User.findOne({email:email}).populate("additionalDetails");

        // if user is not found then send response
        if(!isUserExist){
            return res.status(404).json({
                sucess:false,
                message:"Email is not registered",
            })
        } 

        //match password
        if(await bcrypt.compare(password,isUserExist.password)){

            // generate jasonwentoken
            // firstly create payload for token    
        const payload = {
        email:isUserExist.email,
        accountType:isUserExist.accountType,
        userId:isUserExist._id,
            }

            // now create token
            const token = jwt.sign(payload,process.env.SECREATE_KEY,{
                expiresIn:"3y"
            })

            // insert token in user
            isUserExist.token = token;

            // set password undifined for security reasons
            isUserExist.password = undefined;

            // return response
            return res.status(200).json({
                success:true,
                user:isUserExist,
                message:"Login Sucessfully",
            })
        }

        // is password is not matched
        else{
            return res.status(403).json({
                success:false,
                message:"Passworrd is incorrect"
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
        
        
    }
}


//changePassword
exports.changePassword = async(req,res)=>{
    try {

        // fetch old,new and confirm password
        const {oldPassword,password} = req.body;

        // validation
        if(!oldPassword || !password ){
            return res.status(403).json({
                success:false,
                message:"Please fill all the input fields",
            })
        }

        
        // fetch email from requset to updated password and send email of update password
        const email = req.user.email;

        // find user details
        const passwordCheck = await User.findOne({email:email});

        // check oldPassword is same or not
        const checkPassword = await bcrypt.compare(oldPassword,passwordCheck.password);

        if(!checkPassword){
            return res.status(403).json({
                sucess:false,
                message:"oldPassword is not matched"
            })
        }
        // hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        // update the password
        const updatedPassword = await User.findOneAndUpdate({email:email},{password:hashedPassword},{new:true});

        // send mail for password is updated
        mailSender(email,"Password is updated",`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Password Updated</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      /* Reset styles for consistent rendering */
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

      /* Responsive styles */
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
        <h2>Password Updated Successfully</h2>
        <p>Hello,</p>
        <p>
          This is to notify you that your password for your Study Notion account has been
          successfully updated. If you made this change, no further action is needed.
        </p>
        <p>
          If you did not initiate this update, please contact our support team immediately.
        </p>
        <p>Stay safe,<br />Sourabh Tembhare<br />Founder, Study Notion</p>
      </div>
      <div class="email-footer">
        Need help? Contact us at
        <a href="mailto:sourabhtembhare65@gmail.com">sourabhtembhare65@gmail.com</a>
      </div>
    </div>
  </body>
</html>
`);

    // return response
    return res.status(200).json({
        success:true,
        message:"Password is updated sucessfully",
    })


         
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
        
        
    }
}

// delete profile
exports.deleteProfile = async(req,res)=>{
  try {

    // fetch user id
    const userId = req.user.userId;

    // validation
    if(!userId){
      return res.status(400).json({
        success:false,
        message:"Something went wrong",
      })
    }

   
    //  instructor and admin not  deleted their  account for validation
    if(req.user.accountType !== "Student"){
          return res.status(400).json({
        success:false,
        message:"You  can't delete your account",
      })
    }

    // fetch user details
    const userDetails = await User.findById(userId);

    // delete profile
    const deleteProfile = await Profile.findByIdAndDelete(userDetails.additionalDetails);

    // delete user
    const deleteUser = await User.findByIdAndDelete(userId);

    // send mail to user
    const email = req.user.email;

    await mailSender(email,"Account delete",`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Account Deletion Notice</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <table width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table width="600" cellspacing="0" cellpadding="20" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td align="center" style="background-color: #1e293b; color: #ffffff; font-size: 24px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
              Study Notion
            </td>
          </tr>
          <tr>
            <td style="color: #333333;">
              <p style="font-size: 18px;">Hello <strong>${userDetails.firstName}${" "}${userDetails.lastName}</strong>,</p>
              <p style="font-size: 16px;">
                We want to inform you that your account on <strong>Study Notion</strong> has been successfully deleted. You will no longer have access to your profile, courses, or any saved data.
              </p>
              <p style="font-size: 16px;">
                If you believe this was a mistake or have any questions, please do not hesitate to contact us.
              </p>
              <p style="font-size: 16px;">
                You can reach our support team at: <a href="mailto:sourabhtembhare65@gmail.com" style="color: #1e40af;">sourabhtembhare65@gmail.com</a>
              </p>
              <p style="font-size: 16px;">
                Thank you for being a part of our community.
              </p>
              <p style="font-size: 16px;">
                Best regards,<br>
                <strong>Sourabh Tembhare</strong><br>
                Founder, Study Notion
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="background-color: #e2e8f0; font-size: 14px; color: #555555; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
              &copy; 2025 Study Notion. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`)

// return response
return res.status(200).json({
  success:true,
  message:"Account deleted successfully",
})

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
    
    
  }
}

// update profile picture 
exports.updateProfilePicture = async(req,res)=>{
  try {

    // fetch imaghe
    const profilePicture = req.files.image;

    // validation
    if(!profilePicture){
      return res.status(404).json({
        success:false,
        message:"Please select the image",
      })
    }

    // fetch userId
    const userId = req.user.userId;
   

    
    // upload image in cloudinary 
    const uploadImage = await cloudinaryUploader(profilePicture,"sourabh");

    console.log("Looging 2 ",uploadImage.secure_url);
    

    // upadte user profile picture
    const updatedUser = await User.findByIdAndUpdate(userId,{
      image:uploadImage.secure_url
    },{new:true});

    // return response
    return res.status(200).json({
      success:true,
      message:"Picture updated successfully",
      imageUrl:uploadImage.secure_url,
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Internal Server error",
    })  
  }
}