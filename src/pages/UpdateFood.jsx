import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
// 'Link' and 'useLoaderData' should be imported from 'react-router-dom'
import { Link, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoReturnDownBack } from "react-icons/io5";

const UpdateFood = () => {
    const { user } = useContext(AuthContext);
    const foodData = useLoaderData();

    // --- No logic changed ---
    const {
        _id,
        foodName,
        imageUrl,
        foodQuantity,
        location,
        expiryDateTime,
        description,
        availability,
        userEmail, // Kept for the form, though user?.email is used
        userName,   // Kept for the form, though user?.displayName is used
        date,
        time,
    } = foodData;

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form);

        fetch(`https://food-server-sooty.vercel.app/food/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0 || data.matchedCount > 0) {
                    toast.success("Food updated successfully");
                } else {
                    toast.error("No changes were made");
                }
            })
            .catch(() => toast.error("Update failed"));
    };

    // Helper for styling form inputs
    const inputClass = "input input-bordered w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-gray-100";
    const labelClass = "block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300";
    const readOnlyClass = "input input-bordered w-full bg-gray-100 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 cursor-not-allowed text-gray-500 dark:text-gray-400";


    return (
        // --- 1. Redesigned Page Container (Matches FAQ width) ---
        <section className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- Page Header --- */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white tracking-tight">
                            Update Your Food Listing
                        </h2>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                            Make changes to your shared item below.
                        </p>
                    </div>
                    <Link
                        to={"/manage-foods"} // Assuming this should be /manage-my-foods
                        className="btn btn-outline btn-neutral dark:btn-ghost dark:border-gray-600 rounded-lg group"
                    >
                        <IoReturnDownBack size={20} className="transition-transform group-hover:-translate-x-1" />
                        Back to My Foods
                    </Link>
                </div>

                {/* --- 2. Two-Panel Layout --- */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-12">

                    {/* --- Left Panel: Preview & Info --- */}
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Current Listing</h3>

                        {/* Image Preview */}
                        <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                            <img
                                src={imageUrl || 'https://i.imgur.com/gJt6gq0.png'} // Fallback image
                                alt={foodName || "Food image"}
                                className="w-full h-64 object-cover rounded-lg"
                            />
                        </div>

                        {/* Donor Info Card */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 space-y-4">
                            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Donor Information</h4>
                            <div>
                                <label className={labelClass} htmlFor="userName">Your Name</label>
                                <input
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    value={userName || ''}
                                    readOnly
                                    className={readOnlyClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass} htmlFor="userEmail">Your Email</label>
                                <input
                                    type="email"
                                    name="userEmail"
                                    id="userEmail"
                                    value={user?.email || ''}
                                    readOnly
                                    className={readOnlyClass}
                                />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 pt-2">
                                Added on: {date} at {time}
                            </p>
                        </div>
                    </div>

                    {/* --- Right Panel: Edit Form --- */}
                    <div className="lg:col-span-3">
                        <form
                            onSubmit={handleUpdate}
                            className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass} htmlFor="foodName">Food Name</label>
                                    <input
                                        type="text"
                                        name="foodName"
                                        id="foodName"
                                        defaultValue={foodName}
                                        placeholder="e.g., Rice, Chicken Curry"
                                        className={inputClass}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="location">Pick-Up Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        id="location"
                                        placeholder="City, Area"
                                        className={inputClass}
                                        defaultValue={location}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="foodQuantity">Food Quantity (servings)</label>
                                    <input
                                        type="number"
                                        name="foodQuantity"
                                        id="foodQuantity"
                                        placeholder="e.g., 2"
                                        className={inputClass}
                                        defaultValue={foodQuantity}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="expiryDateTime">Expiry Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        name="expiryDateTime"
                                        id="expiryDateTime"
                                        className={inputClass}
                                        defaultValue={expiryDateTime ? expiryDateTime.slice(0, 16) : ''}
                                        required
                                    />
                                </div>
                            </div>

                            {/* --- Full-width fields --- */}
                            <div className="space-y-6 mt-6">
                                <div>
                                    <label className={labelClass} htmlFor="imageUrl">Image URL</label>
                                    <input
                                        type="text"
                                        name="imageUrl"
                                        id="imageUrl"
                                        placeholder="https://example.com/image.jpg"
                                        className={inputClass}
                                        defaultValue={imageUrl}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="availability">Food Status</label>
                                    <select
                                        name="availability"
                                        id="availability"
                                        className="select select-bordered w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-gray-100"
                                        defaultValue={availability}
                                        required
                                    >
                                        <option>Available</option>
                                        <option>Not Available</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="description">Additional Notes</label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        placeholder="e.g., 'Slightly spicy', 'Contains nuts'"
                                        className="textarea textarea-bordered w-full h-24 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-gray-100"
                                        defaultValue={description}
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary bg-emerald-600 hover:bg-emerald-700 text-white w-full mt-8 rounded-lg">
                                Update Food
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default UpdateFood;