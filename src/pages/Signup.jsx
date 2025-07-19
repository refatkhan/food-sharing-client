import React, { use } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';

const SignUp = () => {
    const { signUpWithEmail, updateProfileInfo, googleSignIn } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const notify = () => toast.success("Log In Successful");

    const handleRegister = (e) => {
        e.preventDefault();
        const displayName = e.target.displayName.value;
        const email = e.target.email.value;
        const photoURL = e.target.photoURL.value;
        const password = e.target.password.value;

        signUpWithEmail(email, password).then(() => updateProfileInfo(displayName, photoURL));
        if (signUpWithEmail) {
            notify();
            navigate(location?.state || "/");
        }
    };

    const handleGoogleRegister = () => {
        googleSignIn().then(() => {
            navigate(location?.state || "/");
        }).catch(err => {
            alert(err);
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#D4FC79] to-[#96E6A1] py-12 px-4">
            <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md transform transition-all duration-300 hover:scale-[1.01]">
                <div className="flex items-center justify-center mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-green-200 to-green-400 mb-6 shadow-inner">
                    <svg
                        className="h-12 w-12 text-green-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                </div>
                <h2 className="text-3xl font-extrabold mb-8 text-center text-green-700">
                    Create an Account
                </h2>
                <form onSubmit={handleRegister} className="space-y-6 w-full">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="displayName"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="hello@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Password"
                            required
                            pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}"
                            title="Must contain one uppercase and lowercase letter, and at least 6 or more characters"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Photo URL
                        </label>
                        <input
                            type="text"
                            name="photoURL"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="https://photo-url.com"
                        />
                    </div>
                    <button type="submit" className="btn bg-green-600 hover:bg-green-700 text-white w-full rounded-full transition">
                        Register
                    </button>
                </form>
                <button
                    onClick={handleGoogleRegister}
                    className="flex items-center gap-3 justify-center mt-5 w-full py-2 px-4 border border-gray-300 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition"
                >
                    <FcGoogle className="text-xl" />
                    <span>Sign in with Google</span>
                </button>
                <p className="mt-6 text-sm text-gray-600 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-700 font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
