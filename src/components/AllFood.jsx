import React, { useState, useMemo, useRef } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

// Fetcher function for react-query
const fetchFoods = async () => {
    const res = await axios.get("https://food-server-sooty.vercel.app/all-foods");
    return res.data;
};

// Reusable Food Card Component
const FoodCard = ({ food }) => {
    const { _id, foodName, imageUrl, foodQuantity, location, description, userName } = food;
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group border border-gray-200 dark:border-gray-700 h-full flex flex-col"
        >
            <div className="relative">
                <Link to={`/food-details/${_id}`} className="block h-56 overflow-hidden">
                    <motion.img 
                        className="w-full h-full object-cover" 
                        src={imageUrl} 
                        alt={foodName}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </Link>
                <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                    <img className="w-11 h-11 rounded-full border-2 border-white/80 shadow-md object-cover" src={imageUrl} alt={userName} />
                    <div>
                        <p className="text-sm text-gray-200">Shared by</p>
                        <p className="text-white font-semibold">{userName}</p>
                    </div>
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white truncate" title={foodName}>{foodName}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm flex-grow h-12 overflow-hidden">{description}</p>
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
                <div className="mt-6">
                    <Link to={`/food-details/${_id}`} className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-center text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 transition-colors duration-300">
                        View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

const AllFood = () => {
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const { data: foods = [], isLoading, isError, error } = useQuery({
        queryKey: ["foods"],
        queryFn: fetchFoods,
    });

    // Memoize filtering and sorting for performance
    const filteredFoods = useMemo(() => {
        return foods.filter((food) =>
            food.foodName.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [foods, searchText]);

    // Pagination logic
    const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
    const currentFoods = filteredFoods.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center py-10 text-red-600 dark:text-red-400 bg-gray-50 dark:bg-gray-950">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h2>
                    <p>Error fetching foods: {error.message}</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header and Search Section */}
                <motion.div 
                    ref={ref}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight">
                        Explore All Shared Meals
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Browse the full list of delicious food shared by our community in Ashulia. Use the search below to find exactly what you're looking for.
                    </p>
                    <div className="mt-8 max-w-lg mx-auto">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input
                                type="search"
                                value={searchText}
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                    setCurrentPage(1); // Reset to first page on new search
                                }}
                                className="block w-full p-4 pl-10 text-md text-gray-900 border border-gray-300 rounded-full bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Search for pizza, rice, vegetables..."
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Food Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 9 }).map((_, index) => (
                           <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse">
                                <div className="w-full h-56 bg-gray-300 dark:bg-gray-700"></div>
                                <div className="p-6">
                                    <div className="h-6 rounded w-3/4 bg-gray-300 dark:bg-gray-700 mb-4"></div>
                                    <div className="h-4 rounded w-full bg-gray-200 dark:bg-gray-600 mb-2"></div>
                                    <div className="h-4 rounded w-5/6 bg-gray-200 dark:bg-gray-600"></div>
                                    <div className="mt-6 h-10 w-full rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {filteredFoods.length > 0 ? (
                            <motion.div 
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {currentFoods.map(food => <FoodCard key={food._id} food={food} />)}
                            </motion.div>
                        ) : (
                            <div className="text-center py-16">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">No Meals Found</h3>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">Try adjusting your search, or check back later for new listings!</p>
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-12 space-x-2">
                                <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700">Prev</button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button key={page} onClick={() => setCurrentPage(page)} className={`px-4 py-2 rounded-lg ${currentPage === page ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>{page}</button>
                                ))}
                                <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700">Next</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AllFood;

