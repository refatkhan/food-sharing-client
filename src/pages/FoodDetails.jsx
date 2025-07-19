import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";

import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";

const FoodDetails = () => {
    const food = useLoaderData(); // Loaded from route loader
    const { user } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);
    const [notes, setNotes] = useState("");

    const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const handleRequest = async () => {
  const requestData = {
    foodId: food._id,
    foodName: food.foodName,
    imageUrl: food.imageUrl,
    donatorEmail: food.donatorEmail,
    donatorName: food.donatorName,
    userEmail: user?.email,
    requestDate: currentDate,
    pickupLocation: food.pickupLocation,
    expireDate: food.expireDate,
    notes: notes,
  };

  try {
    const res = await axios.patch(`http://localhost:3000/food/${food._id}`, requestData);
    if (res.data.modifiedCount > 0) {
      toast.success("Request successful!");
      setShowModal(false);
    }
  } catch (e) {
    console.log(e);
    toast.error("Request failed!");
  }
};


    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
            <img src={food.imageUrl} alt={food.foodName} style={{ width: "100%", borderRadius: "8px" }} />
            <h2>{food.foodName}</h2>
            <p><strong>Donator:</strong> {food.donatorName}</p>
            <p><strong>Email:</strong> {food.donatorEmail}</p>
            <p><strong>Pickup Location:</strong> {food.pickupLocation}</p>
            <p><strong>Expire Date:</strong> {food.expireDate}</p>

            <button onClick={() => setShowModal(true)} style={{ padding: "10px 20px", background: "#4CAF50", color: "white", border: "none", marginTop: "10px" }}>
                Request
            </button>

            {/* Simple Modal */}
            {showModal && (
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100%",
                    height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
                    justifyContent: "center", alignItems: "center"
                }}>
                    <div style={{ backgroundColor: "white", padding: "20px", width: "90%", maxWidth: "500px", borderRadius: "8px" }}>
                        <h3>Request This Food</h3>

                        <label>Food Name:</label>
                        <input type="text" value={food.foodName} readOnly /><br />

                        <label>Food ID:</label>
                        <input type="text" value={food._id} readOnly /><br />

                        <label>Donator Email:</label>
                        <input type="text" value={food.donatorEmail} readOnly /><br />

                        <label>Donator Name:</label>
                        <input type="text" value={food.donatorName} readOnly /><br />

                        <label>Your Email:</label>
                        <input type="text" value={user?.email} readOnly /><br />

                        <label>Request Date:</label>
                        <input type="text" value={currentDate} readOnly /><br />

                        <label>Pickup Location:</label>
                        <input type="text" value={food.pickupLocation} readOnly /><br />

                        <label>Expire Date:</label>
                        <input type="text" value={food.expireDate} readOnly /><br />

                        <label>Additional Notes:</label>
                        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} /><br />

                        <div style={{ marginTop: "10px" }}>
                            <button onClick={handleRequest} style={{ marginRight: "10px", background: "blue", color: "white", padding: "6px 12px" }}>Request</button>
                            <button onClick={() => setShowModal(false)} style={{ padding: "6px 12px" }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodDetails;
