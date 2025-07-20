import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link, useLoaderData } from 'react-router';
import { toast } from 'react-toastify';
import { IoReturnDownBack } from "react-icons/io5";

const UpdateFood = () => {
    const { user } = useContext(AuthContext);
    const foodData = useLoaderData();

    const {
        _id,
        foodName,
        imageUrl,
        foodQuantity,
        location,
        expiryDateTime,
        description,
        availability,
        userEmail,
        userName,
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

    return (
        <div className="max-w-3xl mx-auto p-6 bg-green-200 rounded-lg shadow-md dark:bg-[#4DA8DA] text-gray-800 dark:text-gray-100">
            <div className='flex  justify-between items-center'>
                <h2 className="text-2xl font-bold mb-6 ">Update Food Info</h2>
                <Link to={"/browse-foods"} className="btn btn-md bg-green-600 text-white hover:bg-green-700 rounded-full">Back <IoReturnDownBack size={20} /> </Link>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">

                <div>
                    <label className="block font-medium mb-1" htmlFor="foodName">Food Name</label>
                    <input
                        type="text"
                        name="foodName"
                        id="foodName"
                        defaultValue={foodName}
                        placeholder="e.g., Rice, Chicken Curry"
                        className="input input-bordered w-full  bg-white text-gray-800 dark:text-gray-100"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1" htmlFor="location">Pick-Up Location</label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        placeholder="City, Area"
                        className="input input-bordered w-full  bg-white text-gray-800 dark:text-gray-100"
                        defaultValue={location}
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1" htmlFor="foodQuantity">Food Quantity</label>
                    <input
                        type="number"
                        name="foodQuantity"
                        id="foodQuantity"
                        placeholder="Enter amount in number"
                        className="input input-bordered w-full  bg-white text-gray-800 dark:text-gray-100"
                        defaultValue={foodQuantity}
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1" htmlFor="expiryDateTime">Expiry Date & Time</label>
                    <input
                        type="datetime-local"
                        name="expiryDateTime"
                        id="expiryDateTime"
                        className="input input-bordered w-full  bg-white text-gray-800 dark:text-gray-100"
                        defaultValue={expiryDateTime ? expiryDateTime.slice(0, 16) : ''}
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1" htmlFor="description">Additional Notes</label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Add description about food"
                        className="textarea textarea-bordered w-full"
                        defaultValue={description}
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block font-medium mb-1" htmlFor="availability">Food Status</label>
                    <select
                        name="availability"
                        id="availability"
                        className="select select-bordered w-full"
                        defaultValue={availability}
                        required
                    >
                        <option disabled>Select availability</option>
                        <option>Available</option>
                        <option>Not Available</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-1" htmlFor="imageUrl">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        id="imageUrl"
                        placeholder="https://example.com/image.jpg"
                        className="input input-bordered w-full  bg-white text-gray-800 dark:text-gray-100"
                        defaultValue={imageUrl}
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1" htmlFor="userEmail">Your Email</label>
                    <input
                        type="email"
                        name="userEmail"
                        id="userEmail"
                        value={user?.email}
                        readOnly
                        className="input input-bordered w-full  bg-white text-gray-800 dark:text-gray-100"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1" htmlFor="userName">Your Name</label>
                    <input
                        type="text"
                        name="userName"
                        id="userName"
                        value={user?.displayName}
                        readOnly
                        className="input input-bordered w-full  bg-white text-gray-800 dark:text-gray-100"
                    />
                </div>

                {/* You can optionally show date/time if needed */}
                <div className="text-gray-600 text-sm">
                    <p>Added on: {date} at {time}</p>
                </div>

                <button type="submit" className="btn bg-green-800 text-white w-full mt-4">
                    Update Food
                </button>
            </form>
        </div>
    );
};

export default UpdateFood;
