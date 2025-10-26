import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link if href="/volunteer" is an internal route

const GetInvolved = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    // Variants remain the same
    const textContainerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };
    const imageVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        // --- DARK THEME ADJUSTMENTS ---
        // Changed light background slightly, added darker background for dark mode
        <section id='involved' ref={ref} className="bg-emerald-50 dark:bg-gray-900 py-20 sm:py-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Image Column (No changes needed usually) */}
                    <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <img
                            src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Volunteers smiling and packing food donations"
                            className="rounded-2xl shadow-xl w-full h-full object-cover aspect-[4/3] md:aspect-auto" // Adjusted aspect ratio
                        />
                        {/* Optional decorative elements */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-100 to-green-200 dark:from-emerald-900/30 dark:to-green-900/30 rounded-full blur-xl opacity-30 dark:opacity-20 -z-10"></div>
                        <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-tr from-emerald-100 to-green-200 dark:from-emerald-900/30 dark:to-green-900/30 rounded-full blur-lg opacity-20 dark:opacity-10 -z-10"></div>
                    </motion.div>

                    {/* Text and CTA Column */}
                    <motion.div
                        variants={textContainerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {/* --- DARK THEME ADJUSTMENTS --- */}
                        <motion.h2
                            variants={itemVariants}
                            // Ensuring text color adapts
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight"
                        >
                            Become a Hunger Hero in Our <span className="text-emerald-600 dark:text-emerald-400">Community</span>
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            // Ensuring text color adapts
                            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
                        >
                            Our mission is powered by passionate people like you. By volunteering, you can help with food pickups, organize local drives, or simply spread the word in Ashulia. Every bit of help strengthens our community.
                        </motion.p>

                        <motion.div variants={itemVariants} className="mt-8">
                            <motion.custom
                                custom={Link}
                                to="/signin" // Changed from href
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block px-8 py-3 text-lg font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-gray-900 
                                           bg-emerald-600 text-white hover:bg-emerald-700 
                                           dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-all duration-300"
                            >
                                Learn More & Sign Up
                            </motion.custom>
                            
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default GetInvolved;