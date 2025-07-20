const express = require("express");
const router = express.Router();

const {createSubSection,updateSubSection,deleteSubsection} = require("../controllers/subSection");
const {checkAuth,isInstructor} = require("../middlewares/auth");

router.post("/create-subsection",checkAuth,isInstructor,createSubSection);
router.put("/update-subsection",checkAuth,isInstructor,updateSubSection);
router.delete("/delete-subsection/:id",checkAuth,isInstructor,deleteSubsection);


module.exports = router;