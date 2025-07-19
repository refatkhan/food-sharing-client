import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router'
const FeaturedFoods = () => {
    const [featuredFoods, setFeaturedFoods] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/food-featured')
            .then(res => setFeaturedFoods(res.data))
            .catch(err => console.error("Error fetching featured foods:", err));
    }, []);
    return (
        <div className='w-12/13 mx-auto'>
            <h3 className='text-3xl font-semibold text-center my-3'>Today's Featured Foods</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 w-12/13 mx-auto">
                {featuredFoods.map((food) => {
                    const {
                        _id,
                        foodName,
                        imageUrl,
                        foodQuantity,
                        location,
                        description,
                    } = food;
                    console.log(_id);
                    return (
                        <div class="max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img class="rounded-t-lg" src={imageUrl} alt={foodName} />
                            </a>
                            <div class="p-5">
                                <a href="#">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{foodName}</h5>
                                </a>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><strong>Description: </strong>{description}</p>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><strong>Food Quantity: </strong> {foodQuantity}</p>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><strong>Location:</strong> {location}</p>
                                <Link to={`/food-details/${_id}`} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 hover:bg-green-800 rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    View Details
                                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                    );
                })}
            </div>
            {/* Centered See More button outside grid */}
            <div className="flex justify-center my-6">
                <Link to='/all-food' class="inline-flex items-center px-4 py-2 text-xl font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">  See All </Link>
            </div>
        </div>
    );

};

export default FeaturedFoods;