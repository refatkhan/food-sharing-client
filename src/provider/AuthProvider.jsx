import axios from "axios"; // Re-import axios
import {
    createUserWithEmailAndPassword,
    deleteUser,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    // No need to import getIdToken directly here, it's on the user object
} from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config'; // Ensure path is correct

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider(); // Define provider once

// Define your backend URL
const API_URL = "https://food-server-sooty.vercel.app";

const AuthProvider = ({ children }) => {
    // Initialize user state to null
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUpWithEmail = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInWithEmail = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const updateUser = (userInfo) => {
         // Ensure auth.currentUser exists before updating
        if (auth.currentUser) {
           return updateProfile(auth.currentUser, userInfo);
        }
       return Promise.reject("No user currently signed in to update profile.");
    };

    const removeUser = (userToDelete) => {
        // deleteUser requires the user object
        if (userToDelete) {
           return deleteUser(userToDelete);
        }
        return Promise.reject("No user provided for deletion.");
    };

    const logOut = () => {
        setLoading(true); // Consider if loading state is needed here
        return signOut(auth);
    };

    useEffect(() => {
        console.log("AuthProvider: Setting up listener.");
        // Make the callback async to use await for getIdToken
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log("AuthProvider: Auth state changed. User:", currentUser ? currentUser.email : null);
            setUser(currentUser); // Set Firebase user state immediately

            // --- JWT Verification Step ---
            if (currentUser) {
                console.log("AuthProvider: User logged in. Verifying token with backend...");
                try {
                    // Get a FRESH Firebase ID token forcing refresh
                    const idToken = await currentUser.getIdToken(true);
                    console.log("AuthProvider: Got fresh ID token.");

                    // Make the call to your backend verification endpoint
                    // Ensure '/verify-token' exists on your backend and uses verifyFirebaseToken middleware
                    await axios.get(`${API_URL}/verify-token`, {
                        headers: {
                            Authorization: `Bearer ${idToken}` // Send the fresh token
                        }
                    });
                    console.log("AuthProvider: Backend token verification successful.");

                } catch (error) {
                    // Handle verification failure
                    console.error("AuthProvider: Backend token verification failed:", error.response?.data || error.message);
                    // IMPORTANT: Decide how to handle this failure.
                    // Option 1: Log out the user if the backend rejects the token
                    // await signOut(auth); // This would re-trigger onAuthStateChanged with null
                    // setUser(null); // Force user state to null if signout isn't immediate

                    // Option 2: Allow the app to continue but maybe show an error/warning
                    // For now, we'll just log the error and proceed to stop loading.
                } finally {
                    // **CRITICAL**: Set loading false *after* the async verification attempt completes
                    console.log("AuthProvider: Setting loading false (after backend check).");
                    setLoading(false);
                }
            } else {
                // User is logged out, no backend call needed.
                console.log("AuthProvider: User logged out. Setting loading false.");
                setLoading(false); // Make sure loading stops when logged out too
            }
        });

        // Cleanup function
        return () => {
            console.log("AuthProvider: Unsubscribing.");
            unsubscribe();
        };
    }, []); // Empty dependency array ensures this runs only once

    const authInfo = {
        user,
        loading,
        signUpWithEmail,
        signInWithEmail,
        logOut,
        googleSignIn,
        updateUser,
        removeUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {/* Render children only after initial loading is complete */}
            { !loading ? children : (
                 <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                   <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-emerald-500"></div>
                </div>
            ) }
        </AuthContext.Provider>
    );
};

export default AuthProvider;

