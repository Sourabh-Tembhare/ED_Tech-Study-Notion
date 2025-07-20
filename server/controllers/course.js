const { model, default: mongoose } = require("mongoose");
const Course = require("../models/Course") ;
const User = require("../models/User");
const cloudinaryUploadFunction = require("../utils/cloudinaryUploader");
const mailSender = require("../utils/mailSender");
const ratingAndReview = require("../models/RatingAndRaview");
const Category = require("../models/category");
const SubSection = require("../models/SubSection");

require("dotenv").config();


// create course
exports.createCourse = async (req, res) => {
  try {
    // fetch data
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructions,
    } = req.body;

    const thumbnail = req.files?.thumbnail;

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !category ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the input fields",
      });
    }

    // default status
    const courseStatus = status && status !== undefined ? status : "Draft";

 try {
  if (typeof tag === "string") {
    tag = JSON.parse(tag);
  }
  if (typeof instructions === "string") {
    instructions = JSON.parse(instructions);
  }
} catch (err) {
  return res.status(400).json({
    success: false,
    message: "Failed to parse tag or instructions",
  });
}
 
if (!Array.isArray(tag) || !Array.isArray(instructions)) {
  return res.status(400).json({
    success: false,
    message: "Tags and instructions must be arrays",
  });
}


    // check valid category
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // upload thumbnail
    const uploadedThumbnail = await cloudinaryUploadFunction.cloudinaryUploader(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // get instructor info
    const instructorId = req.user.userId;
    const emailId = req.user.email;

    // create course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      status: courseStatus,
      instructor: instructorId,
      thumbnail: uploadedThumbnail.secure_url,
      instructions,
    });

    // update user (push course)
    await User.findByIdAndUpdate(instructorId, {
      $push: { courses: newCourse._id },
    });

    // update category (push course)
    await Category.findByIdAndUpdate(
      category,
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    // send email to instructor
    await mailSender(
      emailId,
      "🎓 Course Created Successfully!",
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Course Created</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
          .container { background: #fff; padding: 20px; margin: auto; width: 600px; border-radius: 8px; }
          h1 { background: #0a0a23; color: #fff; padding: 10px; border-radius: 4px; }
          p { font-size: 16px; color: #333; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Study Notion</h1>
          <p>Hello Instructor,</p>
          <p>Your course <strong>${courseName}</strong> has been <strong>successfully created</strong> on <strong>Study Notion</strong>.</p>
          <p>You can manage and update your course from your dashboard.</p>
          <p>If you have any questions, feel free to reach out at <a href="mailto:sourabhtembhare65@gmail.com">sourabhtembhare65@gmail.com</a></p>
          <p>– Sourabh Tembhare, Founder</p>
        </div>
      </body>
      </html>`
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Successfully created course",
      course: newCourse,
    });
  } catch (error) {
    console.error("CREATE COURSE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// get all courses
exports.getAllCourses = async(req,res)=>{
  try {
    
    // fetch all courses
    const allCourses = await Course.find({}).populate("instructor").exec();

    // do undefined password foe security reasons
    allCourses.some((course)=>{
      course.instructor.password = undefined;
    })

    // return response
    return res.status(200).json({
      success:true,
      message:"Successfully fetched all Courses",
      allCourses:allCourses,
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Internal Serval Error"
    })
    
    
  }
}

//get CourseDetails
exports.getCourseDetails = async (req, res) => {
    try {
            //get id
            const {courseId} = req.params;
            //find course details
            const courseDetails = await Course.findOne(
                                        {_id:courseId})
                                        .populate(
                                            {
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails",
                                                },
                                            }
                                        )
                                        .populate("category")
                                   
                                        .populate({
                                            path:"courseContent",
                                            populate:{
                                                path:"subSection",
                                            },
                                        }).populate({
                                          path:"ratingAndReviews",
                                          populate:{
                                            path:"user",
                                          }
                                        })
                                        .exec();

                //validation
                if(!courseDetails) {
                    return res.status(400).json({
                        success:false,
                        message:`Could not find the course with ${courseId}`,
                    });
                }


                //return response
                return res.status(200).json({
                    success:true,
                    message:"Course Details fetched successfully",
                    data:courseDetails,
                })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

// updateCourse 
exports.updateCourse = async(req,res)=>{
  try {
        // fetch data
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      instructions,
      courseId
    } = req.body;

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !category ||
      !courseId
      
    ) {
      return res.status(400).json({
        success: false,
        message: "Somerthing went wrong when fetching data",
      });
    }

 try {
  if (typeof tag === "string") {
    tag = JSON.parse(tag);
  }
  if (typeof instructions === "string") {
    instructions = JSON.parse(instructions);
  }
} catch (err) {
  return res.status(400).json({
    success: false,
    message: "Failed to parse tag or instructions",
  });
}
 
if (!Array.isArray(tag) || !Array.isArray(instructions)) {
  return res.status(400).json({
    success: false,
    message: "Tags and instructions must be arrays",
  });
}  

// is Course Exist
const courseExists = await Course.findById(courseId);

if(!courseExists){
  return res.status(400).json({
    success:false,
    message:"Course not exist"
  })
}

let thubnailUrl;
if(req.files){
   const thumbnail = req.files?.thumbnail;
    // upload thumbnail
    const uploadedThumbnail = await cloudinaryUploadFunction.cloudinaryUploader(
      thumbnail,
      process.env.FOLDER_NAME
    );
    thubnailUrl =  uploadedThumbnail.secure_url;
}
else{
  thubnailUrl = courseExists.thumbnail;
}

// upadte Course 
const updatedCourse = await Course.findByIdAndUpdate(courseId,{
       courseName:courseName,
      courseDescription:courseDescription,
      whatYouWillLearn:whatYouWillLearn,
      price:price,
      tag:tag,
      thumbnail: thubnailUrl,
      instructions:instructions,
      
},{new:true}).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

// return response 
res.status(200).json({
  success:true,
  message:"Course Updated Successfully",
  updatedCourse:updatedCourse,
})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Internal Server Error",
    })
    
    
  }
}


// publish Course 
exports.publicCourse = async(req,res)=>{
  try {
    // fetch Id
    const {courseId} =  req.body;

    // validation
    if(!courseId){
      return  res.status(404).json({
        success:false,
        message:"Something went wrong when fetching courseId",
      })
    }
    
    // updatedCoures
    const updatedCourse = await Course.findByIdAndUpdate(courseId,{
      status:"Published"
    },{new:true});

    res.status(200).json({
      success:true,
      messahe:"Coures Published Sucessfully"
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Internal Server Error",
      error:error.message,
    })
    
    
  }
}

// get instructor all courses 
exports.instructorAllCourses = async(req,res)=>{
  try {
    // fetch Id
    const {instructorId} = req.params;

    // validation
    if(!instructorId){
      return  res.status(400).json({
        success:false,
        message:'Something went wrong when fetching userId',
      })
    }

    // is Instructor Exists
    const instructorDetails = await  User.findById(instructorId);

       if(!instructorDetails){
      return  res.status(400).json({
        success:false,
        message:'User not found',
      })
    }

    // get all user courses
    const allCourses = await Course.find({instructor:instructorId}).populate({
      path:"courseContent",
      populate:{
        path:"subSection"
      }
    });

    // return response
    res.status(200).json({
      success:true,
      message:"Sucessfully fetched all courses",
      allCourses:allCourses,
    })

    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Internal Server Error",
    })
    
  }
}

// deleteCourse 
exports.deleteCourse = async(req,res)=>{
  try {
    // fetch Id
    const courseId = req.params.id;

    // validation 
    if(!courseId){
      return res.status(400).json({
        success:false,
        message:"Something went wrong when fetching Id"
      })
    }

    // isCoureExists
    const course = await Course.findById(courseId);

    if(!course){
      return res.status(400).json({
        success:false,
        message:"Course not found"
      })
    }

    // is this coures created by instructor
    const userId = req.user.userId;
if (!course.instructor.equals(userId)) {
  return res.status(403).json({
    success: false,
    message: "You are not authorized to delete this course",
  });
}


    // deleteCourse
    const deleteCourse = await Course.findByIdAndDelete(courseId);

    // updated User
    const updatedUser = await User.findByIdAndUpdate(userId,{
      $pull:{courses:courseId}
    },{new:true}).populate({
      path:"courses",
      populate:{
        path:"courseContent",
        populate:{
          path:"subSection"
        }
        
      }
    }).exec();

    // return response
    res.status(200).json({
      success:true,
      message:"Coures Deleted Successfully",
      updatedCourse:updatedUser.courses,
    })

    
  } catch (error) {
     console.log(error);
    res.status(500).json({
      success:false,
      message:"Internal Server Error",
    })
    
  }
}

// getUserEnrolledCourse 
exports.studentEnrolledCourses= async(req,res)=>{
  try {

    // fetch Id
    const userId = req.user.userId;

    // validation
    if(!userId){
      return res.status(400).json({
        success:false,
        message:"Something went wrong when fetching Id",
      })
    }


    const getAllEnrolledCourses = await User.findOne({_id:userId}).populate({
      path:"courses",
      populate:{
        path:"courseContent",
        populate:{
          path:"subSection",
        
        }
      }
    }).exec();

    console.log("Logging  getAllEnrolledCourses ",getAllEnrolledCourses);
    

    return res.status(200).json({
      success:true,
      mesaage:"Successfully fetched all courses",
      getAllEnrolledCourses,
    })

    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Internal Server error"
    })
      }
}