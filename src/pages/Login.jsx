import React from 'react'
import Template from '../components/core/Navbar/Template';
import  loginImg from "../assets/Images/login.webp"

const Login = () => {
  return (
    <div>
        <Template 
      img={loginImg}
      des1={"Welcome Back"}
      des2={"Build skills for today, tomorrow, and beyond."}
      des3={" Education to future-proof your career."}
      fromType={"login"}
      />
    </div>
  )
}

export default Login