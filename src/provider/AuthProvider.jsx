import axios from "axios";
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
} from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const API_URL = "https://food-server-sooty.vercel.app";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- CORRECTED FUNCTIONS ---
    // Simply return the Firebase promise. Do not manage loading state here.
    const signUpWithEmail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider);
    };
    // --- END CORRECTED FUNCTIONS ---

    const updateUser = (userInfo) => {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, userInfo);
        }
        return Promise.reject("No user currently signed in to update profile.");
    };

    const removeUser = (userToDelete) => {
        if (userToDelete) {
            return deleteUser(userToDelete);
        }
        return Promise.reject("No user provided for deletion.");
    };

    const logOut = () => {
        // This is also not strictly necessary, as onAuthStateChanged will handle it,
        // but it's less critical than the login functions. Removing for consistency.
        return signOut(auth);
    };

    useEffect(() => {
        console.log("AuthProvider: Setting up listener.");
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log("AuthProvider: Auth state changed. User:", currentUser ? currentUser.email : null);
            setUser(currentUser);

            if (currentUser) {
                console.log("AuthProvider: User logged in. Verifying token with backend...");
                setLoading(true); // Set loading true for the backend check
                try {
                    const idToken = await currentUser.getIdToken(true);
                    console.log("AuthProvider: Got fresh ID token.");
                    await axios.get(`${API_URL}/verify-token`, {
                        headers: {
                            Authorization: `Bearer ${idToken}`
                        }
                    });
                    console.log("AuthProvider: Backend token verification successful.");
                } catch (error) {
                    console.error("AuthProvider: Backend token verification failed:", error.response?.data || error.message);
                    // You might want to log the user out here if backend verification is mandatory
                    // await signOut(auth);
                } finally {
                    console.log("AuthProvider: Setting loading false (after backend check).");
                    setLoading(false);
                }
            } else {
                // User is logged out
                console.log("AuthProvider: User logged out. Setting loading false.");
                setLoading(false);
            }
        });

        return () => {
            console.log("AuthProvider: Unsubscribing.");
            unsubscribe();
        };
    }, []);

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
            {!loading ? children : (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-emerald-500"></div>
                </div>
            )}
        </AuthContext.Provider>
    );
};

export default AuthProvider;