import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const MyRequestedFoods = () => {
  const { user, loading: loadingUser } = useContext(AuthContext); // Assume loading state exists
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Wait for user loading to finish
    if (loadingUser) return;

    if (!user?.accessToken) {
      setError("No access token found");
      setLoading(false);
      return;
    }

    const fetchRequestedFoods = async () => {
      try {
        const res = await axios.get("https://food-server-sooty.vercel.app/requested-foods", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setRequests(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch requested foods", err);
        setError("Failed to load requested foods");
      } finally {
        setLoading(false);
      }
    };

    fetchRequestedFoods();
  }, [user, loadingUser]);

  if (loadingUser || loading) return <p>Loading your requested foods...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="relative overflow-x-auto mt-6 text-gray-800 dark:text-gray-100">
      <h2 className="text-2xl font-semibold mb-4">My Requested Foods</h2>
      {requests.length === 0 ? (
        <p>You haven’t requested any food yet.</p>
      ) : (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-gray-200">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-6 py-3">Food Name</th>
              <th className="px-6 py-3">Donator</th>
              <th className="px-6 py-3">Pickup Location</th>
              <th className="px-6 py-3">Expire Date</th>
              <th className="px-6 py-3">Request Date</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{item.foodName || "N/A"}</td>
                <td className="px-6 py-4">{item.userName || "N/A"}</td>
                <td className="px-6 py-4">{item.location || "N/A"}</td>
                <td className="px-6 py-4">
                  {item.expireDate
                    ? new Date(item.expireDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {item.requestInfo?.requestDate
                    ? new Date(item.requestInfo.requestDate).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyRequestedFoods;
