import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const MyFoodRequest = () => {
  const { user } = useContext(AuthContext); // optionally receive user from context
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.accessToken || !user?.email) {
      setLoading(false);
      return;
    }

    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/my-requests?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        setRequests(res.data);
      } catch (err) {
        setError("Failed to fetch food requests");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  if (loading) return <p>Loading your food requests...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>My Food Requests</h2>
      {requests.length === 0 ? (
        <p>You have no food requests.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Donator Name</th>
              <th>Pickup Location</th>
              <th>Expire Date</th>
              <th>Request Date</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.requestInfo?.foodName}</td>
                <td>{req.requestInfo?.donatorName}</td>
                <td>{req.requestInfo?.pickupLocation}</td>
                <td>
                  {new Date(req.requestInfo?.expireDate).toLocaleDateString()}
                </td>
                <td>
                  {new Date(req.requestInfo?.requestDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyFoodRequest;
