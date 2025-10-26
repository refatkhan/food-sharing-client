import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom"; // Added for the "Browse" button

// --- Added icons for the new card design ---
import {
  IoLocationOutline,
  IoTimeOutline,
  IoPersonOutline,
  IoCalendarClearOutline
} from "react-icons/io5";

// --- Helper component to show a styled status badge ---
const StatusBadge = ({ status }) => {
  let colorClasses = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"; // Default: Requested/Pending

  if (status === 'Available') { // Or 'Confirmed'
    colorClasses = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
  } else if (status === 'Not Available') { // Or 'Delivered' / 'Cancelled'
    colorClasses = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colorClasses}`}>
      {status}
    </span>
  );
};

// --- Helper to format dates cleanly ---
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};


const MyRequestedFoods = () => {
  const { user, loading: loadingUser } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- All of your data fetching logic is unchanged ---
  useEffect(() => {
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

  // --- Styled Loading State ---
  if (loadingUser || loading) {
    return (
      <div className="text-center py-20 dark:text-gray-300">
        <p className="text-lg">Loading your requested foods...</p>
      </div>
    );
  }

  // --- Styled Error State (Keeping red for semantic error color) ---
  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  // --- Main Component Return ---
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- 1. Page Header --- */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight">
            My Requested Foods
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Track the status of all the food items you have requested from the community.
          </p>
        </div>

        {/* --- 2. Redesigned Content Area --- */}
        {requests.length === 0 ? (
          // --- Styled Empty State ---
          <div className="text-center py-10">
            <div className="bg-white dark:bg-gray-800 max-w-lg mx-auto p-8 rounded-lg shadow-md 
                                     border border-emerald-200 dark:border-emerald-700"> {/* --- CHANGE: Updated border color --- */}
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">No Requests Found</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">You haven’t requested any food yet.</p>
              <Link
                to="/available-foods" // Link to browse foods
                className="btn btn-primary bg-emerald-600 hover:bg-emerald-700 text-white mt-6 rounded-lg"
              >
                Browse Available Foods
              </Link>
            </div>
          </div>
        ) : (
          // --- 3. New Card List ---
          <div className="space-y-6">
            {requests.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row bg-white dark:bg-gray-800 
                                           border border-emerald-200 dark:border-emerald-700 rounded-lg shadow-lg overflow-hidden" // --- CHANGE: Updated border color ---
              >
                {/* Food Image */}
                <img
                  className="w-full md:w-64 h-48 md:h-auto object-cover"
                  src={item.imageUrl || 'https://i.imgur.com/gJt6gq0.png'} // Assumes imageUrl exists, adds fallback
                  alt={item.foodName}
                />

                {/* Food Details */}
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {item.foodName || "N/A"}
                    </h3>
                    {/* Assumes item.status or item.availability exists */}
                    <StatusBadge status={item.status || item.availability || "Requested"} />
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-gray-600 dark:text-gray-300">
                    <li className="flex items-center">
                      <IoPersonOutline className="w-5 h-5 mr-2 text-emerald-500" />
                      <strong>Donor:</strong><span className="ml-2">{item.userName || "N/A"}</span>
                    </li>
                    <li className="flex items-center">
                      <IoLocationOutline className="w-5 h-5 mr-2 text-emerald-500" />
                      <strong>Location:</strong><span className="ml-2">{item.location || "N/A"}</span>
                    </li>
                    <li className="flex items-center">
                      <IoTimeOutline className="w-5 h-5 mr-2 text-emerald-500" />
                      <strong>Expires:</strong><span className="ml-2">{formatDate(item.expireDate)}</span>
                    </li>
                    <li className="flex items-center">
                      <IoCalendarClearOutline className="w-5 h-5 mr-2 text-emerald-500" />
                      <strong>Requested:</strong><span className="ml-2">{formatDate(item.requestInfo?.requestDate)}</span>
                    </li>
                    _                                   </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyRequestedFoods;