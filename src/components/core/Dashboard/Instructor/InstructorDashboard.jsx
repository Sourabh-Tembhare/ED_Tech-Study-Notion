import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import InstructorChart from './InstructorChart';
import axios from 'axios';
import Spinner from '../../../common/Spinner';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const InstructorDashboard = () => {
    const {firstName} = useSelector((state) => state.profile);
    const {lastName} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const [allCourses,setAllCourses] = useState([]);
    const [totalStudents,setTotalStudents] = useState(0);
    const [totalIncome,setTotalIncome]  = useState(0);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const getinstructorDashboardpageDeatails = async()=>{
        try {
            setLoading(true);
                 const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
            const response = await axios.get(`${BASE_URL}/api/v1/instructorDashboard`,{
                headers:{
                    Authorization:'Bearer '+token,
                }
            })
            setAllCourses(response.data.allCourses);
            setTotalStudents(response.data.totalStudent);
            setTotalIncome(response.data.totalIncome);
            setLoading(false);          
        } catch (error) {
            console.log(error);
            setLoading(false);    
        }
    }

    useEffect(()=>{
        getinstructorDashboardpageDeatails();
    },[])
  return (
    <div className='text-richblack-5  w-[86%] mx-auto mt-4 flex flex-col gap-2'>
        <h2 className='text-2xl font-semibold'>Hi {firstName}{" "}{lastName}👋</h2>
        <p className='text-richblack-200'>Let's start something new</p>
        <div>
           {
            loading ? (<div className='w-[100%] h-[calc(100%-56px)] flex justify-center items-center'> <Spinner/></div>) : (<div>
                {
                    allCourses.length > 0 ? (<div>
                        <div className='flex flex-col gap-4'>
                           <div  className='flex lg:flex-row gap-4 flex-col'>
                             <InstructorChart courses={allCourses}/>
                             <div className='bg-richblack-800 p-6 flex flex-col gap-4 lg:w-[30%] rounded-md'>
                                 <p className='text-xl font-semibold'>Statistics</p>
                                 <div>
                                    <p className='text-richblack-300'>
                                        Total Courses
                                    </p>
                                    <p className='text-2xl font-semibold'>{allCourses.length}</p>
                                 </div>
                                 <div>
                                    <p className='text-richblack-300'>
                                        Total Students
                                    </p>
                                    <p className='text-2xl font-semibold'>{totalStudents}</p>
                                 </div>
                                 <div>
                                    <p className='text-richblack-300'>
                                        Total Income
                                    </p>
                                    <p className='text-2xl font-semibold'>{totalIncome}</p>
                                 </div>
                             </div>
                           </div>
                           <div className='bg-richblack-800 p-4 flex flex-col gap-4 w-[100%] rounded-md mb-10'>
                         <div className='flex justify-between '>
                            <p className='text-xl font-semibold'>Your Courses</p>
                            <p className='text-yellow-50  cursor-pointer' onClick={()=>{navigate("/dashboard/my-courses")}}>View All</p>
                         </div>
                         <div className='flex lg:flex-row flex-col gap-4  justify-evenly'>
                            {
                                allCourses.slice(0,3).map((course,index)=>{
                                    return <div className='flex flex-col pb-2 gap-2 lg:border-0 border-b-[2px] border-richblack-700' key={index}>
                                        <img src={course?.thumbnail} alt="courseImage" className='object-cover lg:h-[200px] lg:w-[300px] rounded-md' />
                                        <div className='flex flex-col  gap-2'>
                                            <p>{course?.courseName}</p>
                                            <div className='flex flex-row gap-2 text-richblack-300'>
                                                <p>{course?.studentsEnrolled.length} <span>students</span></p>
                                                <div>|</div>
                                                <p>Rs.{course?.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                         </div>
                            
                           </div>
                        </div>
                         </div>) :  (<div className='flex flex-col gap-2 ml-96 mt-40'>
                           <p className='ml-3'> Courses not found</p>
                             <button onClick={()=>{navigate("/dashboard/create-course")}}
                                                   className="bg-yellow-50 flex items-center justify-center gap-2 w-fit  text-richblue-900 px-6 py-1 rounded-md hover:bg-yellow-100 shadow-[2px_2px_white]"
                                                 >
                                                   <p> Add Course</p>
                                                   <FaPlus />
                                                 </button>
                            </div>)
                } </div>)
           }
        </div>
    </div>
  )
}

export default InstructorDashboard