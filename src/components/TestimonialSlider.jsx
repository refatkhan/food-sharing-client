import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
    {
        quote: "This platform is a lifesaver. I've found fresh, healthy food for my family during tough times. The sense of community is just incredible.",
        author: "Sarah M.",
        role: "Recipient",
        avatar: "https://i.pravatar.cc/150?u=sarah-m"
    },
    {
        quote: "I absolutely love how easy it is to donate food here. Knowing my extra groceries are helping someone in my own neighborhood feels amazing.",
        author: "Raj P.",
        role: "Donor",
        avatar: "https://i.pravatar.cc/150?u=raj-p"
    },
    {
        quote: "The featured foods section always has fantastic options. I’ve discovered so many generous local donors and tried some delicious meals through this site.",
        author: "Emily R.",
        role: "Community Member",
        avatar: "https://i.pravatar.cc/150?u=emily-r"
    },
    {
        quote: "This project is genuinely changing lives by reducing waste and feeding people. It's a powerful win-win for everyone involved in the community.",
        author: "Ahmed K.",
        role: "Volunteer",
        avatar: "https://i.pravatar.cc/150?u=ahmed-k"
    },
    {
        quote: "I was amazed at how quickly I could request food and arrange a pickup. The process is so simple and respectful. Truly a vital service.",
        author: "Lina T.",
        role: "Recipient",
        avatar: "https://i.pravatar.cc/150?u=lina-t"
    },
];

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 500 : -500,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 500 : -500,
        opacity: 0,
    }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

export default function TestimonialSlider() {
    const [[page, direction], setPage] = useState([0, 0]);
    const ref = useRef(null);

    const paginate = (newDirection) => {
        let newPage = page + newDirection;
        if (newPage < 0) {
            newPage = testimonials.length - 1;
        } else if (newPage >= testimonials.length) {
            newPage = 0;
        }
        setPage([newPage, newDirection]);
    };

    // Autoplay functionality
    useEffect(() => {
        const interval = setInterval(() => {
            paginate(1);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval);
    }, [page]);


    return (
        <section ref={ref} className="bg-gray-50 dark:bg-gray-950 py-20 sm:py-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight">
                        Voices of Our <span className="text-emerald-500">Community</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        See how sharing food is making a real impact on the lives of people right in your neighborhood.
                    </p>
                </motion.div>

                {/* --- FIX IS HERE --- */}
                {/* Removed 'max-w-4xl' so it now fills the 'max-w-7xl' parent, just like the FAQ content does */}
                <div className="relative mx-auto h-80 sm:h-72 flex items-center justify-center">
                    <button onClick={() => paginate(-1)} className="absolute z-10 left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-white"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={page}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);
                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            className="absolute w-full p-2"
                        >
                            {/* NOTE: With the wider container, you might want to adjust the card's width here. */}
                            {/* For example, add 'max-w-4xl mx-auto' to this div if you don't want the card to be 'max-w-7xl' wide. */}
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700/50 max-w-4xl mx-auto">
                                <p className="text-lg italic text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-center">
                                    <span className="text-5xl text-emerald-300 dark:text-emerald-700/50 font-serif leading-none absolute top-4 left-6">“</span>
                                    {testimonials[page].quote}
                                </p>
                                <div className="flex items-center justify-center">
                                    <img className="w-12 h-12 rounded-full object-cover mr-4" src={testimonials[page].avatar} alt={testimonials[page].author} />
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-white">{testimonials[page].author}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonials[page].role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <button onClick={() => paginate(1)} className="absolute z-10 right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-white"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                </div>

                <div className="flex justify-center mt-8 space-x-3">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setPage([index, index > page ? 1 : -1])}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === page ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}