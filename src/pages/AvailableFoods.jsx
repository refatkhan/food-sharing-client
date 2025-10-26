import React, { useEffect, useState, useMemo, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoGridOutline, IoSquareOutline, IoLocationOutline, IoTimeOutline, IoPeopleOutline, IoSearchOutline } from "react-icons/io5"; // Added IoSearchOutline
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence

const AvailableFoods = () => {
    const [foods, setFoods] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Added loading state
    const [isGridThree, setIsGridThree] = useState(true);
    const [searchText, setSearchText] = useState(""); // State for search input
    const [sortCriteria, setSortCriteria] = useState("date"); // State for sorting ('date' or 'quantity')
    const ref = useRef(null); // Ref for Framer Motion animation trigger

    useEffect(() => {
        setIsLoading(true); // Start loading
        axios.get("https://food-server-sooty.vercel.app/available-foods") // Assuming this gets ALL available foods
            .then((res) => {
                setFoods(res.data);
            })
            .catch((error) => {
                console.error("Error fetching available food data:", error);
                // Optionally set an error state here
            })
            .finally(() => {
                setIsLoading(false); // Stop loading
            });
    }, []);

    // Memoize the filtered and sorted foods for performance
    const processedFoods = useMemo(() => {
        let filtered = foods.filter(food =>
            food.foodName.toLowerCase().includes(searchText.toLowerCase())
        );

        if (sortCriteria === 'date') {
            // Sort by date (soonest expiry first). Assuming 'date' is the expiry date field.
            // Convert to Date objects for proper comparison. Handle invalid dates.
            filtered.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                // Place invalid dates at the end
                if (isNaN(dateA)) return 1;
                if (isNaN(dateB)) return -1;
                return dateA - dateB;
            });
        } else if (sortCriteria === 'quantity') {
            // Sort by quantity (highest first)
            filtered.sort((a, b) => (Number(b.foodQuantity) || 0) - (Number(a.foodQuantity) || 0));
        }

        return filtered;
    }, [foods, searchText, sortCriteria]);


    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        if (isNaN(date)) return "Invalid Date"; // Handle invalid dates
        return date.toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    // Animation Variants
    const cardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2, ease: "easeIn" } },
    };


    return (
        <section ref={ref} className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- Page Header --- */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight">
                        Available Foods
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Browse food shared by generous members of your community. Ready for pickup.
                    </p>
                </motion.div>

                {/* --- Controls: Search, Sort, Layout Toggle --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8"
                >
                    {/* Search Input */}
                    <div className="relative w-full md:max-w-xs">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <IoSearchOutline className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
                            placeholder="Search by food name..."
                        />
                    </div>

                    <div className='flex items-center gap-4'>
                        {/* Sort Dropdown */}
                        <div>
                            <label htmlFor="sort" className="sr-only">Sort by</label>
                            <select
                                id="sort"
                                value={sortCriteria}
                                onChange={(e) => setSortCriteria(e.target.value)}
                                className="block w-full pl-3 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 shadow-sm appearance-none"
                            >
                                <option value="date">Sort by Expiry (Soonest)</option>
                                <option value="quantity">Sort by Quantity (Highest)</option>
                            </select>
                        </div>

                        {/* Layout Toggle */}
                        <div className="hidden sm:inline-flex rounded-md shadow-sm" role="group">
                            <button
                                onClick={() => setIsGridThree(true)} type="button"
                                title="3 Column Grid"
                                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-l-lg transition-colors ${isGridThree ? 'bg-emerald-600 text-white ring-1 ring-emerald-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'}`}>
                                <IoGridOutline className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setIsGridThree(false)} type="button"
                                title="2 Column Grid"
                                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-r-lg transition-colors ${!isGridThree ? 'bg-emerald-600 text-white ring-1 ring-emerald-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 border-l-0'}`}>
                                <IoSquareOutline className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* --- Grid / Loading / No Results --- */}
                {isLoading ? (
                    <div className="text-center py-16">
                        <div className="inline-block w-12 h-12 border-4 border-dashed rounded-full animate-spin border-emerald-500"></div>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading available foods...</p>
                    </div>
                ) : processedFoods.length > 0 ? (
                    <motion.div
                        layout // Enables layout animation when items change
                        className={`grid grid-cols-1 ${isGridThree ? 'sm:grid-cols-2 md:grid-cols-3' : 'sm:grid-cols-2'} gap-6 lg:gap-8`}
                    >
                        <AnimatePresence>
                            {processedFoods.map((item) => (
                                <motion.div
                                    layout // Animate position changes
                                    key={item._id}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    {/* --- Reusing the redesigned card structure --- */}
                                    <div
                                        className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700/50 overflow-hidden h-full group transition-shadow duration-300 hover:shadow-emerald-500/10"
                                    >
                                        {/* Card Image */}
                                        <div className="relative overflow-hidden">
                                            <img className="rounded-t-lg w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300" src={item.imageUrl} alt={item.foodName} />
                                            <div className="absolute top-2 right-2">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm ${item.status === 'available' // Use status field
                                                    ? 'bg-green-100/70 text-green-800 dark:bg-green-900/70 dark:text-green-200'
                                                    : 'bg-yellow-100/70 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-200'
                                                    }`}>
                                                    {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'Unknown'}
                                                </span>
                                            </div>
                                        </div>


                                        {/* Card Content Wrapper */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            {/* Donor Info */}
                                            <div className="flex items-center mb-3">
                                                <img
                                                    className="w-8 h-8 rounded-full mr-2 object-cover border border-gray-300 dark:border-gray-600"
                                                    src={item.donatorImage || `https://i.pravatar.cc/150?u=${item._id}`}
                                                    alt={item.userName}
                                                />
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{item.userName || "Anonymous"}</span>
                                            </div>

                                            {/* Food Name */}
                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white truncate" title={item.foodName}>{item.foodName}</h5>

                                            {/* Icon Info List */}
                                            <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                                                <li className="flex items-center">
                                                    <IoPeopleOutline className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                                                    <span>Serves {item.foodQuantity}</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <IoLocationOutline className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                                                    <span className="truncate">{item.location}</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <IoTimeOutline className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                                                    <span>Expires: {formatDate(item.date)}</span> {/* Assuming 'date' is expiry */}
                                                </li>
                                            </ul>

                                            {/* Spacer to push button down */}
                                            <div className="flex-grow mt-4"></div>

                                            {/* View Details Button */}
                                            <Link
                                                to={`/food-details/${item._id}`}
                                                className="inline-flex items-center justify-center mt-4 px-4 py-2 text-sm font-semibold text-center text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-emerald-800 transition-colors duration-300"
                                            >
                                                View Details
                                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" /* SVG Arrow */></svg>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center py-16"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">No Matching Foods Found</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Try adjusting your search, or check back later!</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default AvailableFoods;