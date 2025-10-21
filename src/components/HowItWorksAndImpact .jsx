import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

// A dedicated Counter component using Framer Motion for the number animation
function AnimatedCounter({ endValue, suffix }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView && ref.current) {
            const controls = animate(0, endValue, {
                duration: 2.5,
                ease: "easeOut",
                onUpdate(value) {
                    // Directly update the node's text content for performance
                    ref.current.textContent = Math.round(value).toLocaleString();
                }
            });
            // Cleanup function to stop the animation if the component unmounts
            return () => controls.stop();
        }
    }, [endValue, isInView]);

    return <span ref={ref}>0</span>;
}

// SVG Illustrations for each step
const Illustrations = {
    Share: () => (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-emerald-500">
            <g transform="translate(100 100)">
                <path d="M54.1,-37.9C67.9,-20.5,75.2,4.8,69.5,25.5C63.8,46.2,45.1,62.4,24.9,68.9C4.7,75.4,-17,72.2,-36.5,60.2C-56.1,48.2,-73.5,27.4,-75.8,4.7C-78.1,-18,-65.3,-32.7,-50.2,-46.8C-35.1,-61,-17.5,-74.6,2,-76.1C21.5,-77.6,43,-67,54.1,-52.9" fill="currentColor" opacity="0.1"></path>
                <path d="M-20, -60 L-20, -20 L-60, -20 L-60, 20 L-20, 20 L-20, 60 L20, 60 L20, 20 L60, 20 L60, -20 L20, -20 L20, -60 Z" fill="none" stroke="currentColor" strokeWidth="4" transform="rotate(45) scale(0.6)"></path>
                <text x="-5" y="5" fontFamily="Arial" fontSize="50" fontWeight="bold" textAnchor="middle" fill="currentColor">🍲</text>
            </g>
        </svg>
    ),
    Browse: () => (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-emerald-500">
            <g transform="translate(100 100)">
                <path d="M54.1,-37.9C67.9,-20.5,75.2,4.8,69.5,25.5C63.8,46.2,45.1,62.4,24.9,68.9C4.7,75.4,-17,72.2,-36.5,60.2C-56.1,48.2,-73.5,27.4,-75.8,4.7C-78.1,-18,-65.3,-32.7,-50.2,-46.8C-35.1,-61,-17.5,-74.6,2,-76.1C21.5,-77.6,43,-67,54.1,-52.9" fill="currentColor" opacity="0.1"></path>
                <circle cx="0" cy="0" r="40" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <line x1="35" y1="35" x2="60" y2="60" stroke="currentColor" strokeWidth="4"></line>
                <text x="0" y="5" fontFamily="Arial" fontSize="40" textAnchor="middle" fill="currentColor">🔍</text>
            </g>
        </svg>
    ),
    Request: () => (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-emerald-500">
            <g transform="translate(100 100)">
                <path d="M54.1,-37.9C67.9,-20.5,75.2,4.8,69.5,25.5C63.8,46.2,45.1,62.4,24.9,68.9C4.7,75.4,-17,72.2,-36.5,60.2C-56.1,48.2,-73.5,27.4,-75.8,4.7C-78.1,-18,-65.3,-32.7,-50.2,-46.8C-35.1,-61,-17.5,-74.6,2,-76.1C21.5,-77.6,43,-67,54.1,-52.9" fill="currentColor" opacity="0.1"></path>
                <path d="M-50,40 C-50,60 50,60 50,40 C50,20 30,-20 -0,-40 C-30,-20 -50,20 -50,40 Z" stroke="currentColor" strokeWidth="4" fill="none"></path>
                <text x="0" y="5" fontFamily="Arial" fontSize="50" textAnchor="middle" fill="currentColor">🤝</text>
            </g>
        </svg>
    ),
    Enjoy: () => (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-emerald-500">
            <g transform="translate(100 100)">
                <path d="M54.1,-37.9C67.9,-20.5,75.2,4.8,69.5,25.5C63.8,46.2,45.1,62.4,24.9,68.9C4.7,75.4,-17,72.2,-36.5,60.2C-56.1,48.2,-73.5,27.4,-75.8,4.7C-78.1,-18,-65.3,-32.7,-50.2,-46.8C-35.1,-61,-17.5,-74.6,2,-76.1C21.5,-77.6,43,-67,54.1,-52.9" fill="currentColor" opacity="0.1"></path>
                <rect x="-40" y="-40" width="80" height="80" rx="15" stroke="currentColor" strokeWidth="4" fill="none" />
                <text x="0" y="10" fontFamily="Arial" fontSize="50" textAnchor="middle" fill="currentColor">🎉</text>
            </g>
        </svg>
    ),
};

const HowItWorksAndImpact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const steps = [
        { illustration: <Illustrations.Share />, title: "Share Your Extra Food", description: "Post surplus food on our platform to reduce waste and help someone in your community." },
        { illustration: <Illustrations.Browse />, title: "Browse Available Meals", description: "Easily find fresh, delicious meals shared by your neighbors and local community members." },
        { illustration: <Illustrations.Request />, title: "Request & Coordinate", description: "Send a request for a meal you'd like and arrange a convenient and safe pickup time." },
        { illustration: <Illustrations.Enjoy />, title: "Enjoy & Connect", description: "Enjoy your meal, knowing you've helped reduce food waste and strengthened our community." },
    ];

    const StatItem = ({ end, label, icon }) => {
        const endValue = typeof end === 'string' ? parseInt(end.replace(/[^0-9]/g, '')) : end;
        const suffix = typeof end === 'string' ? end.replace(/[0-9,]/g, '') : '';
        return (
            <div className="text-center">
                <div className="text-5xl mb-2">{icon}</div>
                <div className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white">
                    <AnimatedCounter endValue={endValue} />{suffix}
                </div>
                <p className="mt-1 text-base text-gray-600 dark:text-gray-400">{label}</p>
            </div>
        );
    };

    const stats = [
        { label: "Meals Shared", value: "12345", icon: "🍽️" },
        { label: "Food Saved", value: "45678 lbs", icon: "🥕" },
        { label: "Community Members", value: "3210", icon: "👥" },
        { label: "Active Volunteers", value: "150+", icon: "💪" },
    ];

    // Animation variants
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const illustrationVariants = (isEven) => ({
        hidden: { opacity: 0, x: isEven ? -40 : 40 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    });

    const contentVariants = (isEven) => ({
        hidden: { opacity: 0, x: isEven ? 40 : -40 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    });


    return (
        <>
            <style>
                {`@keyframes pulse-dot{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.7}}.animate-pulse-dot{animation:pulse-dot 2s infinite}`}
            </style>
            <section ref={ref} className="bg-white dark:bg-gray-900 py-20 sm:py-28 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center mb-16 md:mb-24"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight">
                            Simple Steps, <span className="text-emerald-500">Big Impact</span>
                        </h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                            Our platform makes it easy to share food and reduce waste. Follow these simple steps to join our mission and see the incredible impact we're making together.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="relative mx-auto"
                    >
                        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-200 dark:bg-gray-700/50 hidden md:block"></div>

                        {steps.map((step, idx) => {
                            const isEven = idx % 2 === 0;
                            return (
                                <motion.div key={idx} className="md:grid md:grid-cols-2 md:gap-16 items-center relative mb-8 md:mb-0">
                                    <motion.div variants={illustrationVariants(isEven)} className={isEven ? '' : 'md:order-2'}>
                                        <div className="flex items-center justify-center p-8">
                                            <div className="w-48 h-48 md:w-64 md:h-64">{step.illustration}</div>
                                        </div>
                                    </motion.div>
                                    <motion.div variants={contentVariants(isEven)} className={isEven ? '' : 'md:order-1'}>
                                        <div className={`p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm`}>
                                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-400 mt-2">{step.description}</p>
                                        </div>
                                    </motion.div>
                                    <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700/50 rounded-full items-center justify-center">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse-dot"></div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                        className="mt-24"
                    >
                        <div className="mx-auto bg-gray-100 dark:bg-gray-800/50 p-8 sm:p-12 rounded-2xl border border-gray-200 dark:border-gray-700/50">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {stats.map((stat, idx) => (
                                    <StatItem key={idx} end={stat.value} label={stat.label} icon={stat.icon} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default HowItWorksAndImpact;

