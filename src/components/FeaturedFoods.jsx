import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router'
const FeaturedFoods = () => {
    const [featuredFoods, setFeaturedFoods] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/food-featured')
            .then(res => setFeaturedFoods(res.data))
            .catch(err => console.error("Error fetching featured foods:", err));
    }, []);
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                {featuredFoods.map((food) => {
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
                    } = food;
                    console.log(_id);
                    return (
                        <div key={_id} className="border rounded-lg p-4 shadow">
                            <img
                                src={imageUrl}
                                alt={foodName}
                                className="w-full h-48 object-cover rounded"
                            />
                            <h2 className="text-xl font-bold mt-2">{foodName}</h2>
                            <p>
                                <strong>Quantity:</strong> {foodQuantity}
                            </p>
                            <p>
                                <strong>Pickup:</strong> {location}
                            </p>
                            <p>
                                <strong>Expires:</strong>{" "}
                                {new Date(expiryDateTime).toLocaleString()}
                            </p>
                            <p>
                                <strong>Status:</strong> {availability}
                            </p>
                            <p>
                                <strong>post:</strong> {date}
                            </p>
                            <p>
                                <strong>Time:</strong> {time}
                            </p>
                            <p className="mt-2 text-gray-700">{description}</p>
                            <div className="mt-3 text-sm text-gray-600">
                                <p>
                                    <strong>Donor:</strong> {userName}
                                </p>
                                <p>
                                    <strong>Email:</strong> {userEmail}
                                </p>
                            </div>
                           <Link to={`/food-details/${_id}`}> view details </Link>
                        </div>
                    );
                })}
            </div>
            {/* Centered See More button outside grid */}
            <div className="flex justify-center mt-6">
                <Link to='/all-food'> view details </Link>
            </div>
        </>
    );

};

export default FeaturedFoods;