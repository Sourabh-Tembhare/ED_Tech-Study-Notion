const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");


exports.addCourseProgres = async (req,res)=>{
    try {

        // fetch details
        const {courseId,userId,subSectionId,sectionId} = req.body;

        // valiadation
        if(!courseId || !userId || !subSectionId || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Something went wrong when fetching Id"
            })
        }

        // check is course Exists
        const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })
        
           if(!course){
               return res.status(400).json({
                success:false,
                message:"Course not exist"
            })
        }
   
        // check is subSection exist
        const subSection = await SubSection.findById(subSectionId);
           if(!subSection){
               return res.status(400).json({
                success:false,
                message:"Subsection not exist"
            })
        }

        const progress = await CourseProgress.findOne({courseId:courseId,userId:userId});

        if(progress){
            if(progress.completedVideos.includes(subSectionId)){
                      return res.status(400).json({
                success:false,
                message:"This lecture is allready mark as completed"
            })
            }
            
        }

          const newcourseProgress = await CourseProgress.findOneAndUpdate(
          { userId: userId, courseId: courseId },
           { $addToSet: { completedVideos: subSectionId } },
            { new: true, upsert: true }
             );
            
             const section = await Section.findById(sectionId);

             // return  response
             res.status(200).json({
                success:true,
                message:"Progress added",
                completedVideo:newcourseProgress.completedVideos.length,
                totalVideos:section.subSection.length,
                newcourseProgress:newcourseProgress,
             })

   
    } catch (error) {
        console.log(error);
             res.status(500).json({
                success:false,
                message:"Internal Server Error",
                error:error.message
        
      
             })
        
        
    }
}


// fetch course progress 
exports.fetchCourseProgres = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user.userId;

    if (!courseId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong when fetching Id",
      });
    }

    const course = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Course not exist",
      });
    }

    let totalLectures = 0;
    course.courseContent.forEach((section) => {
      totalLectures += section.subSection.length;
    });

    const courseProgress = await CourseProgress.findOne({
      userId: userId,
      courseId: courseId,
    });

    // handle if no progress yet
    const completedVideoCount = courseProgress ? courseProgress.completedVideos.length : 0;

    return res.status(200).json({
      success: true,
      message: "Progress fetched",
      completedVideo: completedVideoCount,
      totalVideos: totalLectures,
      allReviews:courseProgress,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
