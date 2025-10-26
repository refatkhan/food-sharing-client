import React from "react";
import { motion } from "framer-motion";

import Hero from "../components/Hero";
import FeaturedFoods from "../components/FeaturedFoods";
import TestimonialSlider from "../components/TestimonialSlider";
import FAQ from "../components/FAQ";
import GetInvolved from "../components/GetInvolved";
import CallToAction from "../components/CallToAction";
import HowItWorks from "../components/HowitWorks";
import HowItWorksAndImpact from "../components/WorksImpact";
import AboutUs from "../components/AboutUs";

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
};

const AnimatedSection = ({ children, delay = 0 }) => (
    <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }} // Triggers when 25% of the section is visible
        transition={{ duration: 0.6, delay: delay }}
    >
        {children}
    </motion.div>
);

// --- 2. Your Redesigned Home Component ---

const Home = () => {
    return (
        // Use <main> for the main content area for better accessibility
        <main>
         

            <AnimatedSection delay={0}>
                <Hero />
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
                <FeaturedFoods />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
                <HowItWorks />
            </AnimatedSection>

            {/* --- FIX 2: Added the missing component here --- */}
            <AnimatedSection delay={0.2}>
                <HowItWorksAndImpact />
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
                <TestimonialSlider />
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
                <FAQ />
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
                <GetInvolved />
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
                <AboutUs/>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
                <CallToAction />
            </AnimatedSection>
        </main>
    );
};

export default Home;