const Section = require("../models/Section");
const Course = require("../models/Course");


// create course
exports.createSection = async(req,res)=>{
    try {
        // fetch data
        const {sectionName,courseId} = req.body;

        // validation
        if(!sectionName){
            return res.status(404).json({
                success:false,
                message:"Please fill input field",
            })
        }
        if(!courseId){
            return res.status(404).json({
                success:false,
                message:"Something went wrong , try again latter",
            })
        }

        // create section
        const newSection = await Section.create({sectionName});

        // update course
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{
            $push:{
                courseContent:newSection._id,
            }
        },{new:true}).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        // return response
        return res.status(200).json({
            success:true,
            message:"Sucessfully section is created",
            courseDetails:updatedCourse,      
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong, please try again latter"
        })
        
    }
}

// update section
exports.updateSection = async(req,res)=>{
    try {

        // fetch data
        const sectionName = req.body.sectionName;
        const sectionId = req.body.sectionId;
        const {courseId} = req.body;

        // validation 
        if(!sectionName){
            return res.status(404).json({
                success:false,
                message:"Please fill input field",
            })
        }
         if(!sectionId || !courseId){
            return res.status(404).json({
                success:false,
                message:"Something went wrong",
            })
        }

        // is Section Exists 
        const section = await Section.findById(sectionId);

        if(!section){
            return  res.status(400).json({
                success:false,
                message:"Section not exists",
            })
        }

        if(section.sectionName === sectionName){
              return  res.status(400).json({
                success:false,
                message:"Section name is unchanged. Please modify it before updating",
            })
        }
 
        // update data
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{
            sectionName:sectionName,
        },{new:true});

            // updatedCourse
        const updatedCourse = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
        }).exec();

        

   
        // return response
        return res.status(200).json({
            success:true,
            message:"Section is updated sucessfully",
            updatedCourse:updatedCourse,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong, while updating the section"
        })
        
        
    }
}

// delete section
exports.deleteSection = async (req,res) => {
    try {

        // fetch data
        const sectionId = req.params.id;
        const {courseId} = req.body;

        // validation
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"Something went wrong",
            })
        }

        // delete section
        const deleteCourse = await Section.findByIdAndDelete(sectionId);

        // update the course 
      const updatedCourse = await Course.findOneAndUpdate(courseId,{
        $pull:{
            courseContent:sectionId,
        }
      },{new:true}).populate({
        path:"courseContent",
        populate:{
            path:"subSection"
        }
      }).exec();
     
        // return response 
        return res.status(200).json({
            success:true,
            message:"Sucessfully delete the Section",
            updatedCourse:updatedCourse,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong when delete the section",
        })
        
        
    }
}