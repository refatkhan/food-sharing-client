import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router'; // ✅ Fixed incorrect import

const AvailableFoods = () => {
    const [food, setFoods] = useState([]);
    const [isGridThree, setIsGridThree] = useState(true); // Toggle state

    useEffect(() => {
        axios.get("https://food-server-sooty.vercel.app/available-foods")
            .then((res) => {
                setFoods(res.data);
            })
            .catch((error) => {
                console.error("Error fetching available food data:", error);
            });
    }, []);

    return (
        <div className='p-6 w-11/12 mx-auto'>
            {/* Toggle Button */}
            <div className="flex justify-end mb-6">
                <div className="flex items-center space-x-3">
                    <span className="text-gray-700 font-medium">Grid:</span>
                    <button
                        onClick={() => setIsGridThree(!isGridThree)}
                        className={`w-16 h-8 flex items-center rounded-full p-1 transition duration-300 ${isGridThree ? 'bg-green-600' : 'bg-emerald-600'
                            }`}
                    >
                        <div
                            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition duration-300 ${isGridThree ? 'translate-x-0' : 'translate-x-8'
                                }`}
                        />
                    </button>
                    <span className="text-sm text-gray-600">
                        {isGridThree ? '3 Columns' : '2 Columns'}
                    </span>
                </div>
            </div>


            {/* Grid Layout */}
            <div className={`grid grid-cols-1 ${isGridThree ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
                {food.map(({ _id, foodName, imageUrl, foodQuantity, location, description, availability }) => (
                    <div
                        key={_id}
                        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                    >
                        <img className="rounded-t-lg w-full h-48 object-cover" src={imageUrl} alt={foodName} />
                        <div className="p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{foodName}</h5>
                            <p className="mb-2 text-gray-700 dark:text-gray-400"><strong>Description:</strong> {description}</p>
                            <p className="mb-2 text-gray-700 dark:text-gray-400"><strong>Quantity:</strong> {foodQuantity}</p>
                            <p className="mb-2 text-gray-700 dark:text-gray-400"><strong>Location:</strong> {location}</p>
                            <p className="mb-4 text-gray-700 dark:text-gray-400"><strong>Availability:</strong> {availability}</p>
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
                ))}
            </div>
        </div>
    );
};

export default AvailableFoods;
