import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddFood = () => {
    const notify = () => toast.success("add Successful");
    const { user } = useContext(AuthContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const foodData = Object.fromEntries(form);
        const now = new Date();

        // Separate fields
        foodData.date = now.toISOString().split("T")[0]; // "2025-07-18"
        foodData.time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }); // "06:15 PM"
        axios.post("https://food-server-sooty.vercel.app/add-food", foodData)
            .then((res) => {
                if (res.data.insertedId) {
                    notify()
                }
            })
            .catch((err) => {
                console.error("Error submitting food:", err);
            });

        e.target.reset();
    };
    return (
        <div>
            <div className="max-w-3xl mx-auto p-6 bg-green-200 rounded-lg shadow-md dark:bg-[#4DA8DA] text-gray-800 dark:text-gray-100">
                <h2 className="text-2xl font-bold mb-6">Add Your Remain Food</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block font-medium mb-1" htmlFor="title">Food Name</label>
                        <input
                            type="text"
                            name="foodName"
                            id="foodName"
                            placeholder='rice , chiken curry'
                            className="input input-bordered w-full bg-white text-gray-800 dark:text-gray-100 "
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
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1" htmlFor="rent">Food Quantity</label>
                        <input
                            type="number"
                            name="foodQuantity"
                            id="foodQuantity"
                            placeholder="Enter amount in number"
                            className="input input-bordered w-full  bg-white text-gray-800 dark:text-gray-100"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1" htmlFor="description">Additional Notes</label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="add description about foods"
                            className="textarea textarea-bordered w-full  bg-white text-gray-800 dark:text-gray-100"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block font-medium mb-1" htmlFor="contact">Contact Info</label>
                        <input
                            type="text"
                            name="contactInfo"
                            id="contactInfo"
                            placeholder="Phone number, email, etc."
                            className="input input-bordered w-full  bg-white text-gray-800 dark:text-gray-100"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1" htmlFor="availability">Food Status</label>
                        <select name="availability" id="availability" className="select select-bordered w-full bg-white text-gray-800 dark:text-gray-100" required>
                            <option disabled selected>Select availability</option>
                            <option>Available</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium mb-1" htmlFor="imageUrl">Image Url</label>
                        <input type="text"
                            name='imageUrl'
                            id='imageUrl'
                            placeholder='https://i.ibb.co/4ZkCjr4j/photo-1609139027234-57570f43f692.jpg'
                            className="input input-bordered w-full  bg-white text-gray-800 dark:text-gray-100"
                            required />
                    </div>
                    <div>
                        <label className="block font-medium mb-1" htmlFor="email">Your Email</label>
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
                        <label className="block font-medium mb-1" htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            value={user?.displayName}
                            readOnly
                            className="input input-bordered w-full   bg-white text-gray-800 dark:text-gray-100"
                        />
                    </div>

                    <button type="submit" className="btn bg-green-800 w-full mt-4 dark:bg-[#1565C0] text-[#F5F5F5]">
                        Submit
                    </button>
                </form>
            </div>

        </div>
    );

};

export default AddFood;