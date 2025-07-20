import React from 'react'
import { Link } from 'react-router-dom'

const UniversalButton = ({ children, active, to }) => {
    return (
        <div>
            <Link to={to}>
                <div className={`${active ? "bg-yellow-50 text-black hover:bg-yellow-100" : "bg-richblack-700 text-white hover:bg-richblack-800"} py-2 px-4  rounded-md transition-all duration-200 transform hover:scale-105`}>
                    {children}
                </div>
            </Link>
        </div>
    )
}

export default UniversalButton