import React from "react";
import HighlighContent from "../Homepage/HighlighContent";
import aboutUsImage1 from "../../../assets/Images/aboutus1.webp";
import aboutUsImage2 from "../../../assets/Images/aboutus2.webp";
import aboutUsImage3 from "../../../assets/Images/aboutus3.webp";
import foundingStory from "../../../assets/Images/FoundingStory.png";
import UniversalButton from "../../../components/core/Homepage/UniversalButton"
import ContactUsFrom from "../../common/ContactUsFrom";
import Footer from "../../common/Footer";
import RatingAndReviewSlider from "../../common/RatingAndReviewSlider";

const AboutUs = () => {
  return (
    <div className="text-white">
      {/*  Section 1*/}
      <div className="min-h-[500px] bg-richblack-800 flex flex-col items-center gap-6 px-4 pt-16">
        <div className="text-3xl md:text-4xl text-center leading-tight">
          <p>Driving Innovation in Online Education for a</p>
          <HighlighContent text="Brighter Future" />
        </div>
        <p className="text-richblack-300 text-center max-w-2xl">
          Studynotion is at the forefront of driving innovation in online
          education. We're passionate about creating a brighter future by
          offering cutting-edge courses, leveraging emerging technologies, and
          nurturing a vibrant learning community.
        </p>
      </div>

      {/*  Section 2*/}
      <div className="w-11/12 max-w-6xl mx-auto -mt-52 flex flex-col items-center gap-8 px-4">
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:mt-0 mt-40">
          <img
            src={aboutUsImage1}
            alt="aboutUsImage1"
            className="w-full sm:w-1/3 object-cover"
          />
          <img
            src={aboutUsImage2}
            alt="aboutUsImage2"
            className="w-full sm:w-1/3 object-cover "
          />
          <img
            src={aboutUsImage3}
            alt="aboutUsImage3"
            className="w-full sm:w-1/3 object-cover"
          />
        </div>

        {/* Highlight Quote Section */}
        <div className="text-xl sm:text-2xl text-center px-2 mt-10">
          <p className="leading-10">
            <sup className="text-richblack-400 text-2xl">"</sup> We are
            passionate about revolutionizing the way we learn. Our <br />{" "}
            innovative platform{" "}
            <span className="text-blue-200 font-bold">combines technology</span>
            , <span className="text-brown-200 font-semibold">expertise</span>,
            and community to <br /> create an{" "}
            <span className="text-yellow-100 font-semibold">
              unparalleled educational experience
            </span>
            .<sup className="text-richblack-400 text-2xl">"</sup>
          </p>
        </div>
      </div>

      <div className="border-b-[1px] border-richblack-200 mt-16 "></div>

      {/* section 3  */}
      <div className="mt-16 w-11/12 mx-auto flex items-center justify-center flex-col">
        {/* subSection 1  */}
        <div className="flex lg:flex-row gap-28 justify-center items-center flex-col">
          <div className="flex flex-col gap-4 lg:w-[33%]">
            <p className="text-4xl font-semibold text-caribbeangreen-50">
              Our Founding Story{" "}
            </p>
            <p className="text-richblack-300">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p className="text-richblack-300">
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>
          <div>
            <img src={foundingStory} alt="foundingStoryImage" className="lg:w-[472px] lg:h-[279px] w-[100%] "/>
          </div>
        </div>

        {/* subsection 2  */}
        <div className="flex flex-col lg:flex-row gap-28 justify-center items-center mt-32">
          <div className="lg:w-[33%] flex flex-col gap-4">
            <p className="text-4xl font-semibold text-brown-200">Our Vision</p>
            <p className="text-richblack-300">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>
          <div className="lg:w-[33%] flex flex-col gap-4">
            <p className="text-4xl font-semibold text-caribbeangreen-50">
              Our Mission
            </p>
            <p className="text-richblack-300">
              our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another. We believe that
              knowledge thrives in an environment of sharing and dialogue, and
              we foster this spirit of collaboration through forums, live
              sessions, and networking opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* section 4  */}
      <div className=" py-10 bg-richblack-800 flex justify-center items-center mt-20">
        <div className="flex md:flex-row lg:gap-40 gap-20 flex-col">
          <div className="flex flex-col justify-center items-center">
            <p className="font-semibold text-xl">5K</p>
            <p className="text-richblack-300">Active Students</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-semibold text-xl">10+</p>
            <p className="text-richblack-300">Mentors</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-semibold text-xl">200+</p>
            <p className="text-richblack-300">Courses</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-semibold text-xl">50+</p>
            <p className="text-richblack-300">Awards</p>
          </div>
        </div>
      </div>

      {/* section 5  */}
<section className="bg-richblack-900 text-white py-16 px-6 md:px-20">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
    {/* Left Section */}
    <div className="mt-36">
      <h2 className="text-3xl md:text-4xl font-bold leading-snug">
        World-Class Learning for <br />
        <span className="text-blue-400">Anyone, Anywhere</span>
      </h2>
      <p className="text-richblack-300 mt-4 text-sm md:text-base max-w-md">
        Studynotion partners with more than 275+ leading universities and
        companies to bring flexible, affordable, job-relevant online
        learning to individuals and organizations worldwide.
      </p>
      <div className="w-fit mt-4 ">
<UniversalButton active={true} to={"/login"}>Learn More</UniversalButton>
      </div>
      
      
    </div>

    {/* Right Section */}
    <div className="grid grid-cols-2 gap-4 text-richblack-200">
      <div className="bg-richblack-700 p-5 rounded-md h-full">
        <h4 className="font-semibold text-white">Curriculum Based on Industry Needs</h4>
        <p className="text-sm mt-2">
          Save time and money! The Belajar curriculum is made to be easier
          to understand and in line with industry needs.
        </p>
      </div>

      <div className="bg-richblack-700 p-5 rounded-md h-full">
        <h4 className="font-semibold text-white">Our Learning Methods</h4>
        <p className="text-sm mt-2">
          The learning process uses the namely online and offline.
        </p>
      </div>

      <div className="bg-richblack-700 p-5 rounded-md h-full">
        <h4 className="font-semibold text-white">Certification</h4>
        <p className="text-sm mt-2">
          You will get a certificate that can be used as a certification during
          job hunting.
        </p>
      </div>

      <div className="bg-richblack-700 p-5 rounded-md h-full">
        <h4 className="font-semibold text-white">Rating "Auto-grading"</h4>
        <p className="text-sm mt-2">
          You will immediately get feedback during the learning process without
          having to wait for an answer or response from the mentor.
        </p>
      </div>

      <div className="bg-richblack-700 p-5 rounded-md col-span-2 h-full">
        <h4 className="font-semibold text-white">Ready to Work</h4>
        <p className="text-sm mt-2">
          Connected with over 150+ hiring partners, you will have the opportunity
          to find a job after graduating from our program.
        </p>
      </div>
    </div>
  </div>
</section>

{/* section 6  */}
<div className="w-11/12 mx-auto flex justify-center items-center mt-20">
  <ContactUsFrom heading={"Get in Touch"} description={"We’d love to here for you, Please fill out this form."}/>
</div>

{/* section 7 Reviews from other learners */}
<div className="flex justify-center items-center mt-20">
<div className="flex justify-center items-center">
  <p className="text-3xl font-semibold">Reviews from other learners</p>
</div>
</div>
<div className="w-[80%] mx-auto mt-12">
  <RatingAndReviewSlider/>
</div>
{/* footer  */}
<div className="mt-20">
  <Footer/>
</div>

  
    </div>
  );
};

export default AboutUs;
