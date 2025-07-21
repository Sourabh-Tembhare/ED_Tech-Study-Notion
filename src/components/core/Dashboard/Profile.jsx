import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

const Profile = () => {
  const userImage = useSelector((state) => state.profile.image);
  const {firstName} = useSelector((state) => state.profile);
  const {lastName} = useSelector((state) => state.profile);
  const {email} = useSelector((state) => state.profile);
  const {additionalDetails} = useSelector((state) => state.profile);

  return (
    <div className="text-richblack-5 lg:ml-52 ml-1">
      {/* part 1  */}
      <div className=" mt-4">
        <p className="text-3xl font-semibold">My Profile</p>
      </div>

      {/* part 2  */}
      <div className="lg:w-[80%] mt-10 flex flex-col gap-4 mr-2 lg:mr-0">

        {/* name part  */}
      <div className="flex gap-4  sm:flex-row flex-col sm:justify-between bg-richblack-800  sm:items-center p-6 rounded-md md:w-full w-full">
        <div className="flex justify-center sm:items-center gap-4 w-fit sm:flex-row flex-col">
          <img
            src={userImage}
            alt="yourprofileImg"
            className="aspect-square md:w-[78px] md:h-[78px] w-[33px] h-[33px] rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-richblack-5">{firstName} {" "} {lastName}</p>
            <p className="text-richblack-300">{email}</p>
          </div>

        </div>
        <Link to={"/dashboard/setting"} className="flex gap-2 bg-yellow-50 rounded-md hover:bg-yellow-100 transition-all duration-300 px-4 py-2 text-richblack-900 justify-center items-center">
        <FiEdit/>
        <p>Edit</p>
        </Link>
      </div>

      {/* personal details  */}
<div className="grid gap-6 bg-richblack-800 p-4 md:p-6 rounded-md">
  {/* Header */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
    <p className="text-xl md:text-2xl font-semibold">Personal Details</p>
    <Link
      to={"/dashboard/setting"}
      className="flex gap-2 bg-yellow-50 rounded-md hover:bg-yellow-100 transition-all duration-300 px-4 py-2 text-richblack-900 items-center"
    >
      <FiEdit />
      <p>Edit</p>
    </Link>
  </div>

  {/* Row 1 - Name */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-20 gap-y-4 w-full">
    <div className="flex flex-col">
      <p className="text-richblack-300">First Name</p>
      <p className="font-semibold">{firstName}</p>
    </div>
    <div className="flex flex-col">
      <p className="text-richblack-300">Last Name</p>
      <p className="font-semibold">{lastName}</p>
    </div>
  </div>

  {/* Row 2 - Email and Phone */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-20 gap-y-4 w-full">
    <div className="flex flex-col">
      <p className="text-richblack-300">Email</p>
      <p className="font-semibold">{email}</p>
    </div>
    <div className="flex flex-col">
      <p className="text-richblack-300">Phone No.</p>
      <p className="font-semibold">
        {additionalDetails?.contactNumber || "Add Number"}
      </p>
    </div>
  </div>

  {/* Row 3 - Gender and DOB */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-20 gap-y-4 w-full">
    <div className="flex flex-col">
      <p className="text-richblack-300">Gender</p>
      <p className="font-semibold">
        {additionalDetails?.gender || "Add Gender"}
      </p>
    </div>
    <div className="flex flex-col">
      <p className="text-richblack-300">Date of Birth</p>
      <p className="font-semibold">
        {additionalDetails?.dateOfBirth || "Add Date of Birth"}
      </p>
    </div>
  </div>

  {/* Row 4 - About */}
  <div className="w-full">
    <div className="flex flex-col gap-2">
      <p className="text-richblack-300">About</p>
      <div className="bg-richblack-700 p-4 rounded-md max-h-48 overflow-y-auto text-richblack-50">
        {additionalDetails?.about || "Add About Info"}
      </div>
    </div>
  </div>
</div>



       </div>
    </div>
  );
};

export default Profile;
