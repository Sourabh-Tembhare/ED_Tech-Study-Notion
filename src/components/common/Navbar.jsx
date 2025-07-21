import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CiSearch } from 'react-icons/ci';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'react-toastify';

import studayNotationLogo from '../../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../../data/navbar-links';
import ProfileDropDown from '../core/Navbar/ProfileDropDown';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const accountType = useSelector((state) => state.profile.user);
  const { totalItems } = useSelector((state) => state.cart);

  const [category, setCategory] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    (async () => {
      try {
        const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
        const res = await axios.get(`${BASE_URL}/api/v1/get-all-categories`);
        setCategory(res.data.data);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load categories');
      }
    })();
  }, []);

  const renderLinks = () => (
    <>
      {NavbarLinks.map((data, index) =>
        data.title === 'Catalog' ? (
          <div className="relative group" key={index}>
            <div className="flex items-center gap-1 font-semibold cursor-pointer">
              <span>{data.title}</span>
              <RiArrowDropDownLine size={22} />
            </div>
            <div className="absolute top-8 left-0 w-56 bg-white text-black rounded shadow-md p-3 hidden group-hover:flex flex-col gap-2 z-40">
              {category.map((cat) => (
                <Link
                  to={`/catalog/${cat._id}`}
                  key={cat._id}
                  className="hover:bg-richblack-100 rounded px-2 py-1"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <Link
            key={index}
            to={data.path}
            className={`font-semibold px-2 py-1 hover:text-yellow-100 ${
              location.pathname === data.path ? 'text-yellow-25' : 'text-richblack-25'
            }`}
          >
            {data.title}
          </Link>
        )
      )}
    </>
  );

  return (
    <nav className="bg-richblack-800 border-b border-richblack-700">
      <div className="flex justify-between items-center w-11/12 mx-auto h-16">
        {/* Logo */}
        <Link to="/">
          <img src={studayNotationLogo} alt="Logo" className="w-40" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 text-richblack-25">{renderLinks()}</div>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-4 text-richblack-25">
          <CiSearch size={24} className="cursor-pointer" />
          {accountType !== 'Instructor' && (
            <div className="relative cursor-pointer" onClick={() => navigate('/dashboard/cart')}>
              <MdOutlineShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 left-3 text-xs font-bold text-yellow-25">
                  {totalItems}
                </span>
              )}
            </div>
          )}
          {token ? (
            <ProfileDropDown />
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/login')}
                className="border border-richblack-700 px-4 py-1 rounded hover:bg-richblack-700"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="border border-richblack-700 px-4 py-1 rounded hover:bg-richblack-700"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden text-white text-2xl" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <IoClose /> : <GiHamburgerMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-richblack-900 text-richblack-25 px-6 py-4 space-y-4">
          <div className="flex flex-col space-y-3">{renderLinks()}</div>
          <div className="flex gap-4 items-center">
            <CiSearch size={24} />
            {accountType !== 'Instructor' && (
              <div className="relative cursor-pointer" onClick={() => navigate('/dashboard/cart')}>
                <MdOutlineShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 left-3 text-xs font-bold text-yellow-25">
                    {totalItems}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="pt-2">
            {token ? (
              <ProfileDropDown />
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    navigate('/login');
                    toggleMobileMenu();
                  }}
                  className="border border-richblack-700 px-4 py-2 rounded hover:bg-richblack-700"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate('/signup');
                    toggleMobileMenu();
                  }}
                  className="border border-richblack-700 px-4 py-2 rounded hover:bg-richblack-700"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
