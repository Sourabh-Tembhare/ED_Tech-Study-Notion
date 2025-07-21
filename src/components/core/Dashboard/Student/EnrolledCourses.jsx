import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../../../common/Spinner';
import EnrolledCard from './EnrolledCard';

const EnrolledCourses = () => {
    const [loading,setLoading] = useState(false);
    const [enrolledCourse,setEnrolledCourses] = useState([]);
    const {token} = useSelector((state)  => state.auth);

    const getAllCourse = async()=>{
        try {
            setLoading(true);
                  const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
            const response = await axios.get(`${BASE_URL}/api/v1/studentEnrolledCourses`,{
                headers:{
                    Authorization:"Bearer "+token
                }
            })        

             setLoading(false);
           
            setEnrolledCourses(response.data.getAllEnrolledCourses.courses);
           
            
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.response?.data?.message || "Something went wrong");          
        }
    }

    useEffect(()=>{
        getAllCourse();
    },[]);

    

  return (
    <div className='text-white'>
         <h2 className="text-3xl font-semibold mb-4 mt-4 lg:ml-28 text-richblack-5 lg:w-[82%]">Enrolled Courses</h2>

      <div className="  lg:ml-28 text-richblack-5 lg:w-[82%] flex flex-row justify-between bg-richblack-700 rounded-md px-6 py-4 mt-6 text-sm uppercase tracking-wide">
        <p>Course Name</p>
        <p>Progress</p>
      </div>

        {
            
            loading ? <Spinner/> : (<div>
            
                    {
                        enrolledCourse.length < 1 ?  <div className='mt-60 ml-96 text-richblack-300'>You haven’t enrolled in any courses yet.</div> :
                    
         
                
                    enrolledCourse.map((course) => {
                        return <EnrolledCard key={course._id} course={course} />
                    })
                }
                 </div>)
        }

    </div>
  )
}

export default EnrolledCourses