import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlighContent from '../components/core/Homepage/HighlighContent';
import UniversalButton from '../components/core/Homepage/UniversalButton';
import video from "../assets/Images/banner.mp4"
import CodeBlock from '../components/core/Homepage/CodeBlock';
import logo1 from "../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../assets/TimeLineLogo/Logo4.svg"
import timelineImg from "../assets/Images/TimelineImage.png"
import known_your_progress from "../assets/Images/Know_your_progress.svg"
import Compare_with_others from "../assets/Images/Compare_with_others.svg"
import Plan_your_lessons from "../assets/Images/Plan_your_lessons.svg"
import instructorImg from "../assets/Images/Instructor.png"
import Footer from '../components/common/Footer';
import { HomePageExplore } from '../data/homepage-explore';
import { IoMdPeople } from "react-icons/io";
import { SlEnergy } from "react-icons/sl";
import RatingAndReviewSlider from '../components/common/RatingAndReviewSlider';


const Home = () => {
    const [selectTag,setSelectTag] = useState("Free");
    const [cardHeighlight,setcardHighilight] = useState("Learn HTML")

    const data = HomePageExplore.filter((dataHai) => dataHai.tag  === selectTag)
    
    return (
        <div>
            {/* section 1 */}
            <div className='lg:w-[80%] w-[100%] mx-auto overflow-hidden '>

                <div className='flex justify-center items-center pt-12 flex-col p-2'>
                    {/* subSection 1 */}
                    <div className='bg-richblack-700 w-fit p-2 rounded-full px-6 transition-all duration-200 hover:bg-richblack-800 transform hover:scale-105 '>
                        <Link to={"/signup"}>
                            <div className='flex flex-row gap-2 items-center text-pure-greys-200'>
                                <p  >
                                    Become an Instructor


                                </p>

                                <FaArrowRight />
                            </div>
                        </Link>
                    </div>
                    {/* subSection 2 */}
                    <div className='mt-6   flex flex-col lg:flex-row gap-2 text-3xl' >
                        <p className='text-white'>
                            Empower Your Future with

                        </p>
<div className='sm:text-center text-start'>
 <HighlighContent  text="Coding Skills" />
</div>
                       
                    </div>
                    {/* subsection 3 */}
                    <div className='mt-6'>
                        <p className='text-pure-greys-200 text-center'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a <br /> wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. </p>
                    </div>
                    {/* subSection 4 */}
                    <div className='flex  flex-row mt-8 gap-6'>
                        <UniversalButton to={"/signup"} active={true}>Learn More</UniversalButton>
                        <UniversalButton to={"/signup"} active={false}>Book a  Demo</UniversalButton>
                    </div>
                    {/* subsection 5 */}
                    <div className='lg:w-[80%] lg:p-0 p-6 w-[100%] mt-14 shadow-[25px_25px_white,0px_-3px_20px_1px_aqua] '>
                        <video
                            muted
                            loop
                            autoPlay


                        > <source src={video} type="video/mp4" />

                        </video>
                    </div>
                    {/* subsection 6 */}
                    <div className='mt-32 p-8'>
                        <CodeBlock
                            heading={
                                {
                                    firstPart: "Unlock your",
                                    highlighttext: "coding potential",
                                    lastPart: "with our online courses."

                                }
                            }

                            subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                            UniversalButton1={
                                {
                                    children: "Try it Yourself",
                                    active: "true",
                                    to: "/signup"

                                }
                            }
                            UniversalButton2={
                                {
                                    children: "Learn More",
                                    active: "false",
                                    to: "/login"

                                }
                            }
                            CodeBlockContent={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<h1>
  Hii Bhai Log 
</h1>
</body>
</html>`}
                            position={"lg:flex-row"}

                        />
                    </div>
                    {/* subsection 7  */}
                    <div className='mt-32'>
                        <CodeBlock
                            heading={
                                {
                                    firstPart: "Start",
                                    highlighttext: "coding ",
                                    lastPart: "in seconds."

                                }
                            }

                            subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                            UniversalButton1={
                                {
                                    children: "Continue Lesson",
                                    active: "true",
                                    to: "/signup"

                                }
                            }
                            UniversalButton2={
                                {
                                    children: "Learn More",
                                    active: "false",
                                    to: "/login"

                                }
                            }
                            CodeBlockContent={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<h1>
  Hii Bhai Log 
</h1>
</body>
</html>`}
                            position={"lg:flex-row-reverse"}

                        />
                    </div>

                    {/* subsection 8 */}
                    <div className='flex flex-col gap-10'>
                        <div className='flex flex-col justify-center'>
                            <p className='flex flex-row mt-44 text-3xl text-white font-semibold gap-2  justify-center'>

                                Unlock the <HighlighContent text='Power of code'></HighlighContent>
                            </p>
                            <p className='text-richblack-300 text-center mt-2'>
                                Learn to Build Anything You Can Imagine
                            </p>
                        </div>
                        {/* fliter  banana hai */}
                        <div className='flex flex-col gap-8 justify-center items-center'>
                             
                             {/* tag  */}
                             <div className='border flex border-richblack-600 rounded-full p-4 lg:block  hidden  gap-8 px-9 w-fit'>
                              {
                                HomePageExplore.map((data,index)=>{
                                    
                                return    <button key={index} className={`text-white ${selectTag === data.tag ? "bg-richblack-800 text-white px-6 py-2 rounded-full" : "text-white "} transition-all duration-300 px-6 py-2 hover:bg-richblack-800 text-white px-6 py-2 rounded-full`} 
                                onClick={()=>{setSelectTag(data.tag)}}>
                                        {data.tag}
                                    </button>
                                })
                              }
                             </div>

                             {/* filter content  */}
                        <div className='lg:flex lg:flex-row flex flex-col gap-6 '>
                            {
                                data[0].courses.map((cardData,index)=>{
                                    return <div key={index} className={`flex flex-col gap-4 bg-richblack-800 p-4 py-8 
                                     ${cardHeighlight === cardData.heading ? "bg-white text-black shadow-[10px_10px_yellow]" : "text-white"} transition-all duration-300`} 
                                     onClick={()=>{setcardHighilight(cardData.heading)}}>
                                       <div className='font-semibold text-2xl'>{cardData.heading}</div>
                                       <div className='mb-16'>{cardData.description}</div>
                                       <div className='border-t border-dashed bg-richblack-500'></div>
                                       <div className='flex justify-between'>
                                        <div className='flex gap-2 items-center'>
                                           <IoMdPeople/>
                                           <div>{cardData.level}</div>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <SlEnergy/>
                                            <div>{cardData.lessionNumber} Lessons</div>
                                        </div>
                                       </div>
                                    </div>
                                })
                            }
                        </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* section 2  */}
            <div className='bg-richblack-5 overflow-hidden lg:-mt-20 -mt-5'>

                {/* subsection 1  */}
                <div className='bg_img flex justify-center items-center gap-4'>

                    <UniversalButton active={true} to={"/signup"}>
                        <div className='flex items-center gap-1'>
                            <p>
                                Explore Full Catalog
                            </p>
                            <FaArrowRight />
                        </div></UniversalButton>



                    <UniversalButton active={false} to={"/login"}>Learn More</UniversalButton>

                </div>

                {/* subsection 2 */}
                <div className='lg:w-[80%] w-[100%] mx-auto mt-24'>
                    {/* minisubsection 1  */}
                    <div className='lg:flex lg:flex-row items-center flex flex-col gap-12  justify-center'>
                        <div className='text-3xl'>
                            <p>
                                Get the skills you need for a
                            </p>
                            <HighlighContent text="job that is in demand."></HighlighContent>
                        </div>
                        <div className='flex flex-col gap-6 '>
                            <p>
                                The modern StudyNotion is the dictates its own terms. Today, to be a <br />competitive specialist requires more than professional skills.
                            </p>
                            <div className='w-fit'>
                                <UniversalButton active={true} to={"/login"}>Learn More</UniversalButton>
                            </div>

                        </div>
                    </div>

                    {/* minisubsection 2  */}
                    <div className='mt-12 flex lg:flex-row flex-col justify-center items-center gap-20 lg:gap-1'>
                        {/* part 1  */}
                        <div className='flex flex-col justify-center gap-2 w-[50%]'>
                            {/* pp1  */}
                            <div className='flex flex-row gap-4'>
                                <div className='bg-white rounded-full h-[66px] w-[66px] flex items-center justify-center'>
                                    <img src={logo1} alt="timelineLogo1" loading='lazy'/>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-semibold'>Leadership</p>
                                    <p>Fully committed to the success company</p>
                                </div>

                            </div>

                            {/* dotted bordrer  */}
                            <div className='border-l-4 border-dotted h-16 border-pure-greys-300 ml-6'></div>
                            <div className='flex flex-row gap-4'>
                                <div className='bg-white rounded-full h-[66px] w-[66px] flex items-center justify-center'>
                                    <img src={logo2} alt="timelineLogo1" />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-semibold'>Responsibility</p>
                                    <p>Students will always be our top priority</p>
                                </div>

                            </div>

                            {/* dotted bordrer  */}
                            <div className='border-l-4 border-dotted h-16 border-pure-greys-300 ml-6'></div>
                            <div className='flex flex-row gap-4 '>
                                <div className='bg-white rounded-full h-[66px] w-[66px] flex items-center justify-center'>
                                    <img src={logo3} alt="timelineLogo1" />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-semibold'>Flexibility</p>
                                    <p>The ability to switch is an important skills</p>
                                </div>

                            </div>

                            {/* dotted bordrer  */}
                            <div className='border-l-4 border-dotted h-16 border-pure-greys-300 ml-6'></div>
                            <div className='flex flex-row gap-4'>
                                <div className='bg-white rounded-full h-[66px] w-[66px] flex items-center justify-center'>
                                    <img src={logo4} alt="timelineLogo1" />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-semibold'>Solve the problem</p>
                                    <p>Code your way to a solution</p>
                                </div>

                            </div>



                        </div>
                        {/* part 2  */}
                        <div className='lg:w-[50%] w-[100%] lg:p-0 px-4 relative flex justify-center items-center '>
                           <div>
                             <img src={timelineImg} alt="timelineImg" className='shadow-[0px_0px_white,0px_-3px_20px_1px_aqua]'  />
                            <div className='bg-caribbeangreen-600 absolute flex flex-row gap-6 p-6 text-white -bottom-10 left-28 homeTask'>
                                <div className='flex flex-row gap-4 justify-center items-center'>
                                    <div className='text-3xl'>
                                        10
                                    </div>
                                    <div>

                                        YEARS <br />
                                        EXPERIENCES
                                    </div>
                                </div>

                                <div className='border-l-2 h-14 border-richblack-400'>

                                </div>
                                <div className='flex flex-row gap-4 justify-center items-center'>
                                    <div className='text-3xl'>
                                        250
                                    </div>
                                    <div>
                                        TYPES OF <br />
                                        COURSES
                                    </div>
                                </div>

                            </div>
                           </div>
                        </div>
                    </div>

                    {/* minisubsection 3  */}
                    <div className='flex justify-center items-center flex-col mt-32'>
                        {/* part 1  */}
                        <div className='flex flex-col gap-3'>
                            <div >
                                <p className='flex lg:flex-row flex-col md:flex-row text-center   gap-2 text-3xl'>
                                    <p className='font-semibold'>Your swiss knife for </p> <HighlighContent text="learning any language"></HighlighContent>
                                </p>
                            </div>
                            <div>
                                <p className='text-center text-[15px]'>
                                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over,<br /> progress tracking, custom schedule and more.
                                </p>
                            </div>
                        </div>
                         {/* part 2  */}
                         <div className='flex lg:flex-row flex-col lg:mt-0 mt-12 justify-center items-center'>
                            <img src={known_your_progress} alt="known_your_progress img" />
                            <img src={Compare_with_others} alt="Compare_with_others img" className='lg:-ml-24 lg:mt-0  -mt-24' />
                            <img src={Plan_your_lessons} alt="Plan_your_lessons img" className='lg:-ml-32 lg:mt-0 -mt-32'/>
                         </div>


                         {/* parrt 3 */}
                         <div className='mt-8 mb-16'>
                            <UniversalButton  active={true} to={"/login"}>Learn More</UniversalButton>
                         </div>

                    </div>
                </div>
            </div>

            {/* section 3  */}
            <div className=' lg:w-[80%] w-[100%] lg:p-0 p-8 mx-auto mt-24 '>

                  {/* subsection 1  */}
                  <div className='flex lg:flex-row flex-col justify-center items-center gap-16 iteam-centre'>

                    {/* part 1  */}
                    <div  className='shadow-[-15px_-15px_white] w-fit'>
                        <img src={instructorImg} alt="instructorImg" />
                    </div>

                    {/* part 2  */}
                    <div className='flex flex-col text-white  justify-center gap-4'>
                        <div className='text-4xl'>
                            <p>Become an</p>
                            <HighlighContent text = "instructor"></HighlighContent>
                        </div>
                        <div className='text-[15px] text-richblack-400'>
                            <p>Instructors from around the world teach millions of students on <br />StudyNotion. We provide the tools and skills to teach what you <br /> love.</p>
                        </div>
                        <div className='w-fit mt-14'>
                            <UniversalButton active={true} to={"/login"}>
                            <div className='flex items-center gap-2'> 
                               <p> Start Teaching Today</p>
                                     <FaArrowRight></FaArrowRight>
                            </div>
                       
                            </UniversalButton>
                        </div>
                    </div>
                  </div>
                  {/* sub section 2  */}
                  <div className='flex flex-col mt-36 text-white gap-12' >
                    {/* part 1  */}
                    <div className='text-center'>
                        <p className='text-4xl font-semibold'>Reviews from other learns</p>
                    </div>

                    {/* reviews slider  */}
                    <div>
                         <RatingAndReviewSlider/>
                    </div>
                  </div>
            </div>

            {/* footer  */}
            <Footer/>


        </div>
    )
}

export default Home