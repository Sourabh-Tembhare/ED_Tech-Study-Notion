import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../../../redux/slices/authSliice';
import { toast } from 'react-toastify';
import ConfirmationModel from "../../common/ConfirmationModel";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { VscDashboard } from "react-icons/vsc";
import { IoIosLogOut } from "react-icons/io";

const ProfileDropDown = () => {
  const [open, setOpen] = useState(false);
  const imgRef = useRef(null);
  const boxRef = useRef(null);
  const naviagte = useNavigate();
  const diapatch = useDispatch();
  const {image} = useSelector((state)=> state.profile);
  const [modalOpen,setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        boxRef.current &&
        !boxRef.current.contains(e.target) &&
        imgRef.current &&
        !imgRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside); 
    };
  }, []);
  function handleConfirm(){
    setOpen(false);
    diapatch(removeToken());
    toast.warn("Logout Successfully");
    naviagte("/login");    
  }
  function dashboardHandler(){
    setOpen(false)
    naviagte("/dashboard/my-profile");
  }

  return (
    <div className='relative cursor-pointer'>
      <div onClick={() => setOpen(!open)} ref={imgRef} className="flex flex-row items-center gap-1">
        <img
          src={image}
          alt="userlogo"
          className='w-[40px] h-[40px] rounded-full'
        />
        <MdOutlineArrowDropDown size={25}/>
      </div>
      {open && (
        <div
          className='bg-richblack-700 absolute z-50 lg:top-14 px-4 py-2 lg:-left-16 flex flex-col gap-2 justify-center items-center rounded-lg'
          ref={boxRef}
        >
          <Link
            className='hover:bg-richblack-900 rounded-full px-4 py-2 flex items-center gap-2'
            onClick={dashboardHandler}
          >
            <VscDashboard/>
           <p> Dashboard</p>
          </Link>
          <button
            className='hover:bg-richblack-900 rounded-full px-4 py-2 flex items-center gap-2'
            onClick={toggleModal}
          >
            <IoIosLogOut/>
            <p>LogOut</p>
          </button>
        </div>
      )}
            {
            modalOpen && (
                <ConfirmationModel 
                isOpen={modalOpen}
                toggle={toggleModal}
                title="Logout Confirmation"
                message="Are you sure want to logout?"
                confirmText="Yes"
                cancelText="Cancel"
                onConfirm={handleConfirm}/>
            )
         }
    </div>
  );
};

export default ProfileDropDown;
