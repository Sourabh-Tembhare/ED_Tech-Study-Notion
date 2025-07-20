import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

const RatingAndReviewSlider = () => {
  const [allRatingAndReview, setAllRatingAndReview] = useState([]);

  const getAllratingAndReview = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/getReviews");
      setAllRatingAndReview(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getAllratingAndReview();
  }, []);

  return (
    <div className="text-richblack-5 mb-20 w-full">
      <Swiper
        modules={[FreeMode, Pagination, Autoplay]}
        loop={true}
        freeMode={true}
        autoplay={{ delay: 2500 }}
        spaceBetween={24}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1.2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 3,
          },
        }}
        className="w-full"
      >
        {allRatingAndReview.map((review, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col gap-4 bg-richblack-800 px-4 py-4 rounded-md shadow-sm"
          >
            {/* User Info */}
            <div className="flex flex-row gap-3 items-center">
              <img
                src={review?.user?.image}
                alt="user"
                className="h-11 w-11 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold">
                  {review?.user?.firstName} {review?.user?.lastName}
                </p>
                <p className="text-xs text-richblack-300">{review?.user?.email}</p>
              </div>
            </div>

            {/* Review Text */}
            <div className="text-sm text-richblack-50">
              {review?.review.length > 100
                ? `${review.review.substring(0, 100)}...`
                : review.review}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 text-yellow-50">
              <p className="text-base font-semibold">{review?.rating.toFixed(1)}</p>
              <ReactStars
                count={5}
                size={20}
                color2={"#ffd700"}
                value={review?.rating}
                edit={false}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RatingAndReviewSlider;
