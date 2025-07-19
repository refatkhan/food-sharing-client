import React from 'react';
import banner from '../assets/banner.jpg'
const Banner = () => {
  return (
    <div className="relative">
      <img className="w-full h-[60vh] object-cover " src={banner} alt="Food Sharing Banner" />

      <div className="absolute inset-0  flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Share Surplus Food, Spread Kindness
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl">
          Join our mission to reduce food waste and help those in need. Share or find freshly cooked meals with your community.
        </p>
        <a href="/available-foods">
          <button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white font-semibold px-6 py-3 rounded-lg shadow-md">
            Find Food Now
          </button>
        </a>
      </div>
    </div>

  )
};

export default Banner;
