import React, { useEffect, useState } from 'react'
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import axios from 'axios';
import { setAllReviews, setCompletedLectures } from '../../../redux/slices/viewLectureSlice';
import { toast } from 'react-toastify';

const LectureSideBar = ({setMoadal}) => {
    const navigate  = useNavigate();
    const {courseAllData} = useSelector((state) => state.lecture);
    const {courseTotalLectures} = useSelector((state) => state.lecture);
    const {courseCompletedLectures} = useSelector((state) => state.lecture);
    const {courseSectionData} = useSelector((state) => state.lecture);
    const {allReviews} = useSelector((state) => state.lecture);
    const {userId} = useSelector((state) => state.profile)
    const params = useParams();
    const [loading,setLoading] = useState(false);
    const [sectionId,setSectionId] = useState("");
    const [subSectionId,setSubSectionId] = useState("");
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(()=>{
    const SectionIdP = params.sectionId;
    setSectionId(SectionIdP)
    const subSectionIdP = params.subSectionId;
    setSubSectionId(subSectionIdP)
    },[location.pathname]) ;

    // console.log("Course  allReviews",allReviews);
    const subSectionIdsetHandler = (sectionIdSet)=>{
      // console.log("sectionIdSet",sectionIdSet);
      
     setSectionId(sectionIdSet)
          // console.log("sectionId",sectionId);

    }

    const completedVideosHandler = async(subSecId,secId)=>{
      const data = {
        courseId:courseAllData._id,
        userId:userId,
        subSectionId:subSecId,
        sectionId:secId,
      };
      try {
        setLoading(true);
         const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
        const response = await axios.post(`${BASE_URL}/api/v1/addCourseProgres`,data,{
          headers:{
            Authorization:'Bearer '+token
          }
        })
        dispatch(setCompletedLectures(courseCompletedLectures+1));
        dispatch(setAllReviews(response.data.newcourseProgress));
        setLoading(false);       
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");  
      }
    }
    
  return (
    <div className='bg-richblack-800 h-[100%] text-richblack-5  '>
      <div className='flex items-center justify-between px-4 pt-6 lg:flex-row lg:gap-0 gap-4 flex-col'>
        <IoChevronBackCircleOutline size={30}  className='cursor-pointer' onClick={()=>{navigate("/dashboard/enrolled-courses")}}/>
        <button
        onClick={()=>{setMoadal(true)}}
      className="bg-yellow-50 w-fit  text-richblue-900 px-6 py-1 rounded-md hover:bg-yellow-100  transition-all duration-300">
      Add Review
     </button>
      </div>
      <div className='mt-4 px-4 text-richblack-100 font-semibold flex flex-col gap-1'>
        <p>{courseAllData?.courseName}</p>
        <p>{courseCompletedLectures} {" "}/{" "}{courseTotalLectures}</p>
      </div>
      <div className='h-[1px] w-[86%] mx-auto px-4 bg-richblack-600 mt-4 mb-2'></div>
      <div>
        {
          courseSectionData.map((section,index)=>{
            return <div key={index}>
              <div className='flex px-4  border-b-[1px] border-richblack-900 items-center justify-between py-4 bg-richblack-700 ' onClick={()=>{subSectionIdsetHandler(section._id)}}>
                <p>
                  {
                    section?.sectionName
                  }
                </p>
                   {
                    sectionId === section._id ? (<IoIosArrowDown/>) : (<IoIosArrowUp/>)
                   }
              </div>
              {
                sectionId === section._id &&  section?.subSection.length > 0 && <div>
                  {
                    section.subSection.map((subSection,index)=>{
                      return  <div key={index} className={`flex lg:flex-row flex-col px-4 border-b-[1px] border-richblack-700 lg:items-center gap-2 py-4 bg-richblack-900 ${subSectionId === subSection._id ? "bg-yellow-50 text-richblack-900" : ""} `}>
                          {
                            allReviews === null ? (  loading ?    <div className="w-4 h-4 ml-2 border-2 border-t-transparent border-black rounded-full animate-spin"></div> :   <MdOutlineRadioButtonUnchecked  onClick={()=>{completedVideosHandler(subSection._id,section._id)}}/>) : (<div>
                              {
                                allReviews.completedVideos.includes(subSection._id) ? (<MdOutlineRadioButtonChecked/>) : (  loading ?    <div className="w-4 h-4 ml-2 border-2 border-t-transparent border-black rounded-full animate-spin"></div> :    <MdOutlineRadioButtonUnchecked  onClick={()=>{completedVideosHandler(subSection._id,section._id)}}/>)
                              }
                               </div>)
                          }
                          <p onClick={()=> navigate(`/courseView/course/${courseAllData._id}/section/${sectionId}/subsection/${subSection._id}`)} className='cursor-pointer'>{subSection.title}</p>
                      </div>
                    })
                  }
                </div>
              }
               </div>
          })
        }
      </div>

    </div>
  )
}

export default LectureSideBar