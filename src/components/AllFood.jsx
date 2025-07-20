import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const fetchFoods = async () => {
    const res = await axios.get("http://localhost:3000/all-foods");
    return res.data;
};

const AllFood = () => {
    const [searchText, setSearchText] = useState("");

    const {
        data: foods = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["foods"],
        queryFn: fetchFoods,
    });

    const filteredFoods = foods.filter((food) =>
        food.foodName.toLowerCase().includes(searchText.toLowerCase())
    );

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
                <div className="flex-grow max-w-md">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500"
                                fill="none"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 111 8a7 7 0 0114 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                            placeholder="Search by food name..."
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                {filteredFoods.map((food) => {
                    const { _id, foodName, imageUrl, foodQuantity, location, description } = food;

                    return (
                        <div
                            key={_id}
                            className="bg-green-50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                        >
                            <img
                                className="rounded-t-lg w-full object-cover h-48"
                                src={imageUrl}
                                alt={foodName}
                            />
                            <div className="p-8">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                    {foodName}
                                </h5>
                                <p className="mb-3 font-normal text-gray-700">
                                    <strong>Description:</strong> {description}
                                </p>
                                <p className="mb-3 font-normal text-gray-700">
                                    <strong>Food Quantity:</strong> {foodQuantity}
                                </p>
                                <p className="mb-3 font-normal text-gray-700">
                                    <strong>Location:</strong> {location}
                                </p>
                                <Link
                                    to={`/food-details/${_id}`}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-800 rounded-lg"
                                >
                                    View Details
                                    <svg
                                        className="w-3.5 h-3.5 ms-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 14 10"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
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
