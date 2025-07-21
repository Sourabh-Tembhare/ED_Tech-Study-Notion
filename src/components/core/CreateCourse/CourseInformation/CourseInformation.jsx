import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { toast } from "react-toastify";
import TagInput from "./TagInput";
import MediaPicker from "../MediaPicker";
import RequirementCollector from "./RequirementCollector";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setStep } from "../../../../redux/slices/courseSlice";
import { MdNavigateNext } from "react-icons/md";

const CourseInformation = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [requirementArray, setRequirementArray] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { editCourse } = useSelector((state) => state.course);
  const { course } = useSelector((state) => state.course);
  const [imageUrl, setImageUrl] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [fromData, setFromData] = useState({
    courseName: "",
    courseDescription: "",
    whatYouWillLearn: "",
    price: "",
    category: "",
  });
  const [file, setFile] = useState(null);

  async function getAllCategories() {
    try {
      const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await axios.get(
        `${BASE_URL}/api/v1/get-all-categories`
      );
      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong when fetching categories"
      );
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (course) {
      setFromData({
        courseName: course.courseName || "",
        courseDescription: course.courseDescription || "",
        whatYouWillLearn: course.whatYouWillLearn || "",
        price: course.price,
        category: course.category,
      });

      setRequirementArray(course.instructions || []);
      setTags(course.tag || []);
      setImageUrl(course.thumbnail || null);
      setCourseId(course._id || null);
    }
  }, [course]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFromData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("courseName", fromData.courseName);
    formData.append("courseDescription", fromData.courseDescription);
    formData.append("whatYouWillLearn", fromData.whatYouWillLearn);
    formData.append("price", fromData.price);
    formData.append("category", fromData.category);
    formData.append("thumbnail", file);
    formData.append("tag", JSON.stringify(tags));
    formData.append("instructions", JSON.stringify(requirementArray));

    try {
      setLoading(true);
      var toastId = toast.loading("Creating course...");
        const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await axios.post(
        `${BASE_URL}/api/v1/create-course`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("Logging Course response ", response.data);
      dispatch(setCourse(response.data.course));
      dispatch(setStep(2));
      toast.update(toastId, {
        render: "Course created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.update(toastId, {
        render: error.response?.data?.message || "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.log(error);
    }
  };

  const courseUpdatehandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("courseName", fromData.courseName);
    formData.append("courseDescription", fromData.courseDescription);
    formData.append("whatYouWillLearn", fromData.whatYouWillLearn);
    formData.append("price", fromData.price);
    formData.append("category", fromData.category);
if(file){
      formData.append("thumbnail", file);
}
    formData.append("tag", JSON.stringify(tags));
    formData.append("instructions", JSON.stringify(requirementArray));
    formData.append("courseId", courseId);


// Compare current form with original course data
const isDataUnchanged =
  fromData.courseName === course.courseName &&
  fromData.courseDescription === course.courseDescription &&
  fromData.whatYouWillLearn === course.whatYouWillLearn &&
  fromData.price === course.price &&
  fromData.category === course.category &&
  JSON.stringify(tags) === JSON.stringify(course.tag) &&
  JSON.stringify(requirementArray) === JSON.stringify(course.instructions) &&
  !file; // thumbnail change 

if (isDataUnchanged) {
  window.alert("No changes detected. Please update some field before saving.");
  return;
}


    try {


      setLoading(true);
      var toasId = toast.loading("Updating course...");
      console.log("Lohhing formdata",formData);
          const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await axios.put(
        `${BASE_URL}/api/v1/update-course`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch(setCourse(response.data.updatedCourse));
      dispatch(setStep(2));
      toast.update(toasId, {
        render: "Course Updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.update(toasId, {
        render: error.response?.data?.message || "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.log(error);
    }
  };

  return (
    <div className="bg-richblack-800 p-4 w-[100%] rounded-md mb-28">
    
      <form className="flex flex-col gap-6 relative" onSubmit={editCourse ? courseUpdatehandler : submitHandler}>
        <label className="flex flex-col gap-1">
          <p>
            Course Title <sup className="text-pink-400">*</sup>
          </p>
          <input
            type="text"
            name="courseName"
            value={fromData.courseName}
            onChange={changeHandler}
            required
            className="bg-richblack-700 rounded-md w-full p-2 border-b-[1px]  outline-none"
            placeholder="Enter Course Title"
          />
        </label>

        <label className="flex flex-col gap-1">
          <p>
            Course Short Description <sup className="text-pink-400">*</sup>
          </p>
          <textarea
            name="courseDescription"
            value={fromData.courseDescription}
            onChange={changeHandler}
            required
            className="bg-richblack-700 rounded-md w-full p-2 border-b-[1px] h-28 outline-none"
            placeholder="Enter Description"
          ></textarea>
        </label>

        <label className="flex flex-col gap-1 relative">
          <p>
            Course Price <sup className="text-pink-400">*</sup>
          </p>
          <input
            value={fromData.price}
            onChange={changeHandler}
            name="price"
            required
            type="number"
            className="bg-richblack-700 rounded-md w-full p-2  pl-10 border-b-[1px]  outline-none"
            placeholder="Enter Course Price"
          />
          <div className="text-richblack-200 border absolute top-9 left-2 border-richblack-200 h-5 w-5 rounded-full flex items-center justify-center">
            <FaRupeeSign size={10} className="text-richblack-200" />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <p>
            Course Category <sup className="text-pink-400">*</sup>
          </p>
          <select
            onChange={changeHandler}
            value={fromData.category}
            name="category"
            className="bg-richblack-700 rounded-md w-full p-2 border-b-[1px]  outline-none"
          >
            <option>Choose a Category</option>
            {category.map((data) => (
              <option value={data._id} key={data._id}>
                {data.name}
              </option>
            ))}
          </select>
        </label>

        <TagInput tags={tags} setTags={setTags} />
        <MediaPicker
          labelName="Course Thumbnail"
          file={file}
          setFile={setFile}
          imageUrl={imageUrl}
        />
        <label className="flex flex-col gap-1">
          <p>
            Benefits of the course <sup className="text-pink-400">*</sup>
          </p>
          <textarea
            onChange={changeHandler}
            value={fromData.whatYouWillLearn}
            name="whatYouWillLearn"
            required
            className="bg-richblack-700 rounded-md w-full p-2 border-b-[1px] h-28 outline-none"
            placeholder="Enter Benefits of the course"
          ></textarea>
        </label>
        <RequirementCollector
          requirementArray={requirementArray}
          setRequirementArray={setRequirementArray}
        />
        {loading === false && editCourse === false && (
          <button
            type="submit"
            className="bg-yellow-50 flex items-center justify-center gap-2 w-fit absolute right-0 -bottom-24 text-richblue-900 px-6 py-1 rounded-md hover:bg-yellow-100 shadow-[2px_2px_white]"
          >
            <p> Next</p>
            <MdNavigateNext />
          </button>
        )}

        { loading === false && editCourse && (
 <div >
           <button
          type="submit"
          
            className="bg-yellow-50 flex items-center justify-center gap-2 w-fit absolute left-0 -bottom-24 text-richblue-900 px-6 py-1 rounded-md hover:bg-yellow-100 shadow-[2px_2px_white]"
          >
            <p> Save Changes</p>
            <MdNavigateNext />
          </button>
             <div
       onClick={()=>{dispatch(setStep(2))}}
            className="bg-yellow-50 cursor-pointer flex items-center justify-center gap-2 w-fit absolute right-0 md:-bottom-24 -bottom-36 text-richblue-900 px-6 py-1 rounded-md hover:bg-yellow-100 shadow-[2px_2px_white]"
          >
            <p> Next Without Changes</p>
            <MdNavigateNext />
          </div>

 </div>
        )}
      </form>
    </div>
  );
};

export default CourseInformation;
