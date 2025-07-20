import React from 'react'
import Template from '../components/core/Navbar/Template'
import signUpImg from "../assets/Images/signup.webp";

const SignUp = () => {
  return (
    <div>
      <Template 
      img={signUpImg}
      des1={"Join the millions learning to code with StudyNotion for free"}
      des2={"Build skills for today, tomorrow, and beyond."}
      des3={" Education to future-proof your career."}
      fromType={"signup"}
      />
    </div>
  )
}

export default SignUp