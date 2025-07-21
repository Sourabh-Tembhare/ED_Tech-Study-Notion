import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourseState, setCourse, setEditCourse, setMyCourseEdit, setStep } from '../../../../redux/slices/courseSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const CoursePublish = () => {
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [loading,setLoading] = useState(false);

  const [formData,setFormData]= useState({isVisible:false});

  const onChangeHandler = (event) =>{
    const {name,value,type,checked}  = event.target;
    setFormData(prev => {
      return {
        ...prev,
        [name]:type==="checkbox" ? checked : value,
      }
    })
  }

  const backHandler = ()=>{
  dispatch(setStep(2));
  }
  const nextHandler = ()=>{
 navigate("/dashboard/my-courses");
 dispatch(resetCourseState());
 
  }

  const submitHandler = async(e)=>{
    e.preventDefault();
    if(formData.isVisible  === false){
      dispatch(setCourse(null));
      dispatch(setEditCourse(false));
      dispatch(setMyCourseEdit(false));
      navigate("/dashboard/my-courses");
      return ;
    }
    const data = {
      courseId:course._id
    }
    try {
      setLoading(true);
      var toastId = toast.loading("Course published...");
         const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await axios.put(`${BASE_URL}/api/v1/published-course`,data,{
        headers:{
          Authorization:'Bearer '+token
        }
      })
      toast.update(toastId,{
        render:response.data.message,
        autoClose:3000,
        type:"success",
        isLoading:false
      })
      setLoading(false);
      dispatch(resetCourseState());  
      navigate("/dashboard/my-courses");
      
    } catch (error) {
    setLoading(false);
      console.log(error);
      toast.update(toastId,{
        render:error.response?.data?.message || "Sometrhing went wrong",
        autoClose:3000,
        isLoading:false,
        type:"error",
      })   
      
    }
    
  }

  return (
    <div className='bg-richblack-800 rounded-md p-4'>
    {
      course?.status === "Draft" ? (<div> 
        <h2 className='text-xl font-semibold'>Publish Settings</h2>
        <form onSubmit={submitHandler}>
          <label className='flex gap-2 items-center mt-4'>
            <input type="checkbox" onChange={onChangeHandler}  checked={formData.isVisible} name='isVisible' />
            <p>Make this course as public</p>
          </label>
            <div className="flex gap-4 justify-end">
                        <button
                        onClick={backHandler}
                        disabled={loading}
                        type="button"
                       
                               className="bg-richblack-500 flex items-center justify-center gap-2 w-fit  text-richblue-900 px-6 py-1 rounded-md  shadow-[2px_2px_white]"
                             >
                               <p className="font-semibold"> Back</p>
                        
                             </button>
                         <button
                          disabled={loading}
                          type='submit'
                               className="bg-yellow-50 flex items-center justify-center gap-2 w-fit  text-richblue-900 px-6 py-1 rounded-md hover:bg-yellow-100 shadow-[2px_2px_white]"
                             >
                               <p  className="font-semibold"> Save Changes</p>
                              
                             </button>
       
                 </div>
        </form>
      </div>) : (<div> 
      <div  className='bg-caribbeangreen-700 rounded-full p-4'>
          <h2 className='text-xl text-center font-semibold text-caribbeangreen-50'>This course has already been published.</h2>
      </div>
        <div>
              <div className="flex gap-4 justify-end mt-6">
                        <button
                        disabled={loading}
                        onClick={backHandler}
                        type="button"
                       
                               className="bg-richblack-500 flex items-center justify-center gap-2 w-fit  text-richblue-900 px-6 py-1 rounded-md  shadow-[2px_2px_white]"
                             >
                               <p className="font-semibold"> Back</p>
                        
                             </button>
                         <button
                          onClick={nextHandler}
                          disabled={loading}
                          type='submit'
                               className="bg-yellow-50 flex items-center justify-center gap-2 w-fit  text-richblue-900 px-6 py-1 rounded-md hover:bg-yellow-100 shadow-[2px_2px_white]"
                             >
                               <p  className="font-semibold">Next</p>
                              
                             </button>
       
                 </div>
        </div>
         </div>)
    }
    </div>
  )
}

export default CoursePublish