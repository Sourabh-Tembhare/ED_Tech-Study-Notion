import React, { useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/slices/authSliice";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../components/common/Spinner";

const ForgerPasswordForm = () => {
  const params = useParams();
  const token = params.id;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const naviagte = useNavigate();
  const [fromData, setFromData] = useState({
    password: "",
    confirmPassword: "",
  });

  function changeHandler(event) {
    const { name, value } = event.target;
    setFromData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    fromData.token = token;
    try {
      dispatch(setLoading(true));
        const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const respone = await axios.put(
        `${BASE_URL}/api/v1/reset-password`,
        fromData
      );
      toast.success(respone.data.message);
      naviagte("/login");
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      if (error.respone?.data?.message) {
        toast.error(error.respone.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }
  return (
    <>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="text-white flex justify-center items-center p-4">
          <div className="mt-40 flex flex-col gap-2">
            <div className="text-3xl">Choose new password</div>
            <p className="text-richblack-50">
              Almost done. Enter your new password and youre all set.
            </p>
            <form className="flex gap-2 flex-col" onSubmit={submitHandler}>
              <label>
                <p>
                  New password<sup className="text-pink-400">*</sup>
                </p>
                <input
                  type="text"
                  value={fromData.password}
                  name="password"
                  onChange={changeHandler}
                  placeholder="*********"
                  className="bg-richblack-700 p-2 rounded-md md:w-[400px] outline-none w-full"
                />
              </label>
              <label>
                <p>
                  Confirm new password<sup>*</sup>
                </p>
                <input
                  type="text"
                  value={fromData.confirmPassword}
                  name="confirmPassword"
                  onChange={changeHandler}
                  placeholder="*********"
                  className="bg-richblack-700 p-2 rounded-md md:w-[400px] outline-none w-full"
                />
              </label>

              <div className="mt-4 space-y-2 text-sm text-caribbeangreen-400 flex flex-wrap  md:w-[400px]  gap-3 w-full">
                <div className="flex items-center gap-2">
                  <FaCheckCircle />
                  <span>one lowercase character</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle />
                  <span>one special character</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle />
                  <span>one uppercase character</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaCheckCircle />
                  <span>8 character minimum</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle />
                  <span>one number</span>
                </div>
              </div>

              <button
                type="submit"
                className="bg-yellow-100 md:w-[400px] w-full text-center text-black  rounded-md p-2 hover:bg-yellow-200 transition-all duration-300"
              >
                Reset Password
              </button>
            </form>
            <Link to={"/login"} className="flex gap-2  items-center mt-4">
              <div>
                <MdKeyboardBackspace />
              </div>
              <p>Back to login</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgerPasswordForm;
