import React, { useState } from "react";
import { tel } from "../../data/countrycode";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const ContactUsFrom = ({heading,description}) => {
    const [formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        value:"+91",
        phoneNumber:"",
        textarea:"",
    });

    const {loading} = useSelector((state) => state.auth);

    function changeHandler (event){
        const {name,value} = event.target;
        setFormData(prev =>{
            return {
                ...prev ,
                [name] : value,
            }
        })
    }

    async function submitHandler(e) {
        e.preventDefault();
        try {
     
            console.log("Logging Form Data",formData);
            toast.success("Form Submitted Successfully");
                       
        } catch (error) {
            console.log(error);
            if(error.response?.data?.message){
                toast.error(error.response.data.message);
            }
            else{
                toast.error("Something Went Wrong");
            }
            
            
        }
        
    }
  return (
   <>
   {
    loading ? <Spinner/> :  <div className="text-white flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col justify-center items-center">
        <p className="text-3xl font-semibold w-[70%]">{heading}</p>
        <p className="text-richblack-300 lg:-ml-14">
        {description}
        </p>
      </div>
      <form className="flex flex-col gap-4 " onSubmit={submitHandler}>
        <div className="flex lg:flex-row flex-col gap-4">
          <label className="flex flex-col ">
            <p>First Name</p>
            <input
              type="text"
              onChange={changeHandler}
              value={formData.firstName}
              name="firstName"
              placeholder="Enter first name"
              required
              className="bg-richblack-800 px-2 py-2 rounded-md outline-none"
            />
          </label>
          <label className="flex flex-col ">
            <p>Last Name</p>
            <input
              type="text"
              placeholder="Enter last name"
              onChange={changeHandler}
              value={formData.lastName}
              name="lastName"
              required
              className="bg-richblack-800 px-2 2 py-2 rounded-md outline-none"
            />
          </label>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            onChange={changeHandler}
            value={formData.email}
            name="email"
            required
            placeholder="Enter email address"
            className="bg-richblack-800 px-2 2 py-2 rounded-md w-[100%] outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="num">Phone Number</label>
          <div className="flex gap-4">
            <select name="phoneStart"
            onChange={changeHandler}
            value={formData.value}
             className="bg-richblack-800 w-[15%] px-2 2 py-2 rounded-md">
              {tel.map((data, index) => {
                return (
                  <option key={index} value={data.country}>
                    {data.code}
                  </option>
                );
              })}
            </select>
            <input type="text" onChange={changeHandler} value={formData.phoneNumber} name="phoneNumber" required id="num" placeholder="1234567890" className="bg-richblack-800 w-[85%] px-2 2 py-2 rounded-md outline-none" />
          </div>
        </div>
        <label className="flex flex-col"
        >
            <p>Message</p>
              <textarea placeholder="Write a short bio..." required onChange={changeHandler} value={formData.textarea} name="textarea"  className="bg-richblack-800 px-2 py-2 rounded-md w-[100%] h-24 outline-none"></textarea>
        </label>
      
        <button type="submit" className="bg-yellow-200 rounded-md py-2 text-richblack-900 hover:bg-yellow-300 transition-all duration-300 text-center">Send Message</button>
      </form>
    </div>
   }
   </>
  );
};

export default ContactUsFrom;
