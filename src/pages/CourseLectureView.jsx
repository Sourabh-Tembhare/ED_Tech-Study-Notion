import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLoaderData, useLocation, useParams } from 'react-router-dom'
import { setAllReviews, setCompletedLectures, setTotalLectures, setViewCourseAllData, setViewSectionData } from '../redux/slices/viewLectureSlice';
import { toast } from 'react-toastify';
import LectureSideBar from '../components/core/LectureView/LectureSideBar';
import Spinner from '../components/common/Spinner';
import ReviewModal from '../components/core/LectureView/ReviewModal';
import LectureVideo from '../components/core/LectureView/LectureVideo';

const CourseLectureView = () => {
    const params = useParams();
    const courseId = params.courseId;
    const [loading,setLoading]  =  useState(false);
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const [progressLoading,setProgressLoading] = useState(false);
    const [modal,setMoadal] = useState(false);


    const  getCourseDetails = async()=>{
        try {
            setLoading(true);
            const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
            const response = await axios.get(`${BASE_URL}/api/v1/get-course-details/`+courseId);
            dispatch(setViewCourseAllData(response.data.data));
            dispatch(setViewSectionData(response.data.data.courseContent));
            setLoading(false);
      
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");        
        }
    }

    // getCourseTotalLecture and completed Videos
  const getCourseProgress = async () => {
    try {
        setProgressLoading(true);
             const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await axios.get(
        `${BASE_URL}/api/v1/fetchCourseProgres/${courseId}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch( setTotalLectures(response.data.totalVideos));
      dispatch(setCompletedLectures(response.data.completedVideo));
      dispatch(setAllReviews(response.data.allReviews));
      setProgressLoading(false);
    } catch (error) {
        setProgressLoading(false);
        console.log(error);
       toast.error(error.response?.data?.message || 'Something went wrong');
  
    }
  };


useEffect(()=>{

    getCourseDetails();
    getCourseProgress();
},[courseId])
  
  return (
<div>
    {
        loading || progressLoading ? (<div className='flex items-center justify-center h-[calc(100vh-56px)]'> <Spinner/> </div>) :     <div className='flex  h-[calc(100vh-56px)]'>
        <div className=' lg:w-[18%] w-[40%] overflow-y-auto h-[100%]'>
            <LectureSideBar setMoadal={setMoadal}/>
        </div>
        <div className='lg:w-[82%] w-[60%] overflow-y-auto h-[100%]'>
            <LectureVideo/>
        </div>
    </div>
    }

    {
        modal && <ReviewModal setMoadal={setMoadal}/>
    }
</div>
  )
}

export default CourseLectureView