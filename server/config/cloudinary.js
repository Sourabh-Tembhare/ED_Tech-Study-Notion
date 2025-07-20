const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.cloudinaryConnection = async()=>{
    try {
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET,
        })
        console.log("Cloudinary connection establish sucessfully");
        
    } catch (error) {
        console.log("Error during Cloudinary Connection");
        console.log(error);
    }
}