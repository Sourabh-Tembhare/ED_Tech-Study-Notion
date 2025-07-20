import React, { useEffect, useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as VscIcons from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import ConfirmationModel from '../../common/ConfirmationModel';
import { removeToken } from '../../../redux/slices/authSliice';
import { toast } from 'react-toastify';
import { resetCourseState, setCourse, setEditCourse, setMyCourseEdit } from '../../../redux/slices/courseSlice';

const SideNav = () => {

    const [navLinks,setNavLinks] = useState([]);
    const acountType = useSelector((state) => state.profile.user);
    const location = useLocation();
    const [modalOpen,setModalOpen] = useState(false);
    const toggleModal = () => setModalOpen((prev) => !prev);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {course} = useSelector((state) => state.course);

    function setNavLinksHandler (){
        const dashboardLinks = sidebarLinks.filter((data)=> !data.type || data.type === acountType);
        setNavLinks(dashboardLinks);
    }
    useEffect(()=>{
        if(!acountType){
            return alert("Something went wrong");
        }
        setNavLinksHandler();
    },[])

    function handleConfirm (){  
            dispatch(removeToken());
            toast.warn("Logout Successfully");
            navigate("/login");  
    }

    const addCouresHandler = ()=>{
      if(course?.myCourseEdit ===  true || course?.editCourse === true || course !== null ){
      dispatch(resetCourseState());
       dispatch(setMyCourseEdit(false));
      
      }
    }
  return (
  <>
    <div className='bg-richblack-800 h-[100%]'>
     <div className='flex flex-col gap-4'>
            {
            navLinks.map((data,index)=>{
                  const Icon = VscIcons[data.icon];
                return <div key={index} onClick={() => {
  if (data.path === "/dashboard/create-course") {
    addCouresHandler();
  }
}}> 
                  <Link to={data.path} key={data.id} className={`text-richblack-300 flex gap-4  items-center px-4 py-2 ${data.path === location.pathname && "text-yellow-50 bg-yellow-800 border-l-2 border-yellow-50"}`}>
                  <div>
                    {Icon && <Icon />}

                  </div>
                  <p>
                    {
                        data.name
                    }
                  </p>
                </Link>
                </div>
            })
         }
     </div>
     <div className='border-b-[1px] border-richblack-300 w-[90%] mx-auto mt-6 mb-6'></div>
     <Link to={"/dashboard/setting"}  className={`text-richblack-300 flex gap-4  items-center px-4 py-2 ${"/dashboard/setting" === location.pathname && "text-yellow-50 bg-yellow-800 border-l-2 border-yellow-50"}`}>
     <div><IoSettingsOutline/></div>
     <p>Settings</p>
     </Link>

        <div onClick={toggleModal} className={`text-richblack-300 flex gap-4  items-center px-4 py-2  hover:text-yellow-50 hover:bg-yellow-800 hover:border-l-2 hover:border-yellow-50 transition-all duration-300"}`}>
     <div><MdLogout/></div>
     <p>Log Out</p>
     </div>
    </div>
         {
            modalOpen && (
                <ConfirmationModel 
                isOpen={modalOpen}
                toggle={toggleModal}
                title="Logout Confirmation"
                message="Are ypu sure want to logout?"
                confirmText="Yes"
                cancelText="Cancel"
                onConfirm={handleConfirm}/>
            )
         }
  </>
  )
}

export default SideNav