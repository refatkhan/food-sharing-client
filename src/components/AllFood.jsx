import React, { useState, useMemo, useRef, useEffect } from "react"; // Added useEffect
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { IoSearchOutline, IoPeopleOutline, IoLocationOutline, IoTimeOutline } from "react-icons/io5"; // Added necessary icons

// Fetcher function for react-query
const fetchFoods = async () => {
    const res = await axios.get("https://food-server-sooty.vercel.app/all-foods");
    return res.data;
};

// Reusable Food Card Component (Keep as provided)
const FoodCard = ({ food }) => {
    const { _id, foodName, imageUrl, foodQuantity, location, description, userName, userImage, date } = food; // Assume userImage and date are available

    // Helper to format the date (assuming 'date' is expiry date)
    const formatDate = (dateString) => {
         if (!dateString) return "N/A";
         const dt = new Date(dateString);
         if (isNaN(dt)) return "Invalid Date";
        return dt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group border border-gray-200 dark:border-gray-700 h-full flex flex-col"
        >
            <div className="relative overflow-hidden">
                <Link to={`/food-details/${_id}`} className="block h-56">
                    <motion.img
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        src={imageUrl}
                        alt={foodName}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </Link>
                <div className="absolute bottom-4 left-4 flex items-center space-x-3 z-10">
                    <img className="w-10 h-10 rounded-full border-2 border-white/80 shadow-md object-cover"
                         src={userImage || `https://i.pravatar.cc/150?u=${_id}`} // Use userImage from data
                         alt={userName || 'Donor'} />
                    <div>
                        <p className="text-xs text-gray-200">Shared by</p>
                        <p className="text-sm text-white font-semibold">{userName || 'Anonymous'}</p>
                    </div>
                </div>
                 {/* Status Badge (Optional, assuming 'status' field might exist) */}
                { food.status &&
                    <div className="absolute top-2 right-2 z-10">
                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm ${food.status === 'available'
                                 ? 'bg-green-100/70 text-green-800 dark:bg-green-900/70 dark:text-green-200'
                                 : 'bg-yellow-100/70 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-200'
                             }`}>
                             {food.status.charAt(0).toUpperCase() + food.status.slice(1)}
                         </span>
                    </div>
                }
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate mb-2" title={foodName}>{foodName}</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{description || "No description provided."}</p>
                <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300 mb-4">
                    <li className="flex items-center">
                        <IoPeopleOutline className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                        <span>Serves {foodQuantity || '?'}</span>
                    </li>
                    <li className="flex items-center">
                        <IoLocationOutline className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">{location || 'N/A'}</span>
                    </li>
                     <li className="flex items-center">
                        <IoTimeOutline className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                        <span>Expires: {formatDate(date)}</span>
                    </li>
                </ul>
                <div className="flex-grow"></div>
                <Link to={`/food-details/${_id}`} className="w-full mt-4 inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-center text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 transition-colors duration-300">
                    View Details
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>
                </Link>
            </div>
        </motion.div>
    );
};

const AllFood = () => {
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortCriteria, setSortCriteria] = useState("date"); // State for sorting, default to 'date'
    const itemsPerPage = 6; // Adjusted from 9

    const { data: foods = [], isLoading, isError, error } = useQuery({
        queryKey: ["allFoodsData"], // Changed queryKey slightly for clarity
        queryFn: fetchFoods,
    });

    // Memoize filtering and sorting for performance
    const filteredAndSortedFoods = useMemo(() => { // Renamed variable
        let processed = foods.filter((food) =>
            food.foodName.toLowerCase().includes(searchText.toLowerCase())
        );

        // --- SORTING LOGIC ADDED ---
        if (sortCriteria === 'date') {
            // Sort by date (soonest expiry first) - Assuming 'date' is expiry date
             processed.sort((a, b) => {
                 const dateA = new Date(a.date);
                 const dateB = new Date(b.date);
                 // Handle invalid dates by placing them at the end
                 if (isNaN(dateA)) return 1;
                 if (isNaN(dateB)) return -1;
                 return dateA - dateB; // Sort ascending (soonest first)
            });
        } else if (sortCriteria === 'quantity') {
            // Sort by quantity (highest first)
            processed.sort((a, b) => (Number(b.foodQuantity) || 0) - (Number(a.foodQuantity) || 0)); // Sort descending
        }
        // You could add more sorting options here, e.g., alphabetically by name
        // else if (sortCriteria === 'name') {
        //    processed.sort((a, b) => a.foodName.localeCompare(b.foodName));
        // }

        return processed;
    }, [foods, searchText, sortCriteria]); // Added sortCriteria dependency

    // Pagination logic (uses filteredAndSortedFoods)
    const totalItems = filteredAndSortedFoods.length; // Use length of processed list
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentFoods = filteredAndSortedFoods.slice( // Use processed list here too
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const ref = useRef(null);
    // const isInView = useInView(ref, { once: true, amount: 0.1 }); // Removed isInView as it was only on header

     // Reset page to 1 when search or sort criteria changes
     useEffect(() => {
        setCurrentPage(1);
    }, [searchText, sortCriteria]); // Added sortCriteria dependency


    // --- Pagination Handlers ---
     const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
    };
     const handlePreviousPage = () => { handlePageChange(Math.max(currentPage - 1, 1)); };
    const handleNextPage = () => { handlePageChange(Math.min(currentPage + 1, totalPages)); };


    if (isError) {
         return (
             <div className="min-h-[calc(100vh-160px)] flex items-center justify-center text-center py-10 text-red-600 dark:text-red-400 bg-gray-50 dark:bg-gray-950">
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
                {/* Header Section */}
                <motion.div
                    ref={ref} // Attach ref here for scroll target
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight">
                        Explore All Shared Meals
                    </h1>
                     <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Browse the full list of delicious food shared by our community. Use the search and sort options below.
                    </p>
                </motion.div>

                 {/* --- Controls Row: Search and Sort --- */}
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8"
                 >
                     {/* Search Input */}
                     <div className="relative w-full md:max-w-sm">
                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><IoSearchOutline className="w-5 h-5 text-gray-400" /></div>
                         <input
                             type="search" value={searchText}
                             onChange={(e) => setSearchText(e.target.value)}
                             className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
                             placeholder="Search by food name..."
                         />
                     </div>
                     {/* Sort Dropdown ADDED */}
                     <div className="w-full md:w-auto">
                          <label htmlFor="sort-criteria" className="sr-only">Sort by</label>
                          <select
                             id="sort-criteria"
                             value={sortCriteria}
                             onChange={(e) => setSortCriteria(e.target.value)}
                             className="block w-full md:w-auto pl-3 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 shadow-sm appearance-none"
                         >
                             <option value="date">Sort by Expiry (Soonest)</option>
                             <option value="quantity">Sort by Quantity (Highest)</option>
                             {/* <option value="name">Sort by Name (A-Z)</option> */}
                         </select>
                     </div>
                 </motion.div>


                {/* Food Grid / Loading / No Results */}
                {isLoading ? (
                    <div className="text-center py-16">
                         <div className="inline-block w-12 h-12 border-4 border-dashed rounded-full animate-spin border-emerald-500"></div>
                         <p className="mt-4 text-gray-600 dark:text-gray-400">Loading meals...</p>
                    </div>
                 ) : currentFoods.length > 0 ? ( // Use currentFoods
                    <>
                        {/* Grid with layout animation */}
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence>
                                {currentFoods.map(food => (
                                     // Use FoodCard component - motion is inside it
                                    <FoodCard key={food._id} food={food} />
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                                className="flex justify-center items-center mt-12 space-x-1 sm:space-x-2"
                             >
                                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-3 sm:px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm border border-gray-300 dark:border-gray-600 disabled:cursor-not-allowed text-sm"> Prev </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                                     <button key={pageNumber} onClick={() => handlePageChange(pageNumber)} className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium shadow-sm border border-gray-300 dark:border-gray-600 ${currentPage === pageNumber ? 'bg-emerald-600 text-white border-emerald-600 z-10' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}> {pageNumber} </button>
                                ))}
                                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-3 sm:px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm border border-gray-300 dark:border-gray-600 disabled:cursor-not-allowed text-sm"> Next </button>
                            </motion.div>
                        )}
                    </>
                ) : (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-center py-16">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">No Matching Foods Found</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Try adjusting your search!</p>
                    </motion.div>
                 )}
            </div>
        </div>
    );
};

export default AllFood; // Changed component name to match file