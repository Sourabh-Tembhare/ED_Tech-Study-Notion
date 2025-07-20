const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");


// update profile
exports.updateProfile = async(req,res)=>{
    try {

        // fetch data
        const {dateOfBirth = "",about = "",contactNumber,gender} = req.body;

        console.log("Logging Data",contactNumber,gender);
        
        // validation
        if(!contactNumber?.trim() || !gender?.trim()){
               return res.status(404).json({
            success:false,
            message:"please fill all the input fields",
        })
        
        }


        // fetch user id
        const userId  = req.user.userId;

            if(!userId){
               return res.status(404).json({
            success:false,
            message:"Something went wrong",
        })
        
        }

        // fetch user details
        const userDetails = await User.findById(userId);

        // update profile
        const updatedProfile = await Profile.findByIdAndUpdate(userDetails.additionalDetails,{
            dateOfBirth:dateOfBirth,
            gender:gender,
            about:about,
            contactNumber:contactNumber
        },{new:true});

        // return response
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            updatedProfile,
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
        
        
    }
}

// get instructordashboard details
exports.instructorDashboard = async(req,res)=>{
    try {
    
        // fetch user Id
        const userId = req.user.userId;

        // fetch all courses 
        const allCourses = await Course.find({instructor:userId});

        let totalStudent  = 0;
        let totalIncome = 0;

        allCourses.forEach((course) => {
            totalStudent = course.studentsEnrolled.length + totalStudent;
            totalIncome = course.price * course.studentsEnrolled.length + totalIncome;
        });

        return res.status(200).json({
            success:true,
            message:"Sucessfully fetched dashboard data",
            totalStudent:totalStudent,
            totalIncome:totalIncome,
            allCourses:allCourses,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:fasle,
            message:"Internal Server error"
        })
        
        
    }
}
