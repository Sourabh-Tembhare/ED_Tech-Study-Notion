const express = require("express");
const app = express();
require("dotenv").config();
const dbconnect = require("./config/database");
const authrouter = require("./routes/authRoute");
const courseroute = require("./routes/courseRoute");
const sectionRoute = require("./routes/sectionRoute");
const subSectionRoute = require("./routes/subSectionRoute");
const profileRoute = require("./routes/profileRoute");
const categoryRoute = require("./routes/category");
const paymentRoute = require("./routes/paymentRoute");
const {cloudinaryConnection} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const cors = require("cors");


// FIND PORT NUMBER
const PORT = process.env.PORT || 4000;


// parser
app.use(express.json());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(cors());


// mount rotute
app.use("/api/v1",authrouter);
app.use("/api/v1",courseroute);
app.use("/api/v1",sectionRoute);
app.use("/api/v1",subSectionRoute);
app.use("/api/v1",profileRoute);
app.use("/api/v1",categoryRoute);
app.use("/api/v1",paymentRoute);



// DB CONNECTION
dbconnect.dbconnect();

// cloudinary connection
cloudinaryConnection();

// listen port
app.listen(PORT,()=>{
    console.log(`Server is sucessfully running at port number ${PORT}`);
    
});
