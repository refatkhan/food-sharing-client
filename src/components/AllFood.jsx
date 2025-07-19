import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const fetchFoods = async () => {
    const res = await axios.get("http://localhost:3000/all-foods");
    return res.data;
};

const AllFood = () => {
    const {
        data: foods = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["foods"],
        queryFn: fetchFoods,
    });

    if (isLoading) {
        return <div className="text-center py-10 text-green-600">Loading foods...</div>;
    }

    if (isError) {
        return (
            <div className="text-center py-10 text-red-600">
                Error fetching foods: {error.message}
            </div>
        );
    }

    return (
        <div className="w-12/13 mx-auto py-7">
            <div className="flex items-center justify-between space-x-4">
                <h2 className="text-3xl font-bold text-green-600 flex-shrink-0">
                    All listing Food
                </h2>
                <form className="flex-grow max-w-md">
                    <label htmlFor="default-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search Mockups, Logos..."
                            required
                        />
                        <button
                            type="submit"
                            className="text-white absolute right-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                {foods.map((food) => {
                    const {
                        _id,
                        foodName,
                        imageUrl,
                        foodQuantity,
                        location,
                        description,
                    } = food;

                    return (
                        <div
                            key={_id}
                            className="bg-green-50 dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                        >
                            <a href="#">
                                <img
                                    className="rounded-t-lg w-full object-cover h-48"
                                    src={imageUrl}
                                    alt={foodName}
                                />
                            </a>
                            <div className="p-8">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {foodName}
                                    </h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    <strong>Description: </strong>
                                    {description}
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    <strong>Food Quantity: </strong> {foodQuantity}
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    <strong>Location:</strong> {location}
                                </p>
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
        </div>
    );
};

export default AllFood;
