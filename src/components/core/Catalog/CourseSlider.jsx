import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import CourseCard from './CourseCard';
import { FaArrowRight } from 'react-icons/fa';

const CourseSlider = ({ data }) => {
  const nextRef = useRef(null);

  return (
    <div className="relative w-full">
      {data.length < 1 ? (
        <div className="text-richblack-300">Courses not found</div>
      ) : (
        <>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            loop={true}
            navigation={{
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
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
            {data.map((course, index) => (
              <SwiperSlide key={index}>
                <CourseCard data={course} height="350px" width="100%" />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Right Arrow Button */}
          <button
            ref={nextRef}
            className="absolute -right-6 md:-right-8 top-1/2 -translate-y-1/2 z-10 
              bg-richblack-700 text-white p-2 rounded-full 
              hover:bg-yellow-50 hover:text-black transition-all duration-300"
          >
            <FaArrowRight size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default CourseSlider;
