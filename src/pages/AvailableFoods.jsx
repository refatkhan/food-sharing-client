import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const AvailableFoods = () => {
    const [food, setFoods] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3000/available-foods")
            .then((res) => {
                setFoods(res.data);
            })
            .catch((error) => {
                console.error("Error fetching available food data:", error);
            });
    }, []);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                {food.map((food) => {
                    const {
                        _id,
                        foodName,
                        imageUrl,
                        foodQuantity,
                        location,
                        description,
                        availability,
                    } = food;
                   
                    return (
                        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
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
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><strong>Availibility: :</strong> {availability}</p>
                                <Link to={`/food-details/${_id}`} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
        </div>
    );
};

export default AvailableFoods;