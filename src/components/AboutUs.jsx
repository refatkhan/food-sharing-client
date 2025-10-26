import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Reusable animation variants
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } }, // Custom ease
};


const AboutUs = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 }); // Trigger when 20% visible

    return (
        // Main section with the ID and background styling
        <motion.section
            id="about" // Section ID added here
            ref={ref}
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="bg-white dark:bg-gray-900 py-20 sm:py-28 overflow-hidden"
        >
            {/* Consistent width and padding container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Column: Text Content */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight leading-tight"
                        >
                            Our Mission: <br className="hidden sm:block" />
                            <span className="text-emerald-600 dark:text-emerald-400">Connecting Neighbors, Reducing Waste</span>
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                        >
                            SharePlate was born from a simple idea: **good food shouldn't go to waste when people in our community go hungry.** We saw perfectly good meals and groceries being discarded while neighbors faced food insecurity, right here in Ashulia.
                        </motion.p>

                        <motion.p
                            variants={itemVariants}
                            className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                        >
                            Our platform provides a simple, safe, and dignified way for individuals and families to share their surplus food with others nearby. We aim to build a stronger, more connected community by fostering kindness and tackling food waste head-on.
                        </motion.p>

                        <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row gap-4">
                            <a  href='#works'
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out">
                                Learn How It Works
                            </a>
                            <a href='#involved'
                                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-emerald-700 dark:text-emerald-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out">
                                Get Involved
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Image */}
                    <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="relative"
                    >
                        {/* You can replace this image URL */}
                        <img
                            src="https://images.pexels.com/photos/6995204/pexels-photo-6995204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Community members happily sharing food"
                            className="rounded-2xl shadow-xl w-full h-full object-cover aspect-[4/3] lg:aspect-square"
                        />
                        {/* Optional: Add a subtle decorative element */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-100 to-green-200 dark:from-emerald-900/50 dark:to-green-900/50 rounded-full blur-xl opacity-50 -z-10"></div>
                        <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-tr from-emerald-100 to-green-200 dark:from-emerald-900/50 dark:to-green-900/50 rounded-full blur-lg opacity-40 -z-10"></div>
                    </motion.div>

                </div>
            </div>
        </motion.section>
    );
};

// Don't forget to import Link if you use it inside the component:
import { Link } from 'react-router-dom';

export default AboutUs;