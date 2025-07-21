import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import { Link } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { setLoading } from "../redux/slices/authSliice";
import axios from "axios";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [emailSend, setEmailSend] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  async function resetPasswordHandler(e) {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
          const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await axios.post(
        `${BASE_URL}/api/v1/reset-password-link`,
        { email }
      );
      toast.success(response.data.message);
      dispatch(setLoading(false));
      setEmailSend(true);
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }
  async function resetEmailHandler() {
    try {
      dispatch(setLoading(true));
        const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await axios.post(
        `${BASE_URL}/api/v1/reset-password-link`,
        { email }
      );
      toast.success(response.data.message);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center mt-56">
          {" "}
          <Spinner />
        </div>
      ) : (
        <div className="text-white flex flex-col justify-center items-center  mt-40 w-11/12 mx-auto">
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-3xl font-semibold">
                {emailSend ? "Check email" : "Reset your password"}
              </p>
              <p className=" md:w-[400px] text-richblack-25">
                {emailSend
                  ? `We have sent the reset email to ${email}`
                  : "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"}{" "}
              </p>
              <form onSubmit={resetPasswordHandler}>
                {!emailSend && (
                  <label htmlFor="emailaddress">
                    <p>
                      Email Address <sup className="text-pink-400">*</sup>
                    </p>
                    <input
                      type="email"
                      value={email}
                      required
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="myemailaddress@gmail.com"
                      className="bg-richblack-700 p-2 rounded-md md:w-[400px] outline-none w-full"
                    />
                  </label>
                )}
                <div className="mt-4">
                  {emailSend ? (
                    <button
                      onClick={resetEmailHandler}
                      className="bg-yellow-100  text-center text-black  rounded-md p-2 hover:bg-yellow-200 transition-all duration-300 md:w-[400px] w-full"
                    >
                      Resend email
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-yellow-100 md:w-[400px] text-center text-black  rounded-md p-2 hover:bg-yellow-200 transition-all duration-300 w-full"
                    >
                      Reset Password
                    </button>
                  )}
                </div>
              </form>

              <Link to={"/login"} className="flex gap-2  items-center">
                <div>
                  <MdKeyboardBackspace />
                </div>
                <p>Back to login</p>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
