const express = require("express");
const router = express.Router();

const {createSection,updateSection,deleteSection} = require("../controllers/section");
const {checkAuth,isInstructor} = require("../middlewares/auth");

router.post("/create-section",checkAuth,isInstructor,createSection);
router.put("/update-section",checkAuth,isInstructor,updateSection);
router.delete("/delete-section/:id",checkAuth,isInstructor,deleteSection);

module.exports = router;