import React, { useState, useMemo, useRef, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { IoSearchOutline, IoPeopleOutline, IoLocationOutline, IoTimeOutline, IoWarningOutline } from "react-icons/io5";

// Fetcher function for react-query
const fetchFoods = async () => {
    const res = await axios.get("https://food-server-sooty.vercel.app/all-foods");
    return res.data;
};

// Reusable Food Card Component
const FoodCard = ({ food }) => {
    const { _id, foodName, imageUrl, foodQuantity, location, description, userName, userImage, date, status } = food;

    // --- FEATURE: Expiry Date Highlighting Logic ---
    const getExpiryInfo = (expiryDateString) => {
        if (!expiryDateString) {
            return {
                text: "N/A",
                textStyle: 'text-gray-700 dark:text-gray-300',
                style: 'border-gray-200 dark:border-gray-700/50',
                badge: null
            };
        }

        const now = new Date();
        const expiry = new Date(expiryDateString);

        if (isNaN(expiry)) {
            return {
                text: "Invalid Date",
                textStyle: 'text-gray-700 dark:text-gray-300',
                style: 'border-gray-200 dark:border-gray-700/50',
                badge: null
            };
        }

        // Normalize dates to compare days (start of day) - FIXED VERSION
        // Set both dates to midnight in the user's local timezone
        const nowLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const expiryLocal = new Date(expiry.getFullYear(), expiry.getMonth(), expiry.getDate());

        // Calculate the difference in days
        const diffTime = expiryLocal.getTime() - nowLocal.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let formattedDate = expiry.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

        // Case 1: Expired
        if (diffDays < 0) {
            return {
                text: `Expired on ${formattedDate}`,
                textStyle: 'text-gray-500 dark:text-gray-500',
                style: 'border-gray-300 dark:border-gray-600 opacity-80',
                badge: {
                    text: 'Expired',
                    style: 'bg-red-500 text-white border-none p-1 rounded-xl border-gray-600'
                }
            };
        }

        // Case 2: Expires Today
        if (diffDays === 0) {
            return {
                text: `Expires Today`,
                textStyle: 'text-red-600 dark:text-red-400 font-semibold',
                style: 'border-red-500 dark:border-red-600 ring-2 ring-red-500/20',
                badge: {
                    text: 'Expires Today!',
                    style: 'bg-gray-600 text-white border-none p-1 rounded-xl border-red-700 animate-pulse'
                }
            };
        }

        // Case 3: Expires Tomorrow
        if (diffDays === 1) {
            return {
                text: `Expires Tomorrow`,
                textStyle: 'text-yellow-600 dark:text-yellow-400 font-semibold',
                style: 'border-yellow-500 dark:border-yellow-600',
                badge: {
                    text: 'Expires Soon',
                    style: 'bg-yellow-500 text-gray-900 border-none p-1 rounded-xl border-yellow-600'
                }
            };
        }

        // Case 4: Expires in 2-3 days (added for better UX)
        if (diffDays <= 3) {
            return {
                text: `Expires in ${diffDays} days`,
                textStyle: 'text-orange-600 dark:text-orange-400 font-medium',
                style: 'border-orange-400 dark:border-orange-500',
                badge: {
                    text: `${diffDays} days left`,
                    style: 'bg-orange-500 text-white border border-orange-600'
                }
            };
        }

        // Default: Expires later
        return {
            text: `Expires: ${formattedDate}`,
            textStyle: 'text-gray-700 dark:text-gray-300',
            style: 'border-gray-200 dark:border-gray-700/50',
            badge: null
        };
    };

    const expiryInfo = getExpiryInfo(date);
    // --- END FEATURE ---

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group border h-full flex flex-col ${expiryInfo.style}`}
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
                        src={userImage || `https://i.pravatar.cc/150?u=${_id}`}
                        alt={userName || 'Donor'} />
                    <div>
                        <p className="text-xs text-gray-200">Shared by</p>
                        <p className="text-sm text-white font-semibold">{userName || 'Anonymous'}</p>
                    </div>
                </div>

                {/* --- Expiry Badge --- */}
                {expiryInfo.badge && (
                    <div className={`absolute top-2 left-2 z-10 ${expiryInfo.badge.style}`}>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {expiryInfo.badge.text === 'Expires Today!' && <IoWarningOutline className="w-3 h-3 mr-1" />}
                            {expiryInfo.badge.text}
                        </span>
                    </div>
                )}

                {/* Status Badge */}
                {status && (
                    <div className={`absolute top-2 z-10 ${expiryInfo.badge ? 'right-auto left-28' : 'right-2'}`}>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm ${status === 'available'
                                ? 'bg-green-100/70 text-green-800 dark:bg-green-900/70 dark:text-green-200'
                                : 'bg-yellow-100/70 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-200'
                            }`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                    </div>
                )}
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate mb-2" title={foodName}>{foodName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{description || "No description provided."}</p>

                <ul className="space-y-1.5 text-sm mb-4">
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                        <IoPeopleOutline className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                        <span>Serves {foodQuantity || '?'}</span>
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                        <IoLocationOutline className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">{location || 'N/A'}</span>
                    </li>
                    <li className={`flex items-center ${expiryInfo.textStyle}`}>
                        <IoTimeOutline className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                        <span>{expiryInfo.text}</span>
                    </li>
                </ul>

                <div className="flex-grow"></div>

                <div className="mt-4">
                    <Link to={`/food-details/${_id}`} className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-center text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 transition-colors duration-300">
                        View Details
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

const AvailableFoods = () => {
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortCriteria, setSortCriteria] = useState("date");
    const itemsPerPage = 9;

    const { data: foods = [], isLoading, isError, error } = useQuery({
        queryKey: ["foods"],
        queryFn: fetchFoods,
    });

    // Memoize filtering and sorting
    const filteredAndSortedFoods = useMemo(() => {
        let processed = foods
            .filter(food => food.status === 'available')
            .filter((food) =>
                food.foodName.toLowerCase().includes(searchText.toLowerCase())
            );

        // Sorting Logic
        if (sortCriteria === 'date') {
            processed.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                if (isNaN(dateA)) return 1;
                if (isNaN(dateB)) return -1;
                return dateA - dateB;
            });
        } else if (sortCriteria === 'quantity') {
            processed.sort((a, b) => (Number(b.foodQuantity) || 0) - (Number(a.foodQuantity) || 0));
        }

        return processed;
    }, [foods, searchText, sortCriteria]);

    // Pagination logic
    const totalItems = filteredAndSortedFoods.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentFoods = filteredAndSortedFoods.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const ref = useRef(null);

    // Reset page to 1 when search or sort criteria changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchText, sortCriteria]);

    // Pagination Handlers
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const handlePreviousPage = () => { handlePageChange(Math.max(currentPage - 1, 1)); };
    const handleNextPage = () => { handlePageChange(Math.min(currentPage + 1, totalPages)); };

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
                        Browse the full list of delicious food shared by our community. Use the search and sort options below.
                    </p>
                </motion.div>

                {/* Controls Row (Search + Sort) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8"
                >
                    {/* Search Input */}
                    <div className="relative w-full md:max-w-lg">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input
                            type="search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="block w-full p-4 pl-10 text-md text-gray-900 border border-gray-300 rounded-full bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Search for pizza, rice, vegetables..."
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <div className="w-full md:w-auto">
                        <label htmlFor="sort-criteria" className="sr-only">Sort by</label>
                        <select
                            id="sort-criteria"
                            value={sortCriteria}
                            onChange={(e) => setSortCriteria(e.target.value)}
                            className="block w-full md:w-auto pl-3 pr-10 py-3 text-md border border-gray-300 rounded-full bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 shadow-sm appearance-none"
                        >
                            <option value="date">Sort by Expiry (Soonest)</option>
                            <option value="quantity">Sort by Quantity (Highest)</option>
                        </select>
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
                        {currentFoods.length > 0 ? (
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                <AnimatePresence>
                                    {currentFoods.map(food => <FoodCard key={food._id} food={food} />)}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-center py-16">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">No Meals Found</h3>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">Try adjusting your search, or check back later for new listings!</p>
                            </motion.div>
                        )}

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                                className="flex justify-center items-center mt-12 space-x-2"
                            >
                                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700">Prev</button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button key={page} onClick={() => handlePageChange(page)} className={`px-4 py-2 rounded-lg ${currentPage === page ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>{page}</button>
                                ))}
                                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700">Next</button>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AvailableFoods;