import React from "react";
import { IoMdChatboxes } from "react-icons/io";
import ContactUsFrom from "../../common/ContactUsFrom";
import { BsGlobeAmericas } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import Footer from "../../common/Footer";
import RatingAndReviewSlider from "../../common/RatingAndReviewSlider";

const ContactUs = () => {
  return (
    <div className="text-white mt-10">
      {/* part 1  */}
      <div className="w-11/12 mx-auto flex lg:flex-row flex-col-reverse justify-center lg:items-start items-center gap-14">
        {/* left side  */}
        <div className="flex flex-col gap-8 lg:pr-32 py-4 px-4 bg-richblack-800 h-fit rounded-md lg:justify-start justify-center w-fit">
          <div className="flex flex-col">
            <div className="flex gap-1 text-xl  items-center">
              <IoMdChatboxes />
              <p>Chat on us</p>
            </div>
            <div className="ml-6 text-richblack-300">
              <p>Our friendly team is here to help.</p>
              <p>@mail address</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-1 text-xl items-center">
              <BsGlobeAmericas />
              <p>Visit us</p>
            </div>
            <div className="ml-6 text-richblack-300">
              <p>Come and say hello at our office HQ.</p>
              <p>Here is the location/ address</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-1 text-xl  items-center">
              <IoCall />
              <p>Call us</p>
            </div>
            <div className="ml-6 text-richblack-300">
              <p>Mon - Fri From 8am to 5pm</p>
              <p>+123 456 7890</p>
            </div>
          </div>
        </div>
        {/* right part  */}
        <div className="border-[2px] border-dashed border-richblack-700 p-8 rounded-md">
          <ContactUsFrom      description={
            "Tall us more about yourself and what you’re got in mind."
          }
          heading={"Got a Idea? We’ve got the skills. Let’s team up"}/>
        </div>
      </div>

      {/* reviews slider  */}
      <div className="w-[80%] mx-auto flex flex-col gap-12">
        <div className="flex justify-center gap-14 mt-36">
        <p className="text-3xl font-semibold">Reviews from other learners</p>
        
      </div>
      <RatingAndReviewSlider/>

      </div>
      {/* footer  */}
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default ContactUs;
