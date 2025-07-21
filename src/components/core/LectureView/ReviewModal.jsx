import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { render } from "react-dom";
import axios from "axios";
import { setViewCourseAllData } from "../../../redux/slices/viewLectureSlice";
import { toast } from "react-toastify";

const ReviewModal = ({ setMoadal }) => {
  const { courseAllData } = useSelector((state) => state.lecture);
  const [expericence, setExpercience] = useState("");
  console.log("Logging CourseAll Data", courseAllData);
  const { userId } = useSelector((state) => state.profile);
  const [rating, setRating] = useState(0);
  const {token} = useSelector((state) => state.auth);
  const [editSetting,setEditSetting] = useState(true);
 
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      rating: rating,
      review: expericence,
      courseId: courseAllData._id,
    };
    try {
        setLoading(true);
        var toastId = toast.loading("loading...")
         const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
        const response = await axios.post(`${BASE_URL}/api/v1/createRating`,data,{
            headers:{
                Authorization:'Bearer '+token,
            }
        })
        dispatch(setViewCourseAllData(response.data.updatedCourseDetails));
        toast.update(toastId,{
            autoClose:3000,
            type:"success",
            render:response.data.message,
            isLoading:false,
        })
        setLoading(false);
        setMoadal(false);
    } catch (error) {
        setLoading(false);
             toast.update(toastId,{
            autoClose:3000,
            type:"error",
            render:error.response?.data?.message,
            isLoading:false,
        })
        console.log(error);
        
    }
  };

  useEffect(()=>{
    if(courseAllData.ratingAndReviews.length < 1){
    return ;
    }
    const reviewData =  courseAllData.ratingAndReviews.find((d) =>  d.user._id === userId && d.courseId === courseAllData?._id);
    if(reviewData){
        setExpercience(reviewData.review);
        setRating(reviewData.rating);
        setEditSetting(false);
    }
  },[])

  return (
    <div className="fixed inset-0 bg-black opacity-70 z-50 text-white flex items-center justify-center">
      <div className="bg-richblack-900 w-[665px] rounded-md">
        <div className="flex flex-row justify-between items-center px-2 py-4 bg-richblack-700 rounded-md">
          <p className="font-semibold text-2xl ">Add Review</p>
          <RxCross1
            size={25}
            className="cursor-pointer"
            onClick={() => setMoadal(false)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center self-center mt-6">
            <img
              src={courseAllData?.instructor?.image}
              alt="instructorImage"
              className="h-[66px] w-[66px] rounded-full"
            />
            <div className="flex flex-col ">
              <p>
                {courseAllData?.instructor?.firstName}{" "}
                {courseAllData?.instructor?.lastName}
              </p>
              <p>Posting Publicly</p>
            </div>
          </div>
          <div className="self-center">
            <ReactStars
            key={editSetting ? "editable" : "readonly"}
              count={5}
              onChange={ratingChanged}
              size={30}
              color2={"#ffd700"}
              value={rating}
              edit={editSetting}
            />
          </div>
          <form className="px-10" onSubmit={submitHandler}>
            <label className="flex flex-col gap-1">
              <p>
                Add Your Experience <sup className="text-pink-400">*</sup>
              </p>
              <textarea
                name="courseDescription"
                required
                disabled={!editSetting}
                onChange={(e) => {
                  setExpercience(e.target.value);
                }}
                value={expericence}
                className="bg-richblack-700 rounded-md w-full p-2 border-b-[1px] h-28 outline-none"
                placeholder="Add Your Experience"
              ></textarea>
            </label>
            <div className="flex gap-4 justify-end mt-4 mb-4">
              <button
                type="button"
                onClick={() => {
                  setMoadal(false);
                }}
                className="bg-richblack-500 flex items-center justify-center  w-fit  text-richblue-900 px-6 py-1 rounded-md "
              >
                <p className="font-semibold"> Cancel</p>
              </button>
              {  courseAllData.ratingAndReviews.length > 0 && courseAllData.ratingAndReviews.some(
                (r) =>
                  r.user._id === userId && r.courseId === courseAllData?._id
              ) ? (
                <>You are already rate and  review this course</>
              ) : (
                <button
                disabled={loading}
                  type="submit"
                  className="bg-yellow-50 flex items-center justify-center w-fit  text-richblue-900 px-6 py-1 rounded-md hover:bg-yellow-100 "
                >
                  <p className="font-semibold"> Save</p>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
