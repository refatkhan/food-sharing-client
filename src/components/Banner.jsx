import React from 'react';
import { Link } from 'react-router-dom';
import bannerImage from '../assets/banner.jpg'; // Assuming this path is correct

const Banner = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20 md:py-32">

          {/* --- Text Content --- */}
          <div className="text-center md:text-left">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-800 dark:text-white leading-tight">
              Fight Waste, <br />
              <span className="text-green-500">Feed Families.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto md:mx-0">
              Join our community platform to share surplus food and help those in need. Every meal makes a difference.
            </p>

            {/* Redesigned "Filled" Button */}
            <Link
              to="/available-foods"
              className="mt-10 inline-block bg-green-500 text-white font-bold px-8 py-3 rounded-full text-lg shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Find Food Now
            </Link>
          </div>

          {/* --- Image --- */}
          <div className="flex justify-center md:justify-end">
            <img
              src={bannerImage}
              alt="A collage of fresh food donations"
              className="rounded-3xl shadow-2xl w-full max-w-md md:max-w-full h-64 md:h-96 object-cover"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;