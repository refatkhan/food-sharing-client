import React, { use } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../provider/AuthProvider';

const Login = () => {
    const { signInWithEmail, googleSignIn } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const notify = () => toast.success("Log In Successful");
    const notify2 = () => toast.error("Wrong Credentials");

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInWithEmail(email, password)
            .then(() => {
                notify();
                navigate(location?.state || "/");
            })
            .catch(() => {
                notify2();
            });
    };

    const handleGoogleRegister = () => {
        googleSignIn()
            .then(() => {
                notify();
                navigate(location?.state || "/");
            })
            .catch(err => {
                alert(err);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:bg-[#294C4C] px-4 py-12">
            <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full">
                <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-200 to-green-400 shadow-inner flex items-center justify-center">
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
                </div>

                <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">
                    Welcome Back
                </h2>

                <form onSubmit={handleLogin} className="space-y-5">
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
                            placeholder="Your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn w-full bg-green-600 text-white hover:bg-green-700 rounded-full"
                    >
                        Log In
                    </button>
                </form>

                <div className="mt-5">
                    <button
                        onClick={handleGoogleRegister}
                        className="flex items-center justify-center w-full gap-3 border border-gray-300 py-2 px-4 rounded-full text-gray-800 bg-white hover:bg-gray-100 transition"
                    >
                        <FcGoogle className="text-xl" />
                        <span>Continue with Google</span>
                    </button>
                </div>

                <p className="mt-6 text-sm text-gray-600 text-center">
                    Don’t have an account?{' '}
                    <Link
                        to="/signup"
                        className="text-green-700 font-semibold hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
