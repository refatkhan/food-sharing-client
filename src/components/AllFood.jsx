import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const AllFood = () => {

    const [foods, setFoods] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/all-foods")
            .then((res) => {
                console.log(res);
                const data = res.data;  // ✅ Destructuring if needed: const { data } = res;
                setFoods(data);
            })
            .catch((error) => {
                console.error("Error fetching food data:", error);
            });
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
            {foods.map((food) => {
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
                    time
                    
                } = food;

                return (
                    <div key={_id} className="border rounded-lg p-4 shadow">
                        <img src={imageUrl} alt={foodName} className="w-full h-48 object-cover rounded" />
                        <h2 className="text-xl font-bold mt-2">{foodName}</h2>
                        <p><strong>Quantity:</strong> {foodQuantity}</p>
                        <p><strong>Pickup:</strong> {location}</p>
                        <p><strong>Expires:</strong> {new Date(expiryDateTime).toLocaleString()}</p>
                        <p><strong>Status:</strong> {availability}</p>
                        <p><strong>post:</strong> {date}</p>
                        <p><strong>Status:</strong> {time}</p>
                        <p className="mt-2 text-gray-700">{description}</p>
                        <div className="mt-3 text-sm text-gray-600">
                            <p><strong>Donor:</strong> {userName}</p>
                            <p><strong>Email:</strong> {userEmail}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );


};

export default AllFood;