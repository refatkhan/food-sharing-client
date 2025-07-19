import React from "react";

const HowItWorksAndImpact = () => {
    const steps = [
        {
            icon: "🍲",
            title: "Share Your Extra Food",
            description:
                "Have surplus food? Share it with the community to reduce waste and help those in need.",
        },
        {
            icon: "🔍",
            title: "Browse Available Food",
            description:
                "Easily find fresh meals shared by neighbors and community members nearby.",
        },
        {
            icon: "🤝",
            title: "Request or Offer Help",
            description:
                "Send requests for food or volunteer to help distribute meals in your area.",
        },
        {
            icon: "🚗",
            title: "Pick Up & Enjoy",
            description:
                "Coordinate pickups and enjoy delicious meals while spreading kindness.",
        },
    ];

    const stats = [
        { label: "Meals Shared", value: "12,345", icon: "🍽️" },
        { label: "Pounds of Food Saved", value: "45,678 lbs", icon: "🥕" },
        { label: "Active Users", value: "3,210", icon: "👥" },
        { label: "Volunteers", value: "150+", icon: "💪" },
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 py-16 text-gray-800 dark:text-gray-100">
            <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold mb-4">How It Works & Our Impact</h2>
                <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                    Join us in reducing food waste and spreading kindness through simple
                    steps. Together, we’re making a real difference in our community!
                </p>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-12">
                {/* How It Works */}
                <div className="md:w-1/2 mb-12 md:mb-0">
                    <h3 className="text-2xl font-semibold mb-8">How It Works</h3>
                    <div className="space-y-8">
                        {steps.map(({ icon, title, description }, idx) => (
                            <div key={idx} className="flex items-start space-x-4">
                                <div className="text-4xl">{icon}</div>
                                <div>
                                    <h4 className="text-xl font-semibold">{title}</h4>
                                    <p className="text-gray-600 dark:text-gray-300">{description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Impact Statistics */}
                <div className="md:w-1/2">
                    <h3 className="text-2xl font-semibold mb-8">Our Impact</h3>
                    <div className="grid grid-cols-2 gap-8">
                        {stats.map(({ icon, label, value }, idx) => (
                            <div
                                key={idx}
                                className="bg-green-600 text-white rounded-lg p-6 flex flex-col items-center justify-center shadow-md"
                            >
                                <div className="text-5xl mb-4">{icon}</div>
                                <div className="text-3xl font-bold">{value}</div>
                                <div className="mt-1 text-lg">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksAndImpact;
