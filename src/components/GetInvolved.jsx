import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion'; // Import motion

const GetInvolved = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    // Variants for the container to orchestrate staggered animations for the text content
    const textContainerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2,
            },
        },
    };

    // Variants for individual text/button elements
    const itemVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    // Variant for the image column
    const imageVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section ref={ref} className="bg-emerald-50 dark:bg-emerald-900/20 py-20 sm:py-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Image Column */}
                    <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <img
                            src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Volunteers smiling and packing food donations"
                            className="rounded-2xl shadow-xl w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Text and CTA Column */}
                    <motion.div
                        variants={textContainerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight"
                        >
                            Become a Hunger Hero in Our <span className="text-emerald-500">Community</span>
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
                        >
                            Our mission is powered by passionate people like you. By volunteering, you can help with food pickups, organize local drives, or simply spread the word in Ashulia. Every bit of help strengthens our community.
                        </motion.p>

                        <motion.div variants={itemVariants} className="mt-8">
                            {/* --- Ensure this is motion.a --- */}
                            <motion.a
                                href="/volunteer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gray-800 rounded-lg shadow-lg hover:bg-black dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-600 transition-all duration-300"
                            >
                                Learn More & Sign Up
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default GetInvolved;

