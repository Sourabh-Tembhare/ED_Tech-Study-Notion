const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { cloudinaryUploader } = require("../utils/cloudinaryUploader");
const Course = require('../models/Course');
require("dotenv").config();

// create Subsection
exports.createSubSection = async(req,res)=>{
    try {

        // fetch data
        const{sectionId,title,description,courseId} = req.body;
        const {video} = req.files;

        // validation
        if(!title  || !description){
            return res.status(404).json({
                success:false,
                message:'please fill all the input fields',
            })
        }
         if(!sectionId || !courseId){
            return res.status(400).json({
                success:false,
                message:'Something went wrong',
            })
        }
      
      // upload video in cloudinary
      const videoUpload =  await cloudinaryUploader(video,process.env.FOLDER_NAME);

      if(!videoUpload){
        return res.status(400).json({
            success:false,
            message:"Something went wrong when uploading the video",
        })
      }

      // create subsection entry in db
      const newSubSection = await SubSection.create({
        title,
        description,
        videoUrl:videoUpload.secure_url,
      })

      // update section
      const updatedSection = await Section.findByIdAndUpdate(sectionId,
        {
            $push:{
                subSection:newSubSection._id,
            }
        },{new:true}
      )

      // updated Coures
      const updatedCourse =  await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

      // return response
      return res.status(200).json({
        success:true,
        message:"Sucessfully create the subsection",
        newSubSection:newSubSection,
        updatedSection:updatedSection,
        updatedCourse:updatedCourse,
      })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong when creating the subsection",
        })
        
        
    }
}

// update subsection
exports.updateSubSection = async(req,res)=>{
    try {
  
        // fetch subsection id
        const {subSectionId,courseId} = req.body;

        //  validation
        if(!subSectionId || !courseId){
            return res.status(400).json({
                success:false,
                message:"Something went wrong when fetching Id",
            })
        }

        // fetch subsection data
        const subSectionDetails = await SubSection.findById(subSectionId);

        if(!subSectionDetails){
             return res.status(400).json({
                success:false,
                message:"Subsection details not found",
            })
        }

    
        const data = {};

        if(!req.body.title){
            data.title = subSectionDetails.title;
        }
        else{
            data.title = req.body.title;
        }
        if(!req.body.description){
            data.description = subSectionDetails.description;
        }
        else{
            data.description = req.body.description;
        }
        if(!req.files){
            data.videoUrl = subSectionDetails.videoUrl;
        }
        else{
         const newVideo =   await cloudinaryUploader(req.files.video,process.env.FOLDER_NAME);
         data.videoUrl = newVideo.secure_url;
        }

        // update subSection
        const updatedSubSection = await SubSection.findByIdAndUpdate(subSectionId,data,{new:true});

        // updated Course
        const updatedCourse = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        // return response
        return res.status(200).json({
            success:true,
            message:"SubSection updated Succesfully",
            updatedSubSection,
            updatedCourse:updatedCourse,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
        
    }
}


// delete subsection
exports.deleteSubsection = async(req,res)=>{
    try {

        // fetch id
        const {id} = req.params;

        const {sectionId,courseId} = req.body;

        // validation
        if(!id || !courseId || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Error during fetching id"
            })
        }

        // delete entry from DB
        const deleteSubSection = await SubSection.findByIdAndDelete(id);

        // updated Setion
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{
            $pull:{subSection:id}
        });

        // updated Course 
        const updatedCourse= await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();


        // return response
        return res.status(200).json({
            success:true,
            message:"Sucessfully delete the subsection",
            updatedCourse:updatedCourse,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
        
        
    }
}