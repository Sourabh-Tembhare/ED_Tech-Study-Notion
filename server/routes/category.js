const express = require("express");
const router = express.Router();

const {createCategory,showAllCategories,categoryPageDetails} = require("../controllers/category");
const {checkAuth,isAdmin} = require("../middlewares/auth");

router.post("/create-category",checkAuth,isAdmin,createCategory);
router.get("/get-all-categories",showAllCategories);
router.get("/get-category-page-details/:categoryId",categoryPageDetails);


module.exports = router;
