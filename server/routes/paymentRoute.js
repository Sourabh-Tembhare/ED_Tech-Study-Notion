// Import the required modules
const express = require("express")
const router = express.Router()

const { order ,verify} = require("../controllers/payment")
const {checkAuth,isStudent,isInstructor,isAdmin} = require("../middlewares/auth");
router.post("/order", order)
router.post("/verify", verify)

module.exports = router