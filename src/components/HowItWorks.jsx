import React, { useRef } from "react";
import { motion, useInView } from 'framer-motion';

const steps = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
                <circle cx="12" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M2 21v-2a4 4 0 0 1 3-3.87" />
            </svg>
        ),
        title: "Create Your Account",
        description: "Quickly sign up or log in to join our community of food sharers and receivers.",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
        ),
        title: "Share or Find Food",
        description: "Easily post your surplus food with details and photos, or browse available local listings.",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 2 2.1 12.5A2 2 0 0 0 7 16h10a2 2 0 0 0 1.9-1.5L21 2Z" />
                <path d="M3 22h18" />
            </svg>
        ),
        title: "Arrange Pickup",
        description: "Use our secure platform to connect with others and coordinate a safe and convenient pickup.",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 10v12" />
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a2 2 0 0 1 1.79 1.11L15 5.88Z" />
            </svg>
        ),
        title: "Make a Difference",
        description: "Enjoy your meal or the satisfaction of helping, knowing you've reduced food waste.",
    },
];

export default function HowItWorks() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    // Parent container variants for staggering
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15, // Stagger the children cards
                delayChildren: 0.2, // Small delay before starting
            }
        }
    };

    // Variants for each card
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        // Section using standard background and padding
        <section id="works" ref={ref} className="bg-gray-50 dark:bg-gray-900/50 py-20 sm:py-28">
            {/* Max-width container for alignment */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight">
                        Get Started in <span className="text-emerald-500">4 Easy Steps</span>
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                        Joining our food sharing community is simple, fast, and rewarding. Here’s how you can start making an impact today.
                    </p>
                </motion.div>

                {/* Container for the steps and connecting line */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="relative" // Relative positioning for the absolute line
                >
                    {/* The connecting line - visible on larger screens */}
                    <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700/60"></div>
                    {/* Gradient overlay for effect */}
                    <div className="hidden lg:block absolute top-10 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300 dark:via-emerald-700 to-transparent"></div>

                    {/* Grid layout for the step cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 relative"> {/* Ensure grid is relative */}
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                variants={cardVariants}
                                // Card styling
                                className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 relative z-10" // Added z-10 to keep cards above line
                            >
                                {/* Icon and Number Container */}
                                <div className="relative mb-6">
                                    {/* Outer Circle */}
                                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-gray-800">
                                        {/* Inner Circle */}
                                        <div className="w-16 h-16 bg-emerald-200 dark:bg-emerald-900 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                            {/* Icon */}
                                            {step.icon}
                                        </div>
                                    </div>
                                    {/* Number Badge */}
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-800 dark:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center text-sm font-bold border-4 border-white dark:border-gray-800">
                                        {i + 1}
                                    </div>
                                </div>
                                {/* Text Content */}
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-grow">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}