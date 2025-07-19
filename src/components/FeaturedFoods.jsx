import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router'; // Fix import to react-router-dom

const FeaturedFoods = () => {
    const [featuredFoods, setFeaturedFoods] = useState([]);

    useEffect(() => {
        axios.get('https:/food-server-sooty.vercel.app/food-featured')
            .then(res => setFeaturedFoods(res.data))
            .catch(err => console.error("Error fetching featured foods:", err));
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-semibold text-center my-8">Today's Featured Foods</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredFoods.map(food => {
                    const { _id, foodName, imageUrl, foodQuantity, location, description } = food;
                    return (
                        <div
                            key={_id}
                            className="bg-green-50 dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                        >
                            <a href="#">
                                <img className="rounded-t-lg w-full object-cover h-48" src={imageUrl} alt={foodName} />
                            </a>
                            <div className="p-8">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{foodName}</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><strong>Description: </strong>{description}</p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><strong>Food Quantity: </strong> {foodQuantity}</p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><strong>Location:</strong> {location}</p>
                                <Link
                                    to={`/food-details/${_id}`}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 hover:bg-green-800 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    View Details
                                    <svg
                                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 5h12m0 0L9 1m4 4L9 9"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                    );
                })}
            </div>

            <div className="flex justify-center my-12">
                <Link
                    to="/all-food"
                    className="inline-flex items-center px-6 py-3 text-xl font-medium text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-700 dark:hover:bg-green-900 dark:focus:ring-green-500"
                >
                    See All
                </Link>
            </div>
        </div>
    );
};

export default FeaturedFoods;
