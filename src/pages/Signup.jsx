import React, { useContext, useState } from 'react'; // Changed use to useContext
import { useLocation, useNavigate, Link } from 'react-router-dom'; // Corrected import
import { AuthContext } from '../provider/AuthProvider'; // Ensure this path is correct
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const SignUp = () => {
    // --- Existing Logic ---
    const { signUpWithEmail, updateProfileInfo, googleSignIn } = useContext(AuthContext); // Changed use to useContext
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false); // Added separate loading for Google
    const [error, setError] = useState(null);

    const notifySuccess = () => toast.success("Sign Up Successful!");
    const notifyError = (message) => toast.error(message || "Sign Up Failed!");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const displayName = e.target.displayName.value;
        const email = e.target.email.value;
        const photoURL = e.target.photoURL.value || '';
        const password = e.target.password.value;

        try {
            const userCredential = await signUpWithEmail(email, password);
            if (userCredential?.user) {
                await updateProfileInfo(displayName, photoURL);
                notifySuccess();
                navigate(location?.state || "/");
            } else {
                throw new Error("User registration did not return a user object.");
            }
        } catch (err) {
            console.error("Registration Error:", err);
            let friendlyMessage = "An error occurred during registration.";
            if (err.code === 'auth/email-already-in-use') { friendlyMessage = "This email address is already in use."; }
            else if (err.code === 'auth/weak-password') { friendlyMessage = "Password is too weak. Please use at least 6 characters."; }
            else { friendlyMessage = err.message || friendlyMessage; }
            setError(friendlyMessage);
            notifyError(friendlyMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleRegister = () => {
        setError(null);
        setIsLoadingGoogle(true); // Start Google loading
        googleSignIn()
            .then((result) => {
                notifySuccess();
                navigate(location?.state || "/");
            })
            .catch(err => {
                console.error("Google Sign In Error:", err);
                setError(err.message || "Google Sign In Failed.");
                notifyError(err.message || "Google Sign In Failed.");
            })
            .finally(() => {
                setIsLoadingGoogle(false); // Stop Google loading
            });
    };
    // --- End Existing Logic ---

    // Animation Variants (Similar to Login)
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
        // Full page container
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
                        Join the SharePlate Community
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
                        Become a part of our mission to reduce food waste and support neighbors in need.
                    </p>
                </motion.div>

                {/* Right Column: Sign Up Form Card */}
                <motion.div
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 sm:p-10 w-full max-w-lg border border-gray-200 dark:border-gray-700/50 mx-auto"
                >
                    {/* Icon */}
                    <div className="flex items-center justify-center mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-emerald-100 to-green-200 dark:from-emerald-700/50 dark:to-green-800/50 mb-6 shadow border border-emerald-200 dark:border-emerald-600/50">
                        <svg className="h-8 w-8 text-emerald-600 dark:text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                        Create Your Account
                    </h2>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-center">
                            <p className="text-sm font-medium text-red-700 dark:text-red-300">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleRegister} className="space-y-5">
                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="displayName">
                                Full Name
                            </label>
                            <input type="text" name="displayName" id="displayName" className="block w-full px-4 py-3 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" placeholder="Your Full Name" required />
                        </div>
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
                                Email Address
                            </label>
                            <input type="email" name="email" id="email" autoComplete="email" className="block w-full px-4 py-3 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" placeholder="you@example.com" required />
                        </div>
                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">
                                Password
                            </label>
                            <input type="password" name="password" id="password" autoComplete="new-password" className="block w-full px-4 py-3 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" placeholder="Min. 6 characters (A-Z, a-z)" required pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long." />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Min. 6 characters, 1 uppercase, 1 lowercase.</p>
                        </div>
                        {/* Photo URL Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="photoURL">
                                Photo URL (Optional)
                            </label>
                            <input type="url" name="photoURL" id="photoURL" className="block w-full px-4 py-3 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" placeholder="https://example.com/your-photo.jpg" />
                        </div>
                        {/* Submit Button */}
                        <button type="submit" disabled={isLoading || isLoadingGoogle} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed transition duration-150 ease-in-out">
                            {isLoading ? (<> <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /* SVG Spinner */ ></svg> Creating Account... </>) : ('Create Account')}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center justify-center">
                        <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
                        <span className="px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Or</span>
                        <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
                    </div>

                    {/* Google Sign In Button */}
                    <button onClick={handleGoogleRegister} disabled={isLoading || isLoadingGoogle} className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed transition duration-150 ease-in-out">
                        {isLoadingGoogle ? (<> <svg className="animate-spin -ml-1 mr-2 h-5 w-5 " /* SVG Spinner */ ></svg> Processing... </>) : (<> <FcGoogle className="h-5 w-5 mr-3" /> Sign up with Google </>)}
                    </button>

                    {/* Link to Login */}
                    <p className="mt-8 text-sm text-gray-600 dark:text-gray-400 text-center">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 hover:underline">
                            Log in
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default SignUp;