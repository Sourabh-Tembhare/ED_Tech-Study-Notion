import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuUpload } from "react-icons/lu";
import axios from "axios";
import {
  setAdditionalDetails,
  setImageUrl,
  setLoading,
} from "../../../redux/slices/profileSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { removeToken } from "../../../redux/slices/authSliice";
import Spinner from "../../common/Spinner";

const Setting = () => {
  const profile = useSelector((state) => state.profile.image);
  const [image, setImage] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile);
  const [profileLoading, setProfileLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);
  const { firstName } = useSelector((state) => state.profile);
  const { lastName } = useSelector((state) => state.profile);
  const [passwordChange, setPasswordChange] = useState({
    oldPassword: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    about: "",
    contactNumber: "",
    gender: "",
  });
  const [ImageUrlprofilePicture,setImageUrlprofilePicture] = useState("");
  function fileHandler(e) {
    setImage(e.target.files[0]);
    setImageUrlprofilePicture(URL.createObjectURL(e.target.files[0]));
  }
  async function imgaeUploadHandler() {
    if (!image) {
      return toast.error("Please select image");
    }
    const formData = new FormData();
    formData.append("image", image);
    try {
      dispatch(setLoading(true));
          const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await axios.put(
        `${BASE_URL}/api/v1/updateProfilePicture`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch(setImageUrl(response.data.imageUrl));
      toast.success(response.data.message);
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }
  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  async function submitHandler(e) {
    e.preventDefault();
    try {
      setProfileLoading(true);
          const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await axios.put(
        `${BASE_URL}/api/v1/update-profile`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch(setAdditionalDetails(response.data.updatedProfile));
      toast.success(response.data.message);
      setProfileLoading(false);
      navigate("/dashboard/my-profile");
    } catch (error) {
      setProfileLoading(false);
      console.log(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }
  const [passwordLoading, setPasswordLoading] = useState(false);
  const passwordChangeHandler = (event) => {
    const { name, value } = event.target;
    setPasswordChange((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  async function passwordSumbmitHandler(e) {
    e.preventDefault();
    console.log("Logging Data", passwordChange);

    try {
      setPasswordLoading(true);
          const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await axios.put(
        `${BASE_URL}/api/v1/change-password`,
        passwordChange,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success(response.data.message);
      setPasswordLoading(false);
    } catch (error) {
      setPasswordLoading(false);
      console.log(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  async function deleteHandler() {
    const confirmUser = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmUser) {
      return;
    }
    try {
      setDeleteLoading(true);
             const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await axios.delete(
        `${BASE_URL}/api/v1/delete-account`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch(removeToken());
      toast.success(response.data.message);
      navigate("/signup");
      setDeleteLoading(false);
    } catch (error) {
      setDeleteLoading(false);
      console.log(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }
  return (
    <>
      {deleteLoading ? (
        <div className="flex items-center justify-center mt-60">
          <Spinner />
        </div>
      ) : (
        <div className="text-richblack-5  lg:ml-40">
          {/* part 1  */}
          <div className=" mt-4">
            <p className="text-3xl font-semibold">Edit Profile</p>
          </div>

          {/* part 2  */}
          <div className="lg:w-[70%] mt-10 flex flex-col gap-4">
            {/* profile update section  */}
            <div className="flex  bg-richblack-800 gap-4  items-center p-6 rounded-md">
             <div className="relative">
               <img
                src={profile}
                alt="userProfileImage"
                className="aspect-square h-[78px] w-[78px] object-cover rounded-full"
              />
              {
                ImageUrlprofilePicture && <img src={ImageUrlprofilePicture} alt="selectedImage" 
                  className="aspect-square h-[78px] w-[78px] object-cover rounded-full absolute top-0" />
              }
             </div>
              <div className="flex flex-col gap-2">
                <p className="text-richblack-25">Change Profile Picture</p>
                <div className="flex gap-2">
                  <label
                    className="  bg-richblack-700  px-4 py-1
                rounded-md cursor-pointer"
                  >
                    <p>Select</p>
                    <input
                      type="file"
                      className="hidden"
                      onChange={fileHandler}
                    />
                  </label>

                  <div
                    className="flex gap-2 cursor-pointer items-center bg-yellow-50 text-richblack-900 px-4 py-1 hover:bg-yellow-100
                transition-all duration-300 rounded-md"
                    onClick={imgaeUploadHandler}
                  >
                    <p>Upload</p>
                    <LuUpload />
                    {loading && (
                      <div className="w-4 h-4 ml-2 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* personal information section  */}
            <div className="p-6 bg-richblack-800 flex flex-col rounded-md gap-6">
              <p className="text-2xl font-semibold">Profile Information</p>
              <form
                className="flex flex-col gap-4 relative "
                onSubmit={submitHandler}
              >
                <div className="flex md:flex-row gap-4 flex-col">
                  <label className="flex flex-col lg:w-[50%] ">
                    <p>First Name</p>
                    <input
                      type="text"
                      disabled
                      value={firstName}
                      className="bg-richblack-700 outline-none border-b-[1px] border-richblack-5 p-2 rounded-md "
                    />
                  </label>
                  <label className="flex flex-col lg:w-[50%]">
                    <p>Last Name</p>
                    <input
                      type="text"
                      disabled
                      value={lastName}
                      className="bg-richblack-700 outline-none border-b-[1px] border-richblack-5 p-2 rounded-md "
                    />
                  </label>
                </div>
                <div className="flex md:flex-row gap-4 flex-col ">
                  <label className="flex flex-col gap-2 lg:w-[50%]">
                    <p>Date of Birth</p>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      name="dateOfBirth"
                      onChange={changeHandler}
                      className="bg-richblack-700 outline-none border-b-[1px] border-richblack-5 p-2 rounded-md "
                    />
                  </label>
                  <label className="flex flex-col gap-2 lg:w-[50%]">
                    <p>Gender</p>
                    <select
                      onChange={changeHandler}
                      value={formData.gender}
                      name="gender"
                      className="bg-richblack-700 outline-none border-b-[1px] border-richblack-5 p-3 rounded-md "
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                </div>
                <div className="flex md:flex-row gap-4 flex-col">
                  <label className="flex flex-col gap-2 lg:w-[50%]">
                    <p>Contact Number</p>
                    <input
                      type="text"
                      onChange={changeHandler}
                      value={formData.contactNumber}
                      name="contactNumber"
                      placeholder="Enter Contact Number"
                      className="bg-richblack-700 outline-none border-b-[1px] border-richblack-5 p-2 rounded-md "
                    />
                  </label>
                  <label className="flex flex-col gap-2 lg:w-[50%]">
                    <p>About</p>
                    <input
                      type="text"
                      onChange={changeHandler}
                      value={formData.about}
                      name="about"
                      placeholder="Enter Bio Details"
                      className="bg-richblack-700 outline-none border-b-[1px] border-richblack-5 p-2 rounded-md "
                    />
                  </label>
                </div>
                <div className="flex gap-4 absolute -bottom-20 right-0">
                  <Link
                    to={"/dashboard/my-profile"}
                    className="  bg-richblack-700  px-4 py-1
                rounded-md cursor-pointer hover:bg-richblack-800 transition-all duration-300"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className=" flex gap-1 items-center  bg-yellow-50 text-richblack-900 px-4 py-1 hover:bg-yellow-100
                transition-all duration-300 rounded-md"
                  >
                    Save
                    {profileLoading && (
                      <div className="w-4 h-4 ml-2 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* password change section  */}
            <div className="p-6 bg-richblack-800 flex flex-col rounded-md gap-6 mt-16">
              <p className="text-2xl font-semibold">Password</p>
              <form
                className="flex gap-4 relative lg:flex-row flex-col"
                onSubmit={passwordSumbmitHandler}
              >
                <label className="flex flex-col gap-2 lg:w-[50%] relative">
                  <p>Current Password</p>
                  <input
                    type={`${open1 ? "text" : "password"}`}
                    value={passwordChange.oldPassword}
                    name="oldPassword"
                    onChange={passwordChangeHandler}
                    className="bg-richblack-700 outline-none border-b-[1px] border-richblack-5 p-2 rounded-md "
                  />
                  <div
                    onClick={() => {
                      setOpen1((prev) => !prev);
                    }}
                    className="absolute top-10 right-4"
                  >
                    {open1 ? (
                      <FaRegEye size={23} />
                    ) : (
                      <FaRegEyeSlash size={23} />
                    )}
                  </div>
                </label>
                <label className="flex flex-col gap-2 lg:w-[50%] relative">
                  <p>New Password</p>
                  <input
                    type={`${open2 ? "text" : "password"}`}
                    value={passwordChange.password}
                    name="password"
                    onChange={passwordChangeHandler}
                    className="bg-richblack-700 outline-none border-b-[1px] border-richblack-5 p-2 rounded-md "
                  />
                  <div
                    onClick={() => {
                      setOpen2((prev) => !prev);
                    }}
                    className="absolute top-10 right-4"
                  >
                    {open2 ? (
                      <FaRegEye size={23} />
                    ) : (
                      <FaRegEyeSlash size={23} />
                    )}
                  </div>
                </label>
                <div className="flex gap-4 absolute -bottom-20 right-0">
                  <Link
                    to={"/dashboard/my-profile"}
                    className="  bg-richblack-700  px-4 py-1
                rounded-md cursor-pointer hover:bg-richblack-800 transition-all duration-300"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className=" flex gap-1 items-center  bg-yellow-50 text-richblack-900 px-4 py-1 hover:bg-yellow-100
                transition-all duration-300 rounded-md"
                  >
                    Save
                    {passwordLoading && (
                      <div className="w-4 h-4 ml-2 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* delete account section  */}
            <div className="flex gap-4 bg-pink-700 relative mt-16 rounded-md p-6 mb-14">
              <div className="bg-pink-800 rounded-full h-[40px] w-[40px] p-2">
                <RiDeleteBinLine size={25} className="text-pink-200" />
              </div>
              <div className="flex flex-col gap-4 ">
                <p className="font-semibold text-xl">Delete Account</p>
                <div>
                  <p className="text-richblack-100">
                    Would you like to delete account?
                  </p>
                  <p className=" text-richblack-100 w-[80%]">
                    This account contains Paid Courses. Deleting your account is
                    permanent and will remove all the contain associated with
                    it.
                  </p>
                </div>
                <div
                  onClick={deleteHandler}
                  className="italic cursor-pointer text-pink-300 "
                >
                  I want to delete my account
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Setting;
