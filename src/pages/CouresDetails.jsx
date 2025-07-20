import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaAngleUp,
} from "react-icons/fa";
import { MdAccessTime, MdOutlineConnectedTv } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { RxCursorArrow } from "react-icons/rx";
import { PiCertificateLight } from "react-icons/pi";
import { IoIosTv } from "react-icons/io";
import { format } from "date-fns";
import Footer from "../components/common/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addtoCart, removeFromCart } from "../redux/slices/addtoCartSlice";
import { FaShare } from "react-icons/fa";
import RatingAndReviewSlider from "../components/common/RatingAndReviewSlider";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-yellow-50 text-sm">
      {[...Array(fullStars)].map((_, i) => <FaStar key={i} />)}
      {halfStar && <FaStarHalfAlt />}
      {[...Array(emptyStars)].map((_, i) => <FaRegStar key={i + 10} />)}
    </div>
  );
};

const CourseDetails = () => {
  const location = useLocation();
  const data = location.state?.data;
  const { token } = useSelector((state) => state.auth);
  const { userId } = useSelector((state) => state.profile);
  const {user} = useSelector((state)=> state.profile);
  const {cartItems} = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const averageRating = data?.ratingAndReviews?.length
    ? data.ratingAndReviews.reduce((acc, curr) => acc + curr.rating, 0) / data.ratingAndReviews.length
    : 0;

  const totalSubSections = data?.courseContent?.reduce((acc, section) => {
    return acc + (section?.subSection?.length || 0);
  }, 0);

  const [openSections, setOpenSections] = useState(
    data?.courseContent?.map(() => true) || []
  );

  const handlePayment = async (amount) => {
    if(data?.studentsEnrolled.includes(userId)){
      toast.error("You are already buy this course go on enrolled course page in dashboard");
      return;
    }
     if(!token){
     toast.error("Please log in to continue.");
     return ;
    }
    if(user ===  "Instructor" || user === "Admin"){
     toast.error("Instructors are not allowed to purchase courses");
     return;
    }
    const toastId = toast.loading("Processing payment...");
    try {
      const { data: orderData } = await axios.post(
        "http://localhost:5000/api/v1/order",
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.dismiss(toastId);
      loadRazorpay(orderData);
    } catch (err) {
      console.error("Payment Error:", err);
      toast.dismiss(toastId);
      toast.error("Failed to initiate payment.");
    }
  };

  const loadRazorpay = (orderData) => {
    const options = {
      key: "rzp_test_KQl8eMmQzBU9l8",
      currency: orderData.currency,
      amount: orderData.amount,
      name: "StudyNotion",
      description: "Course Purchase",
      order_id: orderData.id,
      handler: async function (response) {
        const toastId = toast.loading("Verifying payment...");
        try {
          const verifyRes = await axios.post(
            "http://localhost:5000/api/v1/verify",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: userId,
              courseId: data._id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          toast.dismiss(toastId);
          toast.success(verifyRes.data.message || "Payment successful!");
          
       // After successful payment
if (cartItems.some((item) => item._id === data._id)) {
  dispatch(removeFromCart(data));
}

                navigate("/dashboard/enrolled-courses");

        } catch (verifyErr) {
          console.error("Verification Error:", verifyErr);
          toast.dismiss(toastId);
          toast.error("Payment verification failed.");
        }
      },
      theme: { color: "#5f63b8" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  };

  const dispatch = useDispatch();
  // const {cartItems} = useSelector((state) => state.cart);


  const addtoCarthandler = (cartData)=>{
    if(!token){
     toast.error("Please log in to continue.");
     return ;
    }
        if(user ===  "Instructor" || user === "Admin"){
     toast.error("Instructors are not allowed");
     return;
    }
    

   dispatch(addtoCart(cartData));
  }
  const removeHandler = (cartData)=>{
      if(!token){
     toast.error("Please log in to continue.");
     return ;
    }
          if(user ===  "Instructor" || user === "Admin"){
     toast.error("Instructors are not allowed");
     return;
    }
    
    dispatch(removeFromCart(cartData))
  }
  console.log("loggin daa",data);
    const handleCopy = () => {
    const currentUrl = window.location.href; 

    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        toast.success("URL copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy URL.");
        console.error(err);
      });
  };
  

  return (
    <div className="text-richblack-5">
      {/* Top Section */}
      <div className="bg-richblack-800 py-6">
        <div className="w-11/12 mx-auto flex relative lg:flex-row flex-col lg:gap-0 gap-10">
          <div className="flex flex-col gap-4 lg:border-r-[2px] lg:border-richblack-700 lg:w-[calc(100%-384px)] w-full">
            <div className="text-3xl font-bold">{data.courseName}</div>
            <div className="text-richblack-200">{data.courseDescription}</div>
            <div className="flex sm:flex-row  flex-col sm:items-center gap-2">
              {renderStars(averageRating)}
              <span className="text-yellow-50 text-sm font-semibold">{averageRating.toFixed(1)}</span>
              <span className="text-richblack-25 text-sm">
                ({data?.ratingAndReviews?.length} ratings)
              </span>
              <div className="text-richblack-25">
                {data?.studentsEnrolled?.length} students enrolled
              </div>
            </div>
            <div className="text-richblack-25">
              Created by {data?.instructor?.firstName} {data?.instructor?.lastName}
            </div>
            <div className="flex sm:flex-row flex-col lg:items-center gap-2">
              <MdAccessTime className="hidden sm:block" />
              <div className="flex gap-1">
                <p>Created at</p>
                <p>
                  {data?.createdAt
                    ? format(new Date(data.createdAt), "dd MMM yyyy, hh:mm a")
                    : "Loading..."}
                </p>
              </div>
              <CiGlobe className="hidden sm:block" />
              <p>English</p>
            </div>
          </div>

          {/* Course Preview Card */}
          <div className="lg:w-[384px] bg-richblack-700 rounded-md lg:absolute lg:-right-2 z-10">
            <img
              src={data?.thumbnail}
              alt="course"
              className="w-full lg:h-[201px] rounded-md"
            />
            <div className="w-[90%] mx-auto mt-4 flex flex-col gap-4">
              <p className="text-3xl">Rs. {data?.price}</p>
              <div className="flex flex-col gap-2">
                {!data?.studentsEnrolled.includes(userId) && <div>     {
                  cartItems.some((courseItem) => courseItem._id ===  data._id) ? (   <button onClick={()=>{removeHandler(data)}} className=" w-full bg-pink-400 text-richblack-5 px-6 py-2 rounded-md hover:bg-pink-500">
                  	Remove from Cart
                </button>) : ( <button onClick={()=>{addtoCarthandler(data)}} className=" w-full bg-yellow-50 text-richblue-900 px-6 py-2 rounded-md hover:bg-yellow-100">
                  Add to Cart
                </button>)
                } </div>}
            
                {
                  data?.studentsEnrolled.includes(userId) ? (<div 
                  onClick={()=>{  navigate("/dashboard/enrolled-courses")}}  className="bg-richblack-900 text-center text-richblack-5 px-6 py-2 rounded-md hover:bg-richblack-800"> 
                  View Course</div>) : (  <button
                  onClick={() => handlePayment(data?.price)}
                  className="bg-richblack-900 text-richblack-5 px-6 py-2 rounded-md hover:bg-richblack-800"
                >
                  Buy now
                </button>)
                }
           
              
              </div>
              <p className="text-center text-richblack-25 text-[14px]">
                30-Day Money-Back Guarantee
              </p>
              <div className="flex flex-col gap-2 text-caribbeangreen-100 text-[14px]">
                <p>This course includes:</p>
                <div className="flex gap-2 items-center">
                  <MdAccessTime />
                  <p>8 hours on-demand video</p>
                </div>
                <div className="flex gap-2 items-center">
                  <RxCursorArrow />
                  <p>Full Lifetime access</p>
                </div>
                <div className="flex gap-2 items-center">
                  <MdOutlineConnectedTv />
                  <p>Access on Mobile and TV</p>
                </div>
                <div className="flex gap-2 items-center">
                  <PiCertificateLight />
                  <p>Certificate of completion</p>
                </div>
              </div>
              <div    onClick={handleCopy} className="text-yellow-50 text-center mb-2 mt-2 flex items-center gap-1 cursor-pointer justify-center">
                <FaShare/>
                <p>Share</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What you'll learn */}
      <div className="w-11/12 mx-auto mt-6">
        <div className="lg:w-[calc(100%-384px)]">
          <div className="border-[1px] border-richblack-700 px-4 py-6 flex flex-col gap-6">
            <h2 className="text-3xl font-semibold">What you'll learn</h2>
            <p className="text-richblack-50">{data?.whatYouWillLearn}</p>
          </div>

          {/* Course content */}
          <div className="mt-10 flex flex-col gap-4">
            <p className="text-2xl font-semibold">Course content</p>
            <div className="flex justify-between text-richblack-200">
              <div className="flex gap-2">
                <span>{data?.courseContent?.length} sections</span>
                <span className="h-2 w-2 rounded-full bg-richblack-200"></span>
                <span>{totalSubSections} lectures</span>
              </div>
              <button
                onClick={() => setOpenSections(openSections.map(() => false))}
                className="text-yellow-50 underline"
              >
                Collapse all sections
              </button>
            </div>

            <div>
              {data?.courseContent.map((section, index) => (
                <details
                  key={index}
                  open={openSections[index]}
                  className="border-[1px] border-richblack-600"
                  onToggle={(e) => {
                    const updated = [...openSections];
                    updated[index] = e.target.open;
                    setOpenSections(updated);
                  }}
                >
                  <summary className="cursor-pointer flex justify-between bg-richblack-700 px-6 py-4">
                    <div className="flex gap-2 items-center">
                      <FaAngleUp />
                      <p>{section.sectionName}</p>
                    </div>
                    <span className="text-yellow-50">
                      {section.subSection.length} lectures
                    </span>
                  </summary>
                  {section?.subSection?.map((lecture, i) => (
                    <div
                      key={i}
                      className="text-richblack-500 px-6 py-4 flex items-center gap-2 border-b border-richblack-600"
                    >
                      <IoIosTv />
                      <p>{lecture.title}</p>
                    </div>
                  ))}
                </details>
              ))}
            </div>
          </div>

          {/* Author Section */}
          <div className="mt-6 flex flex-col gap-2">
            <p className="text-2xl font-semibold">Author</p>
            <div className="flex items-center gap-4">
              <img
                src={data?.instructor?.image}
                alt="Instructor"
                className="h-[66px] w-[66px] rounded-full"
              />
              <p className="font-semibold">
                {data?.instructor?.firstName} {data?.instructor?.lastName}
              </p>
            </div>
            <p className="text-richblack-50">
              I will be your lead trainer in this course. I will help you
              understand the subject easily. I have experience in online
              training and video content creation.
            </p>
          </div>

        
        </div>
      </div>

  {/* Reviews */}
          <div className="mt-36 w-[80%] mx-auto flex flex-col gap-12">
            <p className="text-3xl text-center font-semibold ">
              Reviews from other learners
            </p>
            <RatingAndReviewSlider/>
          </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CourseDetails;
