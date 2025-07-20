import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import MyAllCourses from '../MyCourses/MyAllCourses';
import Spinner from '../../common/Spinner';


const MyCourse = () => {
    const [allCourses,setAllCourses]  = useState([]);
    const [loading,setLoading] = useState(true);
    const instructorId = useSelector((state)=> state.profile.userId);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const getAllCourses = async()=>{
        
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/api/v1/get-instructor-all-courses/"+instructorId,{
                headers:{
                    Authorization:'Bearer '+token
                }
            });
            setAllCourses(response.data.allCourses);
            setLoading(false);         
            
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");            
        }
    }
useEffect(()=>{
    getAllCourses();
},[]);

  return (
    <div className=' w-[86%] mx-auto mt-4'>
        <div className='flex justify-between'>
            <h2 className='text-richblack-5 text-3xl font-semibold'>My Courses</h2>
               <button onClick={()=>{navigate("/dashboard/create-course")}}
                        className="bg-yellow-50 flex items-center justify-center gap-2 w-fit  text-richblue-900 px-6 py-1 rounded-md hover:bg-yellow-100 shadow-[2px_2px_white]"
                      >
                        <p> Add Course</p>
                        <FaPlus />
                      </button>
        </div>
     {
        loading ?<div className='flex items-center justify-center mt-52'>  <Spinner/> </div>  :         <div>
            {
                allCourses.length < 1 ? (<>
                <div className='text-richblack-5 font-semibold text-2xl mt-40 ml-[38%]'>
                    No Courses Found
                </div>
                </>) : (<div className='mb-8'>
                 {/* Header Row */}
      <div className="flex justify-between bg-richblack-800 px-6 py-3 border-b border-richblack-700 text-sm font-semibold text-white  mt-8">
        <p className="w-[60%]">COURSE</p>
     
      </div>
                {
                    allCourses.map((course) => {
                        return <MyAllCourses key={course._id} course={course} setLoading={setLoading} setAllCourses={setAllCourses} />
                    })
                }
                </div>)
            }
        </div>
     }

    </div>
  )
}

export default MyCourse