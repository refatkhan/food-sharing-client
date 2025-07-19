import React from "react";

const steps = [
    {
        icon: (
            <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
        title: "Sign Up or Log In",
        description: "Create an account or log in to start donating or requesting food.",
    },
    {
        icon: (
            <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
        ),
        title: "Find or Share Food",
        description: "Browse food listings or post your surplus food with details.",
    },
    {
        icon: (
            <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        title: "Connect & Arrange Pickup",
        description: "Contact donors or recipients to arrange safe pickup.",
    },
    {
        icon: (
            <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M20 6L9 17l-5-5" />
            </svg>
        ),
        title: "Spread Kindness",
        description: "Reduce food waste and support your community by sharing meals.",
    },
];

export default function HowItWorks() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-16 text-gray-800 dark:text-gray-100">
            <h2 className="text-3xl font-bold text-center mb-12">
                How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
                {steps.map(({ icon, title, description }, i) => (
                    <div key={i} className="flex flex-col items-center text-center px-4">
                        <div className="mb-6">{icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
