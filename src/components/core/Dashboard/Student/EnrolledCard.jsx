import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

const EnrolledCard = ({ course }) => {
  const { token } = useSelector((state) => state.auth);
  const [completedVideo, setCompletedVideo] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getCourseProgress = async () => {
    try {
      setLoading(true);
      
      const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await axios.get(
        `${BASE_URL}/api/v1/fetchCourseProgres/${course._id}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      setCompletedVideo(response.data.completedVideo);
      setTotalVideos(response.data.totalVideos);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourseProgress();
  }, []);

  const progress = totalVideos > 0 ? completedVideo / totalVideos : 0;

const navigateHandler = () => {
  if (
    course &&
    Array.isArray(course.courseContent) &&
    course.courseContent.length > 0 &&
    Array.isArray(course.courseContent[0].subSection) &&
    course.courseContent[0].subSection.length > 0
  ) {
    navigate(
      `/courseView/course/${course._id}/section/${course.courseContent[0]._id}/subsection/${course.courseContent[0].subSection[0]._id}`
    );
  } else {
    toast.error("Course content not available");
    console.warn("Invalid course content:", course);
  }
};


  return (
    <div className="mt-4 lg:ml-28 text-richblack-5 lg:w-[82%] cursor-pointer" onClick={navigateHandler}>
 
      <div className="sm:h-[100px] p-4 flex flex-row justify-between sm:items-center bg-richblack-800 rounded-md mt-2 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
        {/* Course Info */}
        <div className="flex gap-4 sm:items-center sm:flex-row flex-col">
          <img
            src={course?.thumbnail}
            alt="courseImage"
            className="h-[80px] w-[80px]  object-cover rounded-md shadow-md"
          />
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-richblack-25">{course?.courseName}</p>
            <p className="text-sm text-richblack-300">
              {course?.courseDescription.substring(0, 60)}...
            </p>
          </div>
        </div>

        {/* Progress Circle */}
        <div className="h-[80px] w-[80px]  rounded-full bg-gradient-to-br from-blue-800 to-cyan-600 p-[2px] shadow-md">
          <div className="h-[80px] w-[80px]  bg-richblack-900 rounded-full flex items-center justify-center">
            <CircularProgressbarWithChildren
              value={progress}
              maxValue={1}
              styles={buildStyles({
                pathTransitionDuration: 0.8,
                pathColor: '#22c55e',
                trailColor: '#1e293b',
              })}
            >
              <div className="text-white text-sm font-bold">
                {Math.round(progress * 100)}%
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCard;
