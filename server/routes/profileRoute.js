const express = require("express");
const router = express.Router();



const {checkAuth} = require("../middlewares/auth");
const {updateProfile} = require("../controllers/profile");
router.put("/update-profile" ,checkAuth,updateProfile)


module.exports = router;