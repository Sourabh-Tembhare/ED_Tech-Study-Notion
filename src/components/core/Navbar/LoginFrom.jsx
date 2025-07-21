import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setToken } from '../../../redux/slices/authSliice';
import { setAdditionalDetails, setEmail, setFirstName, setImageUrl, setLastName, setUser, setUserId } from '../../../redux/slices/profileSlice';
import Spinner from '../../common/Spinner';

const LoginFrom = () => {
  const [fromData, setFromData] = useState({
    email: "",
    password: "",
  })
  const [openEye1, setOpenEye1] = useState(true);
  const {loading} = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function changeHandler(event) {
    const { name, value } = event.target;
    setFromData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
               const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await axios.post(`${BASE_URL}/api/v1/login`, fromData);   
      dispatch(setUser( response.data.user.accountType));
      // localStorage.setItem("accountType", response.data.user.accountType);
      dispatch(setFirstName(response.data.user.firstName))
      // localStorage.setItem("firstName", response.data.user.firstName);
      dispatch(setLastName( response.data.user.lastName))
      // localStorage.setItem("lastName", response.data.user.lastName);
      dispatch(setToken( response.data.user.token));
      // localStorage.setItem("token", response.data.user.token);
      dispatch(setImageUrl(response.data.user.image))
      // localStorage.setItem("image", response.data.user.image);
      dispatch(setUserId(response.data.user._id))
      // localStorage.setItem("_id", response.data.user._id);
      dispatch(setEmail(response.data.user.email))
      dispatch(setAdditionalDetails(response.data.user.additionalDetails));
      // localStorage.setItem("email", response.data.user.email);
      // dispatch(setToken(response.data.user.token))
      toast.success(response.data.message);
      dispatch(setLoading(false));
      navigate("/");

    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      }
      else {
        toast.error("Something went wrong");
      }
    }

  }
  return (
    <div>
     {
      loading ? <div className='flex items-center justify-center mt-36'><Spinner/></div> :  <form className='flex flex-col gap-4' onSubmit={submitHandler}>
        <div className='flex flex-col relative gap-1 text-richblack-50'>
          <label htmlFor='email'>
            Enter email address
          </label>
          <div className='absolute top-0 text-pink-400 font-bold left-36 '>*</div>
          <input type="email"
            id='email'
            required
            placeholder='Enter email address'
            value={fromData.email}
            name='email'

            onChange={changeHandler}
            className='bg-richblack-700 py-2 outline-none rounded-md px-2' />

        </div>
        <div className='flex flex-col relative gap-1 text-richblack-50'>
          <label htmlFor='password'>
            Password
          </label>
          <div className='absolute top-0 text-pink-400 font-bold left-[72px] '>*</div>
          <input type={openEye1 ? "text" : "password"}
            id='password'
            placeholder='Enter Password'
            required
            value={fromData.password}
            name='password'

            onChange={changeHandler}
            className='bg-richblack-700 py-2 outline-none rounded-md px-2' />
          {openEye1 ? <FaRegEye onClick={() => setOpenEye1(!openEye1)} size={23} className='absolute top-9 right-4 cursor-pointer' /> : <FaRegEyeSlash size={23} onClick={() => setOpenEye1(!openEye1)} className='absolute top-9 right-4 cursor-pointer' />}
          <Link to={"/reset-password"} className='text-blue-200 self-end ml-80 text-[12px] italic'> <p>Forgot password</p></Link>
        </div>
        <div className='relative'>
          <button type='submit' className='text-center font-semibold text-richblack-900 bg-yellow-50 rounded-md hover:bg-yellow-100 w-full py-2 transition-all duration-300'>
            Sign in
          </button>
        </div>
      </form>
     }

    </div>
  )
}

export default LoginFrom