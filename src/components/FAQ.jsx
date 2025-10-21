import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const faqData = [
    {
        question: "Is the food shared on this platform really free?",
        answer: "Yes, absolutely. SharePlate is a community-driven initiative built on kindness. All food listed is completely free. The goal is to connect neighbors to reduce food waste, not to make a profit."
    },
    {
        question: "How do I know the food is safe to eat?",
        answer: "We encourage a community of trust, similar to sharing food with a neighbor. Donors are asked to only share fresh food that they would eat themselves. We recommend communicating with the donor about when the food was prepared and using your best judgment, just as you would with any food."
    },
    {
        question: "How does the pickup process work?",
        answer: "Once your food request is accepted, you can communicate directly and securely with the donor through our platform to arrange a convenient pickup time. For safety, we recommend meeting in a public and well-lit area in your local Ashulia neighborhood."
    },
    {
        question: "What kind of food can I share?",
        answer: "You can share a wide variety of items! This includes surplus groceries (fruits, vegetables, sealed goods), extra portions of home-cooked meals, or unopened packaged foods. Please do not share anything expired, unsealed, or alcoholic."
    },
    {
        question: "Who is eligible to use SharePlate?",
        answer: "Everyone is welcome! Whether you have extra food to give or you're in need of a meal for yourself or your family, SharePlate is for the entire community. There are no eligibility requirements to join."
    }
];

// Reusable Accordion Item Component
const AccordionItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    const contentVariants = {
        collapsed: { height: 0, opacity: 0, marginTop: 0 },
        open: { 
            height: 'auto', 
            opacity: 1, 
            marginTop: '1rem',
            transition: { duration: 0.4, ease: "easeInOut" }
        }
    };

    return (
        <motion.div 
            layout 
            className="border-b border-gray-200 dark:border-gray-700/50 py-6"
        >
            <motion.header
                initial={false}
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center cursor-pointer"
            >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.question}</h3>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="m6 9 6 6 6-6"/></svg>
                </motion.div>
            </motion.header>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        variants={contentVariants}
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                    >
                        <p className="text-gray-600 dark:text-gray-400">
                            {item.answer}
                        </p>
                    </motion.section>
                )}
            </AnimatePresence>
        </motion.div>
    );
};


const FAQ = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section ref={ref} className="bg-white dark:bg-gray-900 py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight">
                        Your Questions, <span className="text-emerald-500">Answered</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        We believe in full transparency. Here are answers to some common questions to help you get started.
                    </p>
                </motion.div>

                {/* This container now correctly respects the max-w-7xl alignment */}
                <motion.div 
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ staggerChildren: 0.1 }}
                    className="mx-auto" 
                >
                    {faqData.map((item, index) => (
                         <motion.div 
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                         >
                            <AccordionItem item={item} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;

