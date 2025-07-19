import React, { useState, useEffect } from "react";

const testimonials = [
    {
        text: "Thanks to this platform, I’ve been able to find fresh food for my family when times were tough. It’s such a wonderful community effort!",
        author: "Sarah M.",
    },
    {
        text: "I love how easy it is to donate food here. Knowing my extra groceries help someone in need makes me feel great.",
        author: "Raj P.",
    },
    {
        text: "The featured foods section always has amazing options. I’ve discovered so many local donors through this site.",
        author: "Emily R.",
    },
    {
        text: "This project is changing lives — reducing waste and feeding people. It’s a win-win for everyone involved.",
        author: "Ahmed K.",
    },
    {
        text: "I was amazed at how quickly I could request food and arrange a pickup. Truly a lifesaver!",
        author: "Lina T.",
    },
    {
        text: "Being part of this community makes me hopeful. It’s inspiring to see so many people willing to help.",
        author: "Jamal S.",
    },
    {
        text: "A fantastic way to reduce food waste and support neighbors in need. Highly recommend!",
        author: "Priya D.",
    },
    {
        text: "The user-friendly design made it super simple to find and request food donations near me.",
        author: "Marcus L.",
    },
    {
        text: "I appreciate the trust and transparency this platform offers to both donors and recipients.",
        author: "Nisha B.",
    },
    {
        text: "Helping others has never been easier. This site brings people together through kindness and food.",
        author: "Carlos M.",
    },
];

export default function TestimonialSlider() {
    const [current, setCurrent] = useState(0);
    const length = testimonials.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % length);
        }, 7000); // Change slide every 7 seconds
        return () => clearInterval(interval);
    }, [length]);

    return (
        <section className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                What Our Users Say
            </h2>
            <div className="relative min-h-[150px] text-center flex justify-center items-center">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className={`transition-opacity duration-1000 ease-in-out absolute inset-0 ${index === current ? "opacity-100 relative" : "opacity-0 pointer-events-none"
                            }`}
                    >
                        <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                            “{testimonial.text}”
                        </p>
                        <p className="text-right font-semibold text-gray-900 dark:text-white">
                            — {testimonial.author}
                        </p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6 space-x-3">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full focus:outline-none ${index === current ? "bg-blue-600 dark:bg-blue-400" : "bg-gray-300 dark:bg-gray-600"
                            }`}
                        onClick={() => setCurrent(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
