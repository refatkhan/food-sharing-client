import React, { useState, useContext, useRef } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom'; // 1. Import useNavigation
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { toast } from 'react-toastify';
import { AuthContext } from '../provider/AuthProvider';

// --- Data Fetching Function (Only for mutation) ---
const requestFood = async ({ foodId, requestData, token }) => {
    const { data } = await axios.patch(`https://food-server-sooty.vercel.app/food/${foodId}`, requestData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

// --- Main Component ---
const FoodDetails = () => {
    const food = useLoaderData();
    const { user, loading: authLoading } = useContext(AuthContext);
    const navigation = useNavigation(); // 2. Get the navigation object

    const queryClient = useQueryClient();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const [showModal, setShowModal] = useState(false);
    const [notes, setNotes] = useState("");

    // --- React Query for data mutation ---
    const mutation = useMutation({
        mutationFn: (requestPayload) => requestFood(requestPayload),
        onSuccess: () => {
            toast.success("Request submitted successfully!");
            setShowModal(false);
            // 3. KEY FIX: Reload the page to fetch fresh data from the loader
            navigation.reload();
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Request failed. Please try again.");
        },
    });

    // --- Event Handler ---
    const handleRequestSubmit = () => {
        if (!user) {
            toast.error("You must be logged in to request food.");
            return;
        }
        mutation.mutate({
            foodId: food._id,
            token: user.accessToken,
            requestData: {
                userEmail: user.email,
                requestDate: new Date().toISOString(),
                notes: notes,
            }
        });
    };

    // --- Render Logic ---
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-emerald-500"></div>
            </div>
        );
    }

    if (!food) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center py-10 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-950">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Food Not Found</h2>
                    <p>Could not retrieve details for this item.</p>
                </div>
            </div>
        );
    }

    // --- 4. KEY FIX: Updated Button Logic ---
    const donatorName = food.userName || 'Anonymous Donator';
    const donatorImage = food.userImage || `https://i.pravatar.cc/150?u=${food.userEmail}`;
    const isOwner = user?.email === food.userEmail;
    const isGloballyAvailable = food.availability === 'Available';

    // Check if the current user is the one who requested this food
    const isRequestedByCurrentUser = food.requestInfo?.userEmail === user?.email;

    // Determine the button's disabled state and text
    let buttonText = "Request This Food";
    let isButtonDisabled = false;

    if (isOwner) {
        buttonText = "This is your post";
        isButtonDisabled = true;
    } else if (!isGloballyAvailable) {
        isButtonDisabled = true;
        if (isRequestedByCurrentUser) {
            buttonText = "You Already Requested This";
        } else {
            buttonText = "Already Requested";
        }
    }

    return (
        <>
            <div ref={ref} className="bg-white dark:bg-gray-900 py-12 sm:py-20 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                        {/* Image Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <img src={food.imageUrl} alt={food.foodName} className="w-full h-full object-cover aspect-[4/3]" />
                        </motion.div>

                        {/* Details Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                            className="flex flex-col h-full"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight">{food.foodName}</h1>

                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Description</h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300">{food.description || "No description provided."}</p>
                            </div>

                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
                                <div className="flex items-center text-gray-700 dark:text-gray-300">
                                    <span className="w-8 h-8 mr-3 text-emerald-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-2a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm-1-6h2v-2h-2v2Zm0-4h2V6h-2v4Z" /></svg></span>
                                    <div><strong>Status:</strong><span className={`ml-2 font-semibold ${isGloballyAvailable ? 'text-green-500' : 'text-yellow-500'}`}>{isGloballyAvailable ? 'Available' : 'Requested'}</span></div>
                                </div>
                                <div className="flex items-center text-gray-700 dark:text-gray-300">
                                    <span className="w-8 h-8 mr-3 text-emerald-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8Zm1-12h-2v4h4v-2h-2Z" /></svg></span>
                                    <div><strong>Posted:</strong><span className="ml-2">{food.date ? new Date(food.date).toLocaleDateString() : 'N/A'}</span></div>
                                </div>
                            </div>

                            {/* Donator Info */}
                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Shared By</h2>
                                <div className="flex items-center">
                                    <img className="w-16 h-16 rounded-full object-cover mr-4 shadow-md" src={donatorImage} alt={donatorName} />
                                    <div>
                                        <p className="text-xl font-bold text-gray-900 dark:text-white">{donatorName}</p>
                                        <p className="text-md text-gray-500 dark:text-gray-400">{food.userEmail}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="mt-8 flex-grow flex items-end">
                                <motion.button
                                    onClick={() => setShowModal(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={isButtonDisabled} // 5. Use the new disabled state
                                    className="w-full px-8 py-4 text-lg font-semibold text-white bg-emerald-600 rounded-lg shadow-lg hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
                                >
                                    {buttonText} {/* 6. Use the new dynamic text */}
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* --- Request Modal --- */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ ease: "easeOut" }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Confirm Your Request</h2>
                            <div className="space-y-3 text-gray-700 dark:text-gray-300">
                                <p><strong>Food:</strong> {food.foodName}</p>
                                <p><strong>Pickup Location:</strong> {food.location}</p>
                                <p><strong>Donator:</strong> {donatorName}</p>
                                <p><strong>Your Email:</strong> {user?.email}</p>
                            </div>
                            <div className="mt-6">
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Additional Notes (Optional)</label>
                                <textarea
                                    id="notes"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={3}
                                    placeholder="Any allergies, pickup time suggestions, etc."
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div className="mt-6 flex justify-end space-x-4">
                                <button onClick={() => setShowModal(false)} className="px-6 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors">Cancel</button>
                                <button
                                    onClick={handleRequestSubmit}
                                    disabled={mutation.isPending}
                                    className="px-6 py-2 rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 transition-colors"
                                >
                                    {mutation.isPending ? "Submitting..." : "Confirm Request"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FoodDetails;