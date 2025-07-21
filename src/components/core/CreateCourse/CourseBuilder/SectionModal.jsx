import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import MediaPicker from "../MediaPicker";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../../../redux/slices/courseSlice";


const SectionModal = ({setModal,view,sectionId,viewData,setViewData,setView,edit,setEdit}) => {
    const [file, setFile] = useState(null);
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state)  => state.auth);
    const dispatch = useDispatch();
    const [imageUrl,setImageUrl]  = useState(null);
    const [formData,setFormData] = useState({
      title:"",
      description:""
    })

    const  [loading,setLoading] = useState(false);

    useEffect(()=>{
      if(viewData !== null){
        formData.title = viewData.title;
        formData.description = viewData.description;
        setImageUrl(viewData.videoUrl)     
      }   
    },[viewData]);

    const onChangeHandler = (event)=>{
      const {name,value} = event.target;
      setFormData(prev =>{
        return {
          ...prev,
          [name]:value
        }
      })
    }

    const submitHandler = async(e)=>{
      e.preventDefault();
      const data = new FormData();
      data.append("title",formData.title);
      data.append("description",formData.description);
      data.append("sectionId",sectionId);
      data.append("video",file);
      data.append("courseId",course._id);
    
       try {
        setLoading(true);
        var toastId = toast.loading("Creating lecture...");
            const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
        const response = await  axios.post(`${BASE_URL}/api/v1/create-subsection`,data,
          {
            headers:{
              Authorization:'Bearer '+token
            }
          }
        )
   
        dispatch(setCourse(response.data.updatedCourse));
        
        toast.update(toastId,{
          render:response.data.message,
          autoClose:3000,
          type:"success",
          isLoading:false,
        });
        setLoading(false);
        setModal(false);
         
       } catch (error) {
        setLoading(false);
        console.log(error);
        toast.update(toastId,{
          autoClose:3000,type:"error",
         render: error.response?.data?.message || "Something went wrong",
          isLoading:false,
        })
        
       }

    }

    const crossHandler = ()=>{
 setModal(false)
    setEdit(false);
     if(viewData !== null){
        setViewData(null)    ;
      }

      if(view === false){
        setView(true)
      }

    }

    const editHandler = async(e)=>{  
      e.preventDefault();
      const dataChangeHandler = formData.description === viewData.description && formData.title === viewData.title && !file;
      if(dataChangeHandler){
        window.alert("No Changes detected");
        return ;
      }
      const data = new FormData();
      data.append("title",formData.title);
      data.append("description",formData.description);
      data.append("subSectionId",viewData._id);
      if(file){
        data.append("video",file);
      }
      data.append("courseId",course._id);

      try {
        setLoading(true);
        var tId = toast.loading("Updating Lecture...");
          const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
        const response = await axios.put(`${BASE_URL}/api/v1/update-subsection`,data,{
          headers:{
            Authorization:'Bearer '+token,
          }
        })
        dispatch(setCourse(response.data.updatedCourse));
        toast.update(tId,{
          render:"Lecture updated Successfully",
          autoClose:3000,
          type:"success",
          isLoading:false,
        })
        setEdit(false);
        setLoading(false);
        if(viewData !== null){
        setViewData(null);
        setModal(false);
      }
      } catch (error) {
        console.log(error);       
        setLoading(false);
        toast.update(tId,{
          autoClose:3000,
          type:"error",
          render:error.response?.data?.message || "Something Went Wrong",
        })
        
      }

    }
   
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
       <div className="bg-richblack-900 rounded-md lg:w-[40%] w-[90%] flex flex-col lg:gap-6 border  border-richblack-200">
        <div className="bg-richblack-700 p-4 flex justify-between items-center">
      <p className="text-2xl font-semibold">Adding Lecture</p>
      <RxCross2 size={25} onClick={crossHandler} className="cursor-pointer"/>
        </div>
        <form className="p-6 flex flex-col gap-6" onSubmit={edit ?  editHandler :submitHandler}>
            <MediaPicker
            labelName={"Lecture Video"}
            setFile={setFile}
            imageUrl={imageUrl}
            />
                 <label className="flex flex-col gap-1">
          <p>
            Lecture Title <sup className="text-pink-400">*</sup>
          </p>
          <input
            type="text"
            value={formData.title}
            name="title"
            onChange={onChangeHandler}
            required
            className="bg-richblack-700 rounded-md w-full p-2 border-b-[1px]  outline-none"
            placeholder="Enter Lecture Title"
          />
        </label>
                <label className="flex flex-col gap-1">
          <p>
            Course Short Description <sup className="text-pink-400">*</sup>
          </p>
          <textarea
          value={formData.description}
          name="description"
          onChange={onChangeHandler}
            required
            className="bg-richblack-700 rounded-md w-full p-2 border-b-[1px] h-28 outline-none"
            placeholder="Enter Description"
          ></textarea>
        </label>
 
{
  view && loading ===  false &&  edit=== false && <div className="flex justify-end">
      <button
      type="submit"
      className="bg-yellow-50 w-fit  text-richblue-900 px-6 py-1 rounded-md hover:bg-yellow-100 shadow-[2px_2px_white] transition-all duration-300">
      Save
     </button>
  
 </div>
}

{
  edit  &&  loading ===  false &&  <div className="flex justify-end">
      <button
      type="submit"
      className="bg-yellow-50 w-fit  text-richblue-900 px-6 py-1 rounded-md hover:bg-yellow-100 shadow-[2px_2px_white] transition-all duration-300">
      Save Changes
     </button>
  
 </div>
}
        </form>
       </div>
    </div>
  );
};

export default SectionModal;
