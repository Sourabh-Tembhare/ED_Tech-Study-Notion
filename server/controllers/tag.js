const Tag = require("../models/tags");

// create tag
exports.createTag = async(req,res)=>{
    try {

        // fetch date
        const {name,description} = req.body;

        // validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"Please fill all the input fields",
            })
        }

        // create entry in DB
        const newTag = await Tag.create({name,description});

        // return response
        return res.status(200).json({
            success:true,
            message:"Sucessfully create tag",
            response:newTag,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
        
        
    }
}

// get all tags
exports.getAllTags = async(req,res)=>{
    try {

        // fetch all tags 
        const allTags = await Tag.find({});
       // const allTags = await Tag.find({}).populate("course").exec();

        // return response
        return res.status(200).json({
            success:true,
            message:"Sucessfully fetched all tags",
            allTags:allTags,

        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
        
        
    }
}