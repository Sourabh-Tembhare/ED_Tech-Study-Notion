const express = require("express");
const router = express.Router();

const {otpSend,signUp,login,changePassword,deleteProfile,updateProfilePicture} = require("../controllers/Auth");
const {resetPasswordToken,resetPassword} = require("../controllers/ResetPassword");
const {checkAuth,isStudent,isInstructor,isAdmin} = require("../middlewares/auth");
const {instructorDashboard} = require("../controllers/profile");
router.post("/send/otp",otpSend)
router.post("/signup",signUp)
router.post("/login",login)
router.put("/change-password",checkAuth,changePassword);
router.post("/reset-password-link",resetPasswordToken);
router.put("/reset-password",resetPassword);
router.delete("/delete-account",checkAuth,deleteProfile);
router.put("/updateProfilePicture",checkAuth,updateProfilePicture);
router.get("/instructorDashboard",checkAuth,isInstructor,instructorDashboard);


module.exports = router;