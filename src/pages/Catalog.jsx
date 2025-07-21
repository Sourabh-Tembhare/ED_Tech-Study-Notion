import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import CourseCard from '../components/core/Catalog/CourseCard';
import Spinner from '../components/common/Spinner';
import Footer from '../components/common/Footer';

const Catalog = () => {
    const params = useParams();
    const categoryId = params.id;
    const [Loading,setLoading] = useState(false);
    const [frequentlyBoughtCourses,setFrequentlyBoughtCourses]=useState([]);
    const [newCourses,setNewCourses] = useState([]);
    const [popularCourses,setPopularCourses] = useState([]);
    const [categoryDetails,setCategoryDetails] = useState({});
    const [tab,setTab]  = useState("popular");

    const getCatgoryAllData = async()=>{
        try {
            setLoading(true);
                 const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
            const response = await axios.get(`${BASE_URL}/api/v1/get-category-page-details/` +categoryId); 
            setCategoryDetails(response.data.categoryDetails);
            setFrequentlyBoughtCourses(response.data.frequentlyBoughtCourses);
            setNewCourses(response.data.newCourses);
            setPopularCourses(response.data.popularCourses);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong")      
        }
    }
    
    useEffect(()=>{
      getCatgoryAllData();
    },[categoryId]);
         
    
  return (
<>
{
    Loading ?  <div className='w-full h-[calc(100vh-56px)] flex items-center justify-center'><Spinner/></div> :     <div className='text-richblack-5'>
        <div className='bg-richblack-800 w-[100%] min-h-[244px] flex '>
            <div className='w-11/12 mx-auto flex flex-col gap-4 h-full mt-14'>
                <p className='text-richblack-300 ml-1'>Home / Catalog / <span className='text-yellow-50'>{categoryDetails?.name}</span></p>
                <p className='text-3xl font-semibold'>{categoryDetails?.name}</p>
                <p className='text-richblack-300'>{categoryDetails?.description}</p>
            </div>
        </div>
        <div className='w-11/12 mx-auto mt-10'>

        {/* section 1  */}
        <div className='flex flex-col gap-4 '>
            <h2 className='text-2xl font-semibold'>
                Courses to get you started
            </h2>
            <div className='flex flex-row gap-6  border-b-[2px] border-richblack-800'>

                <p className={`${tab === "popular" ? "border-b-[2px] border-yellow-50 text-richblack-5" : "text-richblack-300"} cursor-pointer transition-all duration-300`}
                onClick={()=>{setTab("popular")}}>Most Popular</p>
                <p   onClick={()=>{setTab("new")}} className={`${tab === "new" ? "border-b-[2px] border-yellow-50 text-richblack-5" : "text-richblack-300"} cursor-pointer transition-all duration-300`}>New</p>
            </div>
            <CourseSlider data={tab === "popular" ? popularCourses : newCourses}/>
        </div>


        {/* section 2  */}
        <div className='flex flex-col gap-2 mt-16 mb-16 '>
            <h2 className='text-2xl font-semibold'>
                Top courses  in <span>{categoryDetails?.name}</span>
            </h2>
            <CourseSlider data={popularCourses}/>
        </div>

        {/* section 3  */}
        <div className='flex flex-col gap-2 '>
           <h2 className='text-2xl font-semibold'>
              Frequently Bought
            </h2>
           {
            frequentlyBoughtCourses.length < 1  ?  (<div className='text-richblack-300'>Corses not found  </div>) : (<div className="flex lg:flex-row flex-col lg:justify-start justify-center lg:items-start items-center gap-4">
  {frequentlyBoughtCourses.map((data, index) => (
    <CourseCard
      key={index}
      data={data}
      height="600px"
      width="lg:calc(50% - 1rem) w-full" // ensures spacing with gap-4
    />
  ))}
</div>)
           }
        </div>

        </div>
        <Footer/>
    </div>
}
</>
  )
}

export default Catalog