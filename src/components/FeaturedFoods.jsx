import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FeaturedFoods = () => {
    const [featuredFoods, setFeaturedFoods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('https://food-server-sooty.vercel.app/food-featured')
            .then(res => {
                // We only want to show the top 6 featured foods
                setFeaturedFoods(res.data.slice(0, 6));
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching featured foods:", err);
                setIsLoading(false);
            });
    }, []);

    const FoodCardSkeleton = () => (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse">
            <div className="w-full h-56 bg-gray-300 dark:bg-gray-700"></div>
            <div className="p-6">
                <div className="h-6 rounded w-3/4 bg-gray-300 dark:bg-gray-700 mb-4"></div>
                <div className="h-4 rounded w-full bg-gray-200 dark:bg-gray-600 mb-2"></div>
                <div className="h-4 rounded w-5/6 bg-gray-200 dark:bg-gray-600"></div>
                <div className="mt-4 flex justify-between items-center">
                    <div className="h-5 w-20 rounded bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-5 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
                </div>
                <div className="mt-6 h-10 w-32 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
            </div>
        </div>
    );

    const FoodCard = ({ food }) => {
        const { _id, foodName, imageUrl, foodQuantity, location, description, donator } = food;
        // Fallback for donator info if not provided by the API
        const donatorInfo = donator || {
            name: 'A kind stranger',
            image: `https://i.pravatar.cc/150?u=${_id}` // Generates a unique placeholder avatar
        };

        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 group border border-gray-200 dark:border-gray-700">
                {/* Image Section with Donator Info */}
                <div className="relative">
                    <Link to={`/food-details/${_id}`} className="block h-56">
                        <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src={imageUrl} alt={foodName} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </Link>
                    <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                        <img className="w-11 h-11 rounded-full border-2 border-white/80 shadow-md" src={donatorInfo.image} alt={donatorInfo.name} />
                        <div>
                            <p className="text-sm text-gray-200">Shared by</p>
                            <p className="text-white font-semibold">{donatorInfo.name}</p>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white truncate" title={foodName}>{foodName}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm flex-grow h-12 overflow-hidden">{description}</p>
                    
                    {/* Info with Icons */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-gray-700 dark:text-gray-300">
                        <div className="flex items-center space-x-2" title={`Serves ${foodQuantity} people`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            <span className="font-medium">Serves {foodQuantity}</span>
                        </div>
                        <div className="flex items-center space-x-2" title={location}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span className="font-medium truncate max-w-[120px]">{location}</span>
                        </div>
                    </div>

                    {/* View Details Button */}
                    <div className="mt-6">
                        <Link to={`/food-details/${_id}`} className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-center text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 transition-colors duration-300">
                            View Details
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-950 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight">
                        Freshly Shared Meals
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Discover delicious, home-cooked meals shared by our generous community. Ready to be enjoyed.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading
                        ? Array.from({ length: 6 }).map((_, index) => <FoodCardSkeleton key={index} />)
                        : featuredFoods.map(food => <FoodCard key={food._id} food={food} />)
                    }
                </div>

                {featuredFoods.length > 0 && (
                    <div className="text-center mt-16">
                        <Link
                            to="/all-food"
                            className="inline-block px-8 py-3 text-lg font-semibold text-white bg-gray-800 rounded-lg hover:bg-black dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-600 transition-transform duration-300 hover:scale-105"
                        >
                            Show All Shared Foods
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeaturedFoods;

