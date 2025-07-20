import React from 'react'
import SignUpFrom from './SignUpFrom'
import LoginFrom from './LoginFrom'
import  frame from  "../../../assets/Images/frame.png";

const Template = ({img,des1,des2,des3,fromType}) => {
  return (
    <div className='flex lg:mt-20 mt-10 text-richblack-5 lg:flex-row lg:gap-28 w-11/12 mx-auto justify-center flex-col gap-10 '>
      
      {/* section 1  */}
      <div className='lg:w-[30%] flex flex-col  gap-4'>
        <p className='text-3xl font-semibold'>{des1}</p>
        <div>
            <p className='text-richblack-100'>{des2}</p>
            <p className='text-blue-200 italic'>{des3}</p>
        </div>
        <div>
            {
                fromType === "signup" ? <SignUpFrom/> : <LoginFrom/>
            }
        </div>
      </div>

      {/* section 2  */}
      <div className="relative flex justify-center " >
        <img src={img} alt="formImg" className='w-[500px] h-[470px] z-40 relative rounded-sm lg:shadow-none shadow-[15px_15px_15px_aqua] mb-7' />
        <img src={frame} alt="frameImg"  className='w-[500px] h-[470px] lg:absolute  z-10 lg:left-5 lg:top-5 hidden lg:block ' />
      </div>

    </div>
  )
}

export default Template