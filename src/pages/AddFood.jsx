import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../provider/AuthProvider'; // Adjust path if needed
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// --- Main Component ---
const AddFood = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); // Hook for navigation
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Indicate loading state

        if (!user) {
            toast.error("You must be logged in to add food.");
            setIsSubmitting(false);
            return;
        }

        const form = new FormData(e.target);
        const foodData = Object.fromEntries(form);

        // Add user details from context (more secure than hidden form fields)
        foodData.userEmail = user.email;
        foodData.userName = user.displayName || user.email; // Use display name or fallback to email
        foodData.userImage = user.photoURL; // Add user image if available

        // Add timestamps and status
        foodData.createdAt = new Date().toISOString();
        foodData.availability = 'Available'; 

        // Convert foodQuantity to number if needed by backend
        foodData.foodQuantity = Number(foodData.foodQuantity); 

        console.log("Submitting food data:", foodData); // Log data being sent

        try {
            // Get fresh token before sending request
            const idToken = await user.getIdToken(true); 
            
            const res = await axios.post("https://food-server-sooty.vercel.app/add-food", foodData, {
                 headers: {
                    Authorization: `Bearer ${idToken}` // Send authorization token
                 }
            });

            if (res.data.insertedId) {
                toast.success("Food added successfully!");
                e.target.reset(); // Clear the form
                navigate('/available-foods'); // Redirect after successful submission
            } else {
                 toast.error("Failed to add food. Please try again.");
            }
        } catch (err) {
            console.error("Error submitting food:", err);
            toast.error(err.response?.data?.message || "An error occurred while adding food.");
        } finally {
            setIsSubmitting(false); // Reset loading state
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    if (authLoading) {
        return (
             <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-emerald-500"></div>
            </div>
        );
    }
     if (!user) {
         return (
             <div className="min-h-screen flex flex-col items-center justify-center text-center py-10 bg-gray-50 dark:bg-gray-950">
                 <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Access Denied</h2>
                 <p className="text-gray-600 dark:text-gray-400">Please log in to add food.</p>
                 {/* Optional: Add a login button */}
                 {/* <Link to="/login" className="mt-4 inline-block px-6 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700">Login</Link> */}
             </div>
         );
    }


    return (
        <div ref={ref} className="bg-white dark:bg-gray-900 py-12 sm:py-20">
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight">
                            Share Your Surplus Food
                        </h1>
                        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                            Help reduce waste and support your community by adding your extra food items.
                        </p>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="bg-gray-50 dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6"
                    >
                        {/* Food Name */}
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="foodName">Food Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="foodName"
                                id="foodName"
                                placeholder='e.g., Chicken Curry with Rice'
                                className="block w-full px-4 py-3 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                required
                            />
                        </motion.div>

                        {/* Image URL */}
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="imageUrl">Food Image URL <span className="text-red-500">*</span></label>
                            <input
                                type="url" // Use type="url" for better validation
                                name='imageUrl'
                                id='imageUrl'
                                placeholder='https://example.com/image.jpg'
                                className="block w-full px-4 py-3 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                required
                            />
                        </motion.div>

                        {/* Quantity & Location (Side-by-side on medium screens) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <motion.div variants={itemVariants}>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="foodQuantity">Quantity (Serves approx.) <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    name="foodQuantity"
                                    id="foodQuantity"
                                    placeholder="e.g., 3"
                                    min="1" // Ensure positive number
                                    className="block w-full px-4 py-3 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="location">Pickup Location <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="location"
                                    id="location"
                                    placeholder="e.g., Ashulia Bazar"
                                    className="block w-full px-4 py-3 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                />
                            </motion.div>
                        </div>
                        
                         {/* Expiry Date */}
                        <motion.div variants={itemVariants}>
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="date">Expiry Date <span className="text-red-500">*</span></label>
                             <input
                                type="date"
                                name="date" // Changed name to match previous data model (if needed, otherwise use expireDate)
                                id="date" 
                                min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
                                className="block w-full px-4 py-3 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                required
                            />
                        </motion.div>

                        {/* Additional Notes */}
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="description">Additional Notes</label>
                            <textarea
                                name="description"
                                id="description"
                                placeholder="e.g., Contains nuts, best consumed today, pickup instructions..."
                                rows={4}
                                className="block w-full px-4 py-3 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            ></textarea>
                        </motion.div>

                        {/* Donator Info (Read-only) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                             <motion.div variants={itemVariants}>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1" htmlFor="userName">Your Name</label>
                                <input
                                    type="text"
                                    id="userName"
                                    value={user?.displayName || user?.email || ''}
                                    readOnly
                                    className="block w-full px-4 py-3 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                 <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1" htmlFor="userEmail">Your Email</label>
                                <input
                                    type="email"
                                    id="userEmail"
                                    value={user?.email || ''}
                                    readOnly
                                    className="block w-full px-4 py-3 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                />
                            </motion.div>
                           
                        </div>
                         {/* Hidden Status field - Removed as status is set in handleSubmit */}
                         {/* <input type="hidden" name="status" value="available" /> */}

                        {/* Submit Button */}
                        <motion.div variants={itemVariants}>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-lg font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-emerald-300 dark:disabled:bg-emerald-800 transition duration-150 ease-in-out"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </>
                                ) : (
                                    'Add Food Listing'
                                )}
                            </button>
                        </motion.div>
                    </motion.form>
                </div>
            </motion.div>
        </div>
    );
};

export default AddFood;