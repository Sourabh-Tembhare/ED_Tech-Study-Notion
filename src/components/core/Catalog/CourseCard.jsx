import React from 'react'
import RatingAndReview from '../../common/RatingAndReview'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { calculateAverageRating } from '../../../utils/AverageRating';
import { useNavigate } from 'react-router-dom';

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-yellow-50 text-sm">
      {[...Array(fullStars)].map((_, i) => <FaStar key={i} />)}
      {halfStar && <FaStarHalfAlt />}
      {[...Array(emptyStars)].map((_, i) => <FaRegStar key={i + 10} />)}
    </div>
  );
};

const CourseCard = ({ data, height, width }) => {
  const averageRating = calculateAverageRating(data?.ratingAndReviews);
  const navigate = useNavigate();

  const navigateHandler = (courseId) => {
    navigate("/coures-details", { state: { data } });
  };

  return (
    <div
      style={{ height, width }}
      className="flex flex-col gap-2 p-2 rounded-md text-richblack-5 cursor-pointer"
      onClick={() => navigateHandler(data?._id)}
    >
      <img
        src={data?.thumbnail}
        alt={`${data?.courseName} thumbnail`}
        style={{ height: "60%", width: "100%" }}
        className="object-cover rounded-md"
      />
      <div className="flex flex-col justify-between gap-3">
        <p className="font-semibold text-[14px] line-clamp-2">{data?.courseName}</p>
        <p className="text-sm text-richblack-300">
          Created By {data?.instructor?.firstName} {data?.instructor?.lastName}
        </p>

        <div className="flex items-center gap-2">
          {renderStars(averageRating)}
          <span className="text-yellow-50 text-sm font-semibold">{averageRating}</span>
          <span className="text-richblack-100 text-sm">({data?.ratingAndReviews.length} ratings)</span>
        </div>

        <p className="font-semibold text-base">Rs. {data?.price}</p>
      </div>
    </div>
  );
};

export default CourseCard;
