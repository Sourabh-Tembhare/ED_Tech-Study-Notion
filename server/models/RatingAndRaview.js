const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User",
    },
    rating: {
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
    }
});

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema)