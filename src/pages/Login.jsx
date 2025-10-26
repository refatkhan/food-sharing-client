import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { AuthContext } from '../provider/AuthProvider'; // Ensure this path is correct
import { motion } from 'framer-motion';

// --- DEMO USER CREDENTIALS ---
const DEMO_EMAIL = "your_demo_email@example.com"; // <-- REPLACE
const DEMO_PASSWORD = "your_demo_password"; // <-- REPLACE

const Login = () => {
    // --- Existing Logic ---
    const { signInWithEmail, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoadingEmail, setIsLoadingEmail] = useState(false);
    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
    const [isLoadingDemo, setIsLoadingDemo] = useState(false);
    const [error, setError] = useState(null);

    const notifySuccess = () => toast.success("Log In Successful!");
    const notifyError = (message) => toast.error(message || "Login Failed!");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoadingEmail(true);
        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            await signInWithEmail(email, password);
            notifySuccess();
            navigate(location?.state || "/");
        } catch (err) {
            console.error("Email Login Error:", err);
            let friendlyMessage = "Wrong Credentials or Login Failed.";
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') { friendlyMessage = "Invalid email or password."; }
            else if (err.code === 'auth/too-many-requests') { friendlyMessage = "Access temporarily disabled due to too many failed attempts."; }
            else { friendlyMessage = err.message || friendlyMessage; }
            setError(friendlyMessage);
            notifyError(friendlyMessage);
        } finally {
            setIsLoadingEmail(false);
        }
    };

    const handleGoogleRegister = () => {
        setError(null);
        setIsLoadingGoogle(true);
        googleSignIn()
            .then(() => {
                notifySuccess();
                navigate(location?.state || "/");
            })
            .catch(err => {
                console.error("Google Sign In Error:", err);
                setError(err.message || "Google Sign In Failed.");
                notifyError(err.message || "Google Sign In Failed.");
            })
            .finally(() => {
                setIsLoadingGoogle(false);
            });
    };

    const handleDemoLogin = async () => {
        setError(null);
        setIsLoadingDemo(true);
        if (!DEMO_EMAIL || !DEMO_PASSWORD || DEMO_EMAIL === "your_demo_email@example.com") {
            toast.error("Demo credentials not configured.");
            console.error("Demo Login Error: DEMO_EMAIL or DEMO_PASSWORD not set");
            setIsLoadingDemo(false);
            return;
        }
        try {
            await signInWithEmail(DEMO_EMAIL, DEMO_PASSWORD);
            notifySuccess();
            navigate(location?.state || "/");
        } catch (err) {
            console.error("Demo Login Error:", err);
            let friendlyMessage = "Demo login failed.";
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') { friendlyMessage = "Demo account credentials incorrect or disabled."; }
            else { friendlyMessage = err.message || friendlyMessage; }
            setError(friendlyMessage);
            notifyError(friendlyMessage);
        } finally {
            setIsLoadingDemo(false);
        }
    };
    // --- End Existing Logic ---

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };
    const imageVariants = {
        hidden: { opacity: 0, x: -50, scale: 0.95 },
        visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
    };
    const formVariants = {
        hidden: { opacity: 0, x: 50, scale: 0.95 },
        visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
    };


    return (
        // Full page container with gradient
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-200 dark:from-gray-800 dark:via-gray-900 dark:to-emerald-900 py-12 px-4 sm:px-6 lg:px-8">
            {/* Two-Column Layout Container */}
            <div className="max-w-7xl w-full lg:grid lg:grid-cols-2 lg:gap-10 items-center">

                {/* Left Column: Branding/Illustration (Visible on lg screens) */}
                <motion.div
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    className="hidden lg:flex flex-col items-center justify-center p-8 text-center"
                >
                    {/* SharePlate Logo SVG */}
                    <svg className="w-40 h-40 text-emerald-600 dark:text-emerald-400 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                        <motion.path
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                            strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25v-8.25M12 4.875A2.625 2.625 0 1012 10.125 2.625 2.625 0 0012 4.875z" />
                        <motion.path
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ delay: 1.0, duration: 1.5, ease: "easeInOut" }}
                            strokeLinecap="round" strokeLinejoin="round" d="M12 10.125V19.5m-8.25-9.375h16.5" />
                    </svg>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">
                        Welcome to SharePlate
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
                        Connecting communities, reducing waste. Log in to share your surplus or find a meal.
                    </p>
                </motion.div>

                {/* Right Column: Login Form Card */}
                <motion.div
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 sm:p-10 w-full max-w-lg border border-gray-200 dark:border-gray-700/50 mx-auto" // Added mx-auto for mobile centering
                >
                    {/* Icon/Logo Area (Smaller for card) */}
                    <div className="flex items-center justify-center mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-emerald-100 to-green-200 dark:from-emerald-700/50 dark:to-green-800/50 mb-6 shadow border border-emerald-200 dark:border-emerald-600/50">
                        <svg className="h-8 w-8 text-emerald-600 dark:text-emerald-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                        </svg>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">
                        Welcome Back!
                    </h2>
                    <p className="text-center text-gray-500 dark:text-gray-400 mb-6 text-sm">
                        Log in or try our demo to continue.
                    </p>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-center">
                            <p className="text-sm font-medium text-red-700 dark:text-red-300">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email-login">
                                Email Address
                            </label>
                            <input type="email" name="email" id="email-login" autoComplete="email" className="block w-full px-4 py-3 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" placeholder="you@example.com" required />
                        </div>
                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password-login">
                                Password
                            </label>
                            <input type="password" name="password" id="password-login" autoComplete="current-password" className="block w-full px-4 py-3 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" placeholder="Your password" required />
                        </div>
                        {/* Submit Button */}
                        <button type="submit" disabled={isLoadingEmail || isLoadingGoogle || isLoadingDemo} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed transition duration-150 ease-in-out">
                            {isLoadingEmail ? (<> <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /* SVG Spinner */ ></svg> Signing In... </>) : ('Log In')}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center justify-center">
                        <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
                        <span className="px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Or</span>
                        <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
                    </div>

                    {/* Google Sign In Button */}
                    <button onClick={handleGoogleRegister} disabled={isLoadingEmail || isLoadingGoogle || isLoadingDemo} className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed transition duration-150 ease-in-out">
                        {isLoadingGoogle ? (<> <svg className="animate-spin -ml-1 mr-2 h-5 w-5 " /* SVG Spinner */ ></svg> Processing... </>) : (<> <FcGoogle className="h-5 w-5 mr-3" /> Continue with Google </>)}
                    </button>

                    {/* Demo Login Button */}
                    <div className="mt-4">
                        <button onClick={handleDemoLogin} disabled={isLoadingEmail || isLoadingGoogle || isLoadingDemo} className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm bg-gray-500 hover:bg-gray-600 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-offset-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transition duration-150 ease-in-out group">
                            {isLoadingDemo ? (<> <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" /* SVG Spinner */ ></svg> Logging In... </>) : (<> <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 opacity-80" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /> </svg> Join as Demo User </>)}
                        </button>
                    </div>

                    {/* Link to Sign Up */}
                    <p className="mt-8 text-sm text-gray-600 dark:text-gray-400 text-center">
                        Don’t have an account?{' '}
                        <Link to="/signup" className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 hover:underline">
                            Register here
                        </Link>
                    </p>
                </motion.div>

            </div>
        </div>
    );
};

export default Login;