import React, { useRef } from "react";
import { motion, useInView } from 'framer-motion';

const steps = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
        title: "1. Create Account",
        description: "Join our community with a quick and easy sign-up process.",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
        ),
        title: "2. Share or Find",
        description: "Post surplus food or browse listings available near you.",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 2 2.1 12.5A2 2 0 0 0 7 16h10a2 2 0 0 0 1.9-1.5L21 2Z" />
                <path d="M3 22h18" />
            </svg>
        ),
        title: "3. Arrange Pickup",
        description: "Connect securely to coordinate a convenient and safe exchange.",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 10v12" />
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a2 2 0 0 1 1.79 1.11L15 5.88Z" />
            </svg>
        ),
        title: "4. Make a Difference",
        description: "Feel great knowing you've helped reduce waste and support a neighbor.",
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
                staggerChildren: 0.2, // Stagger the children
            }
        }
    };

    // Variants for side columns (left and right)
    const leftVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const rightVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    // Variants for the phone
    const phoneVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="bg-white dark:bg-gray-900 py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-16 lg:mb-24"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight">
                        How Our Platform Works
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                        We've designed a simple and intuitive process to connect those with surplus food to those who need it.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0"
                >
                    {/* Left Steps */}
                    <motion.div variants={leftVariants} className="w-full lg:w-1/3 space-y-8">
                        {steps.slice(0, 2).map((step, i) => (
                            <div key={i} className="flex items-start gap-4 lg:justify-end">
                                <div className="lg:text-right">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                                </div>
                                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                                    {step.icon}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Phone Mockup */}
                    <motion.div variants={phoneVariants} className="w-full max-w-xs lg:w-1/3 px-4">
                        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl">
                            <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                            <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                            <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                            <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-emerald-50 dark:bg-gray-800">
                                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                                    <svg className="w-24 h-24 text-emerald-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25v-8.25M12 4.875A2.625 2.625 0 1012 10.125 2.625 2.625 0 0012 4.875z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.125V19.5m-8.25-9.375h16.5" />
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">SharePlate</h3>
                                    <p className="text-center text-gray-600 dark:text-gray-400 mt-2">Connecting Communities, Reducing Waste</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Steps */}
                    <motion.div variants={rightVariants} className="w-full lg:w-1/3 space-y-8">
                        {steps.slice(2, 4).map((step, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                                    {step.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

