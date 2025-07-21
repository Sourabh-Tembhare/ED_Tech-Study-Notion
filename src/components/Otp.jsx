import React, { useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FiRotateCcw } from 'react-icons/fi'; 
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/slices/authSliice';
import { toast } from 'react-toastify';
import Spinner from './common/Spinner';

const Otp = () => {
  const location = useLocation();
  const data = location.state?.fromData;
  const navigate = useNavigate();
  const {loading} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");

  useEffect(()=>{
    if(!data){
navigate("/signup")
    }
  },[])
  
  async function otpHandler() {
       data.otp = otp;
       try {
        dispatch(setLoading(true));
              const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
        const response = await axios.post(`${BASE_URL}/api/v1/signup`,data);
        toast.success(response.data.message);
        navigate("/login");
        dispatch(setLoading(false));       
       } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
        if(error.response?.data?.message){
          toast.error(error.response.data.message);
        }
        else{
          toast.error("Something Went wrong");
        }      
       }

    
    
  }
  async function resendHandler() {
    const email = {
      email:data.email,
    }
  try {
    dispatch(setLoading(true));
            const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await axios.post(`${BASE_URL}/api/v1/send/otp`,email);
      toast.success(response.data.message);
      dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.log(error);
    if(error.response.data.message){
      toast.error(error.response.data.message);
    }
    else{
      toast.error("Something went wrong");
    }   
  }

    
  }

  return (
  <>
  {
    loading ? <div className='flex items-center justify-center mt-60'><Spinner/></div> :   <div className="flex items-center justify-center mt-44 text-white px-4">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-2 text-center">Verify email</h2>
        <p className="text-center text-richblack-50 mb-6">
          A verification code has been sent to you. Enter the code below
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => (
              <input
                {...props}
                className="w-16 h-12 sm:w-14 sm:h-14 text-2xl text-center text-white bg-richblack-700 border border-richblack-900 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
            )}
          />
        </div>

        {/* Submit Button */}
        <button onClick={otpHandler} className="w-full py-3 rounded-md bg-yellow-200 text-richblack-900 font-medium text-lg hover:bg-yellow-300 transition">
          Verify and Register
        </button>

        {/* Footer Links */}
        <div className="mt-6 flex justify-between text-sm text-gray-400 px-1">
          <Link to="/login" >
          &larr; Back to login
          </Link>
          <button
          onClick={resendHandler}
            className=" text-blue-400 flex items-center gap-1">
 <FiRotateCcw className="text-lg" />
            Resend it
          </button>
        </div>
      </div>
    </div>
  }
  </>
  );
};

export default Otp;
