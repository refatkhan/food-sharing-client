import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CallToAction = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    // Variants for the container to orchestrate staggered animations
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    // Variants for individual text/button elements
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };

    return (
        <section ref={ref} className="bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
                <div className="relative bg-gray-800 dark:bg-gray-950 rounded-2xl shadow-2xl overflow-hidden p-8 md:p-12 text-center">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full" />
                    <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full" />

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="relative z-10"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
                        >
                            Ready to Make a Difference in <span className="text-emerald-400">Ashulia</span>?
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
                        >
                            Whether you have food to share or need a meal for your family, you can get started in just a few clicks. Join the SharePlate community and be part of the solution.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <motion.a
                                href="/add-food"
                                whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(76, 175, 80, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto inline-block px-8 py-4 text-lg font-semibold text-white bg-emerald-600 rounded-lg shadow-lg hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 transition-all duration-300"
                            >
                                Share Your Extra Food
                            </motion.a>

                            <motion.a
                                href="/all-food"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto inline-block px-8 py-4 text-lg font-semibold text-gray-900 bg-white rounded-lg shadow-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-white/50 transition-all duration-300"
                            >
                                Find a Meal Nearby
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
