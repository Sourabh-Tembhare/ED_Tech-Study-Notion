import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdAccessTimeFilled } from 'react-icons/md';
import { LuPen } from 'react-icons/lu';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { setCourse, setEditCourse, setMyCourseEdit } from '../../../redux/slices/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { format } from "date-fns";

const MyAllCourses = ({ course, setAllCourses, setLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const editHandler = () => {
    dispatch(setMyCourseEdit(true));
    dispatch(setCourse(course));
    dispatch(setEditCourse(true));
    navigate("/dashboard/edit-course");
  };

  const deleteHandler = async (courseId) => {
    const confirm = window.confirm("Deleting this course will remove all associated content. Do you wish to continue?");
    if (!confirm) return;

    try {
      setLoading(true);
          const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await axios.delete(`${BASE_URL}/api/v1/delete-course/${courseId}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setAllCourses(response.data.updatedCourse);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="text-richblack-5 border border-richblack-700 rounded-md overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between gap-6 px-4 py-6 border-b border-richblack-700">
        {/* Left Section */}
        <div className="flex flex-col md:flex-row md:w-[60%] gap-4">
          <img
            src={course.thumbnail}
            alt="courseThumbnail"
            className="w-full md:w-[221px] h-[180px] object-cover rounded-md"
          />
          <div className="flex flex-col gap-2">
            <p className="text-base md:text-lg font-semibold">{course.courseName}</p>
            <p className="text-sm text-richblack-300 hidden lg:block">{course.courseDescription}</p>
            <p className="text-xs md:text-sm text-richblack-400">
              <span className="text-richblack-200 font-medium">Created:</span>{" "}
              {course?.createdAt
                ? format(new Date(course.createdAt), "dd MMM yyyy, hh:mm a")
                : "Loading..."}
            </p>

            <div>
              {course.status === 'Published' ? (
                <div className="bg-richblack-700 gap-2 rounded-full px-3 py-1 flex items-center w-fit">
                  <FaCheckCircle className="text-yellow-50 text-sm" />
                  <p className="text-yellow-100 text-xs font-medium">Published</p>
                </div>
              ) : (
                <div className="bg-richblack-700 gap-2 rounded-full px-3 py-1 flex items-center w-fit">
                  <MdAccessTimeFilled className="text-pink-100 text-sm" />
                  <p className="text-pink-100 text-xs font-medium">Drafted</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex md:flex-col justify-between md:justify-start md:items-end md:w-[40%] gap-4">
          <p className="text-sm text-richblack-200">2hr 30min</p>
          <p className="text-sm text-richblack-200">₹{course.price}</p>
          <div className="flex gap-4 text-lg text-richblack-300">
            <button className="hover:text-caribbeangreen-400 transition-all" onClick={editHandler}>
              <LuPen />
            </button>
            <button className="hover:text-pink-400 transition-all" onClick={() => deleteHandler(course._id)}>
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAllCourses;
