const cloudinary = require("cloudinary").v2;

exports.cloudinaryUploader = async(file,folder,quality,height)=>{
    try {
        const options = {folder};
        if(quality){
            options.quality = quality;
        }

        if(height){
            options.height = height;
        }

        options.resource_type = 'auto';

        return await cloudinary.uploader.upload(file.tempFilePath,options);

    } catch (error) {
        console.log("Error while uploading file in cloudinary");
        console.log(error);
    }
}