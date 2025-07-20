const express = require("express");
const router = express.Router();

const {checkAuth,isInstructor,isStudent} = require("../middlewares/auth");
const {createCourse,getAllCourses,getCourseDetails,updateCourse,publicCourse,instructorAllCourses,deleteCourse,studentEnrolledCourses} = require("../controllers/course");
const {createRating,getAverageRating,getAllRating} = require("../controllers/RatingAndReview");
const {addCourseProgres,fetchCourseProgres} = require("../controllers/courseProgress");

router.post("/create-course",checkAuth,isInstructor,createCourse);
router.get("/get-all-courses",getAllCourses);
router.get("/get-course-details/:courseId",getCourseDetails);
router.put("/update-course",checkAuth,isInstructor,updateCourse);
router.put("/published-course",checkAuth,isInstructor,publicCourse);
router.get("/get-instructor-all-courses/:instructorId",checkAuth,isInstructor,instructorAllCourses);
router.delete("/delete-course/:id",checkAuth,isInstructor,deleteCourse);


router.post("/createRating", checkAuth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)
router.post("/addCourseProgres" ,checkAuth,isStudent, addCourseProgres)
router.get("/fetchCourseProgres/:courseId",checkAuth,isStudent, fetchCourseProgres)
router.get("/studentEnrolledCourses",checkAuth,isStudent,studentEnrolledCourses)

module.exports = router;