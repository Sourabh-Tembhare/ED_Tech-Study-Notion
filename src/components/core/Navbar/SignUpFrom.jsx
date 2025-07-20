import axios from 'axios';
import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../common/Spinner';
import { setLoading } from '../../../redux/slices/authSliice';

const SignUpFrom = () => {
  const [button,setButton] = useState("Student");
  const [openEye1,setOpenEye1] = useState(true);
  const [openEye2,setOpenEye2] = useState(true);
  const [fromData,setFromData]  = useState({
    firstName:"",
    lastName:"",
    password:"",
    confirmpassword:"",
    email:"",
  })
  const {loading} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

function  changeHandler (event){
  const {name,value} = event.target;
  setFromData(prev=>{
    return {
      ...prev,
      [name]:value
    }
  })
}
 async function submitHandler(e){
e.preventDefault();
if(!fromData.password || !fromData.password || !fromData.email || !fromData.firstName || !fromData.lastName){
  return toast.warning("Please fill all the input fields");

}
if(fromData.password !== fromData.confirmpassword){
  return toast.error("Paswword and ConfirmPassword not matched");
}
fromData.accountType = button;
const email = {
  email:fromData.email
}
try {
 dispatch(setLoading(true));
 const response = await axios.post("http://localhost:5000/api/v1/send/otp",email);
 toast.success(response.data.message);
 dispatch(setLoading(false));
 navigate("/otp",{state:{fromData}});

} catch (error) {
  dispatch(setLoading(false));
  console.log(error);
  if(error.response?.data?.message){
    toast.error(error.response.data.message);
  }
  else{
    toast.error("Something went wrong");
  }
  
}
 }

  return (
<div>
 {
  loading ? <div className='flex items-center justify-center mt-36'><Spinner/></div> :   <from>
     <div className='mt-2 flex flex-col gap-4 '>
      <div className='bg-richblack-700 w-fit p-1 flex gap-2 rounded-full'>
        <button onClick={()=>{
          setButton("Student");
        }} 
        className={`${button  === "Student" ? "bg-richblack-900"  : ""} rounded-full px-3 py-1 font-semibold transition-all duration-300`}
        >Student</button>
        <button 
        onClick={()=>{
          setButton("Instructor")
        }}
          className={`${button  === "Instructor" ? "bg-richblack-900"  : ""} rounded-full px-3 py-1 font-semibold transition-all duration-300`}
        >Instructors</button>
      </div>
      <div className='flex lg:flex-row gap-4 flex-col'>
        <div className='flex flex-col relative gap-1 text-richblack-50'>
                <label htmlFor='firstName'> 
                  First Name<sup className=' text-pink-400 '>*</sup>
                 </label>  
                 
                  <input type="text"
                   required
                   id='firstName'
                    placeholder='Enter first name'
                    name='firstName' 
               
                    value={fromData.firstName}
                    onChange={changeHandler}
                     className='bg-richblack-700 py-2 outline-none rounded-md px-2' /> 
                       
        </div>
        <div className='flex flex-col relative gap-1 text-richblack-50'>
                <label htmlFor='lastName'> 
                  Last Name<sup className=' text-pink-400' >*</sup>
                 </label>  
                
                  <input type="text" id='lastName'
                   required
                   placeholder='Enter last name'
                   value={fromData.lastName}
                   name='lastName'
                  
                   onChange={changeHandler}
                    className='bg-richblack-700 py-2 outline-none rounded-md px-2' /> 
                       
        </div>
      </div>

      <div>
           <div className='flex flex-col relative gap-1 text-richblack-50'>
                <label htmlFor='email'> 
                 Enter email address<sup className=' text-pink-400'>*</sup>
                 </label>  
                 
                  <input type="email"
                   id='email'
                    required
                    placeholder='Enter email address'
                    value={fromData.email}
                    name='email'
                  
                    onChange={changeHandler}
                     className='bg-richblack-700 py-2 outline-none rounded-md px-2' /> 
                       
        </div>
      </div>
       <div className='flex lg:flex-row gap-4 flex-col'>
        <div className='flex flex-col relative gap-1 text-richblack-50'>
                <label htmlFor='password'> 
                  Create Password<sup className=' text-pink-400'>*</sup>
                 </label>  
                 
                  <input type={openEye1 ? "text" : "password"}
                   id='password'
                    placeholder='Enter Password' 
                     required
                    value={fromData.password}
                    name='password'
              
                    onChange={changeHandler}
                    className='bg-richblack-700 py-2 outline-none rounded-md px-2' /> 
                 {openEye1 ?  <FaRegEye onClick={()=>setOpenEye1(!openEye1)} size={23} className='absolute lg:top-9 lg:left-44 cursor-pointer right-4 top-9'/> :  <FaRegEyeSlash size={23} onClick={()=>setOpenEye1(!openEye1)} className='absolute top-9 left-44 cursor-pointer'/>}
                       
        </div>
        <div className='flex flex-col relative gap-1 text-richblack-50'>
                <label htmlFor='confirmPassword'> 
                  Confirm Password<sup className=' text-pink-400'>*</sup>
                 </label>  
               
                  <input type={openEye2 ? "text" : "password"} 
                  id='confirmPassword'
                   required 
                  placeholder='Enter Password'
                  value={fromData.confirmpassword}
                  name='confirmpassword'
             
                  onChange={changeHandler}
                   className='bg-richblack-700 py-2 outline-none rounded-md px-2' /> 
                  {openEye2 ?  <FaRegEye onClick={()=>setOpenEye2(!openEye2)} size={23} className='absolute lg:top-9 lg:left-44 right-4 top-9 cursor-pointer'/> :  <FaRegEyeSlash size={23} onClick={()=>setOpenEye2(!openEye2)} className='absolute top-9 left-44 cursor-pointer'/>}
                       
        </div>
      </div>
      <div className='relative'>
        <button onClick={submitHandler} className='text-center font-semibold text-richblack-900 bg-yellow-50 rounded-md hover:bg-yellow-100 w-full py-2 transition-all duration-300'>
          Create Account
        </button>
      </div>
    </div>
 </from>
 }
</div>
  )
}

export default SignUpFrom