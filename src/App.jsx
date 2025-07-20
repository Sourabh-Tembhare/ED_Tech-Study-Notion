import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import "./App.css"
import SignUp from './pages/SignUp'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/common/Navbar'
import AboutUs from './components/core/Navbar/AboutUs'
import ContactUs from './components/core/Navbar/ContactUs'
import Login from './pages/Login'
import Otp from './components/Otp'
import ForgetPassword from './pages/ForgetPassword'
import ForgerPasswordForm from './pages/ForgerPasswordForm'
import Dashboard from './pages/Dashboard'
import Profile from './components/core/Dashboard/Profile'
import Error from './pages/Error'
import Setting from './components/core/Dashboard/Setting'
import CreateCourse from "./components/core/CreateCourse/Index";
import MyCourse from './components/core/Dashboard/MyCourse'
import EditCourses from './components/core/MyCourses/EditCourses'
import Catalog from './pages/Catalog'
import CouresDetails from './pages/CouresDetails'
import Cart from './pages/Cart'
import EnrolledCourses from './components/core/Dashboard/Student/EnrolledCourses'
import CourseLectureView from './pages/CourseLectureView'
import InstructorDashboard from './components/core/Dashboard/Instructor/InstructorDashboard'
import { useSelector } from 'react-redux'

const App = () => {
  const accountType = useSelector((state) => state.profile.user); // "Instructor", "Student", "Admin"

  const router = createBrowserRouter([
    { path: "/", element: <><Navbar /><Home /></> },
    { path: "/signup", element: <> <Navbar /><SignUp /></> },
    { path: "/about", element: <> <Navbar /><AboutUs /></> },
    { path: "/contact", element: <> <Navbar /><ContactUs /></> },
    { path: "/login", element: <><Navbar /><Login /></> },
    { path: "/otp", element: <><Navbar /><Otp /></> },
    { path: "/reset-password", element: <><Navbar /><ForgetPassword /></> },
    { path: "/reset-password/:id", element: <><Navbar /><ForgerPasswordForm /></> },
    { path: "*", element: <><Navbar /><Error /></> },

    {
      path: "/dashboard",
      element: <><Navbar /><Dashboard /></>,
      children: [
        { path: "my-profile", element: <Profile /> },
        { path: "setting", element: <Setting /> },

        // Instructor-only routes
        ...(accountType === "Instructor" ? [
          { path: "create-course", element: <CreateCourse /> },
          { path: "my-courses", element: <MyCourse /> },
          { path: "edit-course", element: <EditCourses /> },
          { path: "instructor", element: <InstructorDashboard /> },
        ] : []),

        // Student-only routes
        ...(accountType === "Student" ? [
          { path: "cart", element: <Cart /> },
          { path: "enrolled-courses", element: <EnrolledCourses /> },
        ] : []),
      ]
    },

    { path: "/catalog/:id", element: <><Navbar /><Catalog /></> },
    { path: "/coures-details", element: <><Navbar /><CouresDetails /></> },
    {
      path: "/courseView/course/:courseId/section/:sectionId/subsection/:subSectionId",
      element: <><Navbar /><CourseLectureView /></>
    }
  ]);

  return (
    <div className='bg-richblack-900 min-h-screen w-screen font-inter'>
      <RouterProvider router={router} />
      <ToastContainer position='top-center' />
    </div>
  );
};

export default App;
