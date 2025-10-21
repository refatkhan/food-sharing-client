import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Hero = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    // Animation variants for the container to orchestrate staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Animate children one by one
                delayChildren: 0.3,   // Start after a brief delay
            },
        },
    };

    // Animation variants for individual text/button elements
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    // A slightly different variant for the buttons to make them pop
    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut" } },
    };


    return (
        <section ref={ref} className="relative bg-gray-800 text-white min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="A happy family sharing a meal together"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-60"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4"
                    >
                        Don't Waste a Meal.
                        <br />
                        <span className="text-emerald-400">Make a Neighbor's Day.</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8"
                    >
                        Join our community in <span className="font-semibold text-white">Ashulia</span> to share your extra food, reduce waste, and help feed a family. It’s simple, free, and makes a real difference.
                    </motion.p>

                    <motion.div
                        variants={containerVariants} // This will stagger the two buttons inside
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <motion.a
                            href="/add-food"
                            variants={buttonVariants}
                            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(76, 175, 80, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto inline-block px-8 py-4 text-lg font-semibold text-white bg-emerald-600 rounded-lg shadow-lg hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 transition-all duration-300"
                        >
                            Share Food Now
                        </motion.a>

                        <motion.a
                            href="/all-food"
                            variants={buttonVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto inline-block px-8 py-4 text-lg font-semibold text-white bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-white/50 transition-all duration-300"
                        >
                            Find a Meal
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
