import React, { useState } from 'react'
import SideNav from '../components/core/Dashboard/SideNav'
import { Outlet } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoClose } from 'react-icons/io5'

const Dashboard = () => {
  const [showSideNav, setShowSideNav] = useState(false)

  return (
    <div className='flex h-[calc(100vh-56px)] relative'>

      {/* SideNav for large screens */}
      <div className='hidden lg:block w-[15%] bg-richblack-800'>
        <SideNav />
      </div>

      {/* SideNav for mobile - slide drawer */}
      <div
        className={`fixed z-50 top-0 left-0 h-full w-[70%] bg-richblack-800 shadow-lg transition-transform duration-300 ${
          showSideNav ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden`}
      >
        <div className='p-4 flex justify-end'>
          <IoClose
            size={24}
            className='text-white cursor-pointer'
            onClick={() => setShowSideNav(false)}
          />
        </div>
        <SideNav />
      </div>

      {/* Main Content */}
      <div className='w-full lg:w-[85%] overflow-y-auto h-full bg-richblack-900 px-4 py-2'>
        {/* Hamburger icon for mobile */}
        <div className='lg:hidden mb-4'>
          <GiHamburgerMenu
            size={24}
            className='text-white cursor-pointer'
            onClick={() => setShowSideNav(true)}
          />
        </div>

        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
