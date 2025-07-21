// Import the required modules
const express = require("express")
const router = express.Router()

const { order ,verify} = require("../controllers/payment")
const {checkAuth,isStudent,} = require("../middlewares/auth");
router.post("/order",checkAuth, isStudent,order)
router.post("/verify",checkAuth, isStudent,verify)

module.exports = router