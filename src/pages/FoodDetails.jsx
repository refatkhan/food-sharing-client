import React from 'react';
import { useLoaderData } from 'react-router';

const FoodDetails = () => {
    const foodData = useLoaderData()
    console.log(foodData);
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
    return (
        <div>
                
        </div>
    );
};

export default FoodDetails;