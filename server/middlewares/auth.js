const jwt = require("jsonwebtoken");
require("dotenv").config();

// authentication
exports.checkAuth = (req,res,next)=>{
    try{
    const token = req.headers.authorization.split(" ")[1];
    // verify token 
    const verify = jwt.verify(token,process.env.SECREATE_KEY);
    req.user = verify;
     next();   
    } catch(error){
        console.log(error);
        res.status(401).json({
            sucess:false,
            message:"Invalid Token"
        })
        
    }
}

//isStudent
exports.isStudent = async(req,res,next)=>{
  try {
      if(req.user.accountType !== "Student"){
        return res.status(403).json({
            success:false,
            message:"This is protected route for Student"
        })
    }
    next();
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Internal Server Error",
    })
    
  }
}


//isInstructor
exports.isInstructor = async(req,res,next)=>{
  try {
      if(req.user.accountType !== "Instructor"){
        return res.status(403).json({
            success:false,
            message:"This is protected route for Instructor"
        })
    }
    next();
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Internal Server Error",
    })
    
  }
}


//isAdmin
exports.isAdmin = async(req,res,next)=>{
  try {
      if(req.user.accountType !== "Admin"){
        return res.status(403).json({
            success:false,
            message:"This is protected route for Admin"
        })
    }
    next();
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Internal Server Error",
    })
    
  }
}
