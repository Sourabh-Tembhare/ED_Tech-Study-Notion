import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { calculateAverageRating } from "../utils/AverageRating";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../redux/slices/addtoCartSlice";
import { toast } from "react-toastify";


const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-yellow-50 text-sm">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} />
      ))}
      {halfStar && <FaStarHalfAlt />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={i + 10} />
      ))}
    </div>
  );
};

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const averageRating = calculateAverageRating(cartItems?.ratingAndReviews);
  const { totalItems } = useSelector((state) => state.cart);
  const { totalAmount } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector((state)=> state.auth);
  const removeCartHandler = (courseData)=>{
      if(!token){
         toast.error("Please log in to continue.");
         return ;
        }
    dispatch(removeFromCart(courseData))
  }
  return (
    <div className="mt-4 lg:ml-28 text-richblack-5 lg:w-[82%] mb-8">
      <div>
        <h2 className="text-3xl font-semibold ">Cart</h2>
        <div className="text-richblack-300 mt-16 flex justify-between">
          <div className="flex items-center gap-2 ">
            <p>{totalItems}</p>
            <p>Courses in Cart</p>
          </div>
          <div className="flex items-center gap-2 ">
            <p>Total Amount :</p>
            <p className="text-yellow-50 font-semibold">{totalAmount}</p>
          </div>
        </div>
        <div className="border-[1px] border-richblack-700 mt-4"></div>
        <div className="mt-6 ">
          {cartItems.length < 1 ? (
            <div className="text-richblack-50 lg:ml-72 mt-40">
              {" "}
              Your cart is currently empty.{" "}
              <span
                className="text-yellow-50"
              >
                Browse
              </span>{" "}
              courses to get started!{" "}
            </div>
          ) : (
            <div className="flex flex-col sm:gap-10 gap-4">
              {cartItems.map((course) => {
                return (
                  <div key={course._id} className="sm:h-[140px] rounded-md  ">
                    <div className="flex sm:flex-row justify-between gap-6 flex-col">
              <div className="flex sm:flex-row flex-col gap-6 cursor-pointer" onClick={()=>{navigate("/coures-details",{state:{data:course}})}}>
                        <div>
                        <img
                          src={course?.thumbnail}
                          alt="courseImage"
                          className="h-[140px] sm:w-[185px] w-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex gap-2 flex-col">
                        <p>{course?.courseName}</p>
                        <p className="text-richblack-300 text-[14px]">
                          Created by {course?.instructor?.firstName}{" "}
                          {course?.instructor?.lastName}
                        </p>
                        <div className="flex items-center gap-2">
                          {renderStars(averageRating)}
                          <span className="text-yellow-50 text-sm font-semibold">
                            {averageRating}
                          </span>
                          <span className="text-richblack-100 text-sm">
                            ({course?.ratingAndReviews.length} ratings)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <p>Total Courses</p>
                            <div className="h-2 w-2 bg-richblack-400 rounded-full"></div>
                            <p>Lesson</p>
                            <div className="h-2 w-2 bg-richblack-400 rounded-full"></div>
                            <p>Beginner</p>
                        </div>

                      </div>
              </div>
              <div className="flex flex-col gap-6">
                <div
                onClick={()=>{removeCartHandler(course)}}
                 className="flex items-center gap-2 bg-richblack-800 text-pink-200 p-2 rounded-md cursor-pointer justify-center">
                      <RiDeleteBin6Line/>
                      <p>Remove</p>
                </div>
                <p className="text-yellow-50 text-2xl ">
                    Rs. {course?.price}
                </p>
              </div>
                    </div>

                    <div className="border-[1px] border-richblack-700 mt-4"></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
