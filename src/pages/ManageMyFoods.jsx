import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router";
const ManageMyFoods = () => {
    const { user } = useContext(AuthContext);
    const [myFoods, setMyFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        axios
            .get(`https:/food-server-sooty.vercel.app/foods?email=${user.email}`)
            .then((res) => {
                setMyFoods(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch user's foods:", err);
                setLoading(false);
            });
    }, [user]);


    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this food?")) return;

        axios
            .delete(`https:/food-server-sooty.vercel.app/food/${id}`)
            .then((res) => {
                if (res.data.deletedCount > 0) {
                    alert("Food deleted successfully.");
                    setMyFoods((prevFoods) => prevFoods.filter((food) => food._id !== id));
                } else {
                    alert("Failed to delete the food.");
                }
            })
            .catch((err) => {
                console.error("Error deleting food:", err);
                alert("Something went wrong while deleting.");
            });
    };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-6">My Posted Foods</h2>

            {myFoods.length === 0 ? (
                <p className="text-gray-500">You have not posted any foods yet.</p>
            ) : (
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Food Name</th>
                                <th scope="col" className="px-6 py-3">Location</th>
                                <th scope="col" className="px-6 py-3">Quantity</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myFoods.map((food) => (
                                <tr
                                    key={food._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {food.foodName}
                                    </th>
                                    <td className="px-6 py-4">{food.location}</td>
                                    <td className="px-6 py-4">{food.foodQuantity}</td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <Link
                                            to={`/update-food/${food._id}`}
                                            onClick={() => handleEdit(food._id)}
                                            className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(food._id)}
                                            className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageMyFoods;
