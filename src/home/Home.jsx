import React from "react";
import { motion } from "framer-motion";
import Banner from "../components/Banner";
import FeaturedFoods from "../components/FeaturedFoods";
import TestimonialSlider from "../components/TestimonialSlider";
import HowItWorksAndImpact from "../components/HowItWorksAndImpact ";
import HowItWorks from "../components/HowItWorks";

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
};

const Home = () => {
    return (
        <div className="bg-green-100">
            {/* Banner Section */}
            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
            >
                <Banner />
            </motion.div>

            {/* Featured Foods Section */}
            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <FeaturedFoods />
            </motion.div>
            {/*Impact and works */}
            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {/* work procedure*/}
            </motion.div>
            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <HowItWorksAndImpact />
            </motion.div>
            <HowItWorks />
            {/* Testimonial Slider Section */}
            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <TestimonialSlider />
            </motion.div>

        </div>
    );
};

export default Home;
