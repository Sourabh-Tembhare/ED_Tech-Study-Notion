const Category = require("../models/category");
const Course = require('../models/Course');

// create category
exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		console.log(CategorysDetails);
		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};

// fetchb all categories
exports.showAllCategories = async (req, res) => {
	try {
		const allCategorys = await Category.find(
			{},
			{ name: true, description: true }
		);
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

//categoryPageDetails 
exports.categoryPageDetails = async (req, res) => {
    try {
        // fetch categoryId
        const {categoryId} = req.params;

        // validation
        if(!categoryId){
            return res.status(400).json({
                success:false,
                message:"Something went wrong when fetching Id"
            })
        }

        // check is category exist
        const categoryDetailsExist = await Category.findById(categoryId);

        if(!categoryDetailsExist){
            return res.status(404).json({
                success:false,
                message:"Category not found"
            })
        }

        //  find most popular courses of this category
        const popularCourses = await  Course.find({category:categoryId,status:"Published"}).sort({ratingAndReviews:-1})
        .limit(6).populate("instructor").populate("ratingAndReviews").populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        // find new published courses 
        const newCourses = await Course.find({category:categoryId,status:"Published"}).sort({createdAt:-1}).limit(6).populate("instructor").populate("ratingAndReviews").populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        // frequently bought courses
        const frequentlyBoughtCourses = await  Course.find({category:categoryId,status:"Published"}).sort({studentsEnrolled:-1})
        .limit(6).populate("instructor").populate("ratingAndReviews").populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        // return  response
        return res.status(200).json({
            success:true,
            message:"Successfully fetched all courses",
            popularCourses:popularCourses,
            newCourses:newCourses,
            frequentlyBoughtCourses:frequentlyBoughtCourses,
            categoryDetails:categoryDetailsExist,
        })

    }
    catch(error ) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        });
    }
}