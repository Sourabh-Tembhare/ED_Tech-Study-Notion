import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCaretDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { setCourse, setEditCourse, setStep } from "../../../../redux/slices/courseSlice";
import SectionModal from "./SectionModal";
import { MdNavigateNext } from "react-icons/md";
import { se } from "date-fns/locale";


const CourseBuilder = () => {
  const { course } = useSelector((state) => state.course);
  const [sectionName, setSectionName] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [sectionUpdate, setSectionUpdate] = useState(null);
  const [modal,setModal] = useState(false);
  const [view,setView] = useState(true);
  const [sectionId,setSectionId] = useState(null);
  const [viewData,setViewData] = useState(null);
  const [edit,setEdit] = useState(false);
  const toggle = (id)=>{
    setModal(true);
    setSectionId(id)

  }


  // create section
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      sectionName: sectionName,
      courseId: course._id,
    };

    try {
      setLoading(true);
      var toastId = toast.loading("Creating Section...");
      const response = await axios.post(
        "http://localhost:5000/api/v1/create-section",
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch(setCourse(response.data.courseDetails));
      toast.update(toastId, {
        isLoading: false,
        render: response.data.message,
        type: "success",
        autoClose: 3000,
      });
      setLoading(false);
      setSectionName("");
    } catch (error) {
      setLoading(false);
      toast.update(toastId, {
        render: error.response?.data?.message || "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  // edit Section
  const editSectionHandler = (sectionName, sectionId) => {
    setSectionName(sectionName);
    setSectionUpdate(sectionId);
  };

  const cancelEditSectionHandler = () => {
    setSectionName("");
    setSectionUpdate(null);
  };

  const editHandler = async (e) => {
    e.preventDefault();

    const data = {
      sectionName: sectionName,
      sectionId: sectionUpdate,
      courseId: course._id,
    };

    try {
      setLoading(true);
      var toasId = toast.loading("Updating SectonName...");
      const response = await axios.put(
        "http://localhost:5000/api/v1/update-section",
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.update(toasId, {
        render: response.data.message,
        isLoading: false,
        type: "success",
        autoClose: 3000,
      });
      dispatch(setCourse(response.data.updatedCourse));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.update(toasId, {
        render: error.response?.data?.message || "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  // delete Section
  const deleteHandler = async (sectionId) => {
  const isConfirmed = window.confirm("Are you sure you want to delete this section?");
  if(!isConfirmed){
    return;
  }
    const data = {
      courseId: course._id,
    };
    try {
      var toasId = toast.loading("Deleting Section...");
      const response = await axios.delete(
        "http://localhost:5000/api/v1/delete-section/" + sectionId,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          data: data,
        }
      );
      dispatch(setCourse(response.data.updatedCourse));
      toast.update(toasId, {
        render: response.data.message,
        autoClose: 3000,
        isLoading: false,
        type: "success",
      });
    } catch (error) {
      console.log(error);
      toast.update(toasId, {
        render: error.response?.data?.message || "Something went wrong",
        autoClose: 3000,
        isLoading: false,
        type: "error",
      });
    }
  };

  // view Section Handler 
  const viewHandler = (viewData)=>{
setViewData(viewData)
setView(false);
setModal(true);
  }

  // Subsection edit Handler
  const subSectionEditHandler = (subSecton)=>{
    setViewData(subSecton);
    setModal(true);
    setEdit(true) ;
  }

  // subSectionDeleteHandler 
  const subSectionDeleteHandler = async(secId,subSecId) => {
    const confirm = window.confirm("Are you sure you want to delete this lecture? This action cannot be undone.");
    if(!confirm){
      return ;
    }
    const data = {
      courseId:course._id,
      sectionId:secId
    }
    try {
      var subId =  toast.loading("deleting lecture...");
      const response = await axios.delete("http://localhost:5000/api/v1/delete-subsection/"+subSecId,{
        headers:{
          Authorization:'Bearer '+token,
          
        },
        data:data,
      })
      dispatch(setCourse(response.data.updatedCourse));
      toast.update(subId,{
        render:"Lecture Deleted Successfully",
        autoClose:3000,
        isLoading:false,
        type:"success"
      })
      
    } catch (error) {
      console.log(error);
      toast.update(subId,{
        autoClose:3000,
        isLoading:false,
        render:error.response?.data?.message || "Something Went Wrong",
      })    
    }
  }

  // back button handler
  const backHandler = ()=>{
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  // next button handler
  const nextButtonHandler = ()=>{
        if(course.courseContent.length <  1){
    window.alert("Please add at least one section before proceeding.");
    return ;
    }
    if(course.courseContent.some((secdt) => secdt.subSection.length  < 1)){
    window.alert("Please add at least one subsection for each section before proceeding.");
    return ;
    }
    

     dispatch(setStep(3));
  }
  return (
    <div>
      <div className="bg-richblack-800 p-4 w-[100%] rounded-md mb-28 flex flex-col gap-8">
        <p className="text-xl font-semibold">Course Builder</p>
        <form
          className="flex flex-col gap-3"
          onSubmit={sectionUpdate ? editHandler : submitHandler}
        >
          <label className="flex flex-col gap-1">
            <p>
              Section Name <sup className="text-pink-400">*</sup>
            </p>
            <input
              type="text"
              name="sectionName"
              onChange={(e) => {
                setSectionName(e.target.value);
              }}
              value={sectionName}
              required
              className="bg-richblack-700 rounded-md w-full p-2 border-b-[1px]  outline-none"
              placeholder="Add a section to build your course"
            />
          </label>

          {loading === false &&
            (sectionUpdate !== null ? (
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex gap-2 w-fit items-center justify-center bg-richblack-900 border border-yellow-50 px-3 py-1 rounded-md shadow-[1px_1px_white]"
                >
                  <p className="text-yellow-50">Edit Section Name</p>
                  <MdAddCircleOutline className="text-yellow-50" />
                </button>
                <div
                  className="text-richblack-400 underline  text-xs mt-4 cursor-pointer"
                  onClick={cancelEditSectionHandler}
                >
                  Cancel Edit
                </div>
              </div>
            ) : (
              <button
                type="submit"
                className="flex gap-2 w-fit items-center justify-center bg-richblack-900 border border-yellow-50 px-3 py-1 rounded-md shadow-[1px_1px_white]"
              >
                <p className="text-yellow-50">Create Section </p>
                <MdAddCircleOutline className="text-yellow-50" />
              </button>
            ))}
        </form>

        {course.courseContent.length > 0 &&
          course.courseContent.map((section,index) => (
            <details className="bg-richblack-700 rounded-md p-4" key={index}>
              <summary className="flex justify-between items-center border-b-2 border-richblack-400">
                <div className="flex items-center justify-center gap-2 ">
                  <RxDropdownMenu className="cursor-pointer" />
                  <p className="cursor-pointer">{section.sectionName}</p>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <MdEdit
                    className="cursor-pointer"
                    onClick={() => {
                      editSectionHandler(section.sectionName, section._id);
                    }}
                  />
                  <RiDeleteBin6Line className="cursor-pointer" onClick={()=>{deleteHandler(section._id)}}/>
                  <div className="bg-richblack-400 h-4 w-[1px]"></div>
                  <FaCaretDown className="cursor-pointer" />
                </div>
              </summary>
              <div>
                {section.subSection.length > 0 &&
                  section.subSection.map((subSecton,index) => {
                    return (
                      <div className="flex justify-between border-b-2 border-richblack-400 items-center ml-6 mt-4 mb-4" key={index}>
                        <div className="flex flex-row gap-2 items-center">
                          <RxDropdownMenu className="cursor-pointer" />
                          <p onClick={()=>{viewHandler(subSecton)}} className="cursor-pointer">{subSecton.title}</p>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                          <MdEdit className="cursor-pointer" onClick={()=>{subSectionEditHandler(subSecton)}} />
                          <RiDeleteBin6Line className="cursor-pointer" onClick={()=>{subSectionDeleteHandler(section._id,subSecton._id)}} />
                        </div>
                      </div>
                    );
                                     
             
        
                  })
               
                  }
                <div className="flex items-center mt-2 ml-6 gap-1 cursor-pointer text-[14px]" 
                    onClick={()=>{toggle(section._id)}}  >
                  <FaPlus
                    className="
               text-yellow-50"
                  />
                  <p className="text-yellow-50">Add Lecture</p>
                </div>
              </div>

            </details>
          
          ))}

          <div className="flex gap-4 justify-end">
                 <button
                 onClick={backHandler}
                
                        className="bg-richblack-500 flex items-center justify-center gap-2 w-fit  text-richblue-900 px-6 py-1 rounded-md  shadow-[2px_2px_white]"
                      >
                        <p className="font-semibold"> Back</p>
                 
                      </button>
                  <button
                   onClick={nextButtonHandler}
                        className="bg-yellow-50 flex items-center justify-center gap-2 w-fit  text-richblue-900 px-6 py-1 rounded-md hover:bg-yellow-100 shadow-[2px_2px_white]"
                      >
                        <p  className="font-semibold"> Next</p>
                        <MdNavigateNext />
                      </button>

          </div>
            
      </div>
         {
                 modal && <SectionModal
              setModal={setModal}
              view={view}
              sectionId={sectionId}
              viewData={viewData}
              setViewData={setViewData}
              setView = {setView}
              edit={edit}
              setEdit={setEdit}
              />
   }
    </div>
  );
};

export default CourseBuilder;
