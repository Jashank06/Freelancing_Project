import React from "react";

const Packages = () => {
  const packages = [
    {
      id: 1,
      title: "Basic Package",
      price: "₹1000",
      features: [
        { text: "Hair Styling", icon: "💇‍♀️" },
        { text: "Makeup", icon: "💄" },
        { text: "Facial", icon: "✨" },
        { text: "Waxing", icon: "🕯️" },
        { text: "Threading", icon: "🧵" },
        { text: "Nail Extension", icon: "💅" },
      ],
      ribbon: "Starter",
    },
    {
      id: 2,
      title: "Premium Package",
      price: "₹2200",
      features: [
        { text: "All Basic Services", icon: "🌸" },
        { text: "Hair Spa", icon: "🧖‍♀️" , highlight: true},
        { text: "Advanced Makeup", icon: "💋" },
        { text: "Luxury Manicure", icon: "💎" },
        { text: "Full Body Waxing", icon: "🪄" },
      ],
      ribbon: "Most Popular",
    },
    {
      id: 3,
      title: "Luxury Package",
      price: "₹3500",
      features: [
        { text: "All Premium Services", icon: "🌺" },
        { text: "Hydra Facial", icon: "💧", highlight: true },
        { text: "Bridal Makeup", icon: "👰" },
        { text: "Deluxe Hair Treatment", icon: "🌟" },
        { text: "Luxury Manicure", icon: "🪷" },
      ],
      ribbon: "Best Value",
      highlight: true,
    },
  ];

  return (
    <section id="packages" className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16 animate-slideUp">
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="text-primary">Our </span>Packages
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from our specially curated beauty packages designed to fit
            every occasion and budget.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-3xl shadow-xl border overflow-hidden transform transition-all duration-500 hover:-translate-y-4 hover:rotate-1 ${
                pkg.highlight
                  ? "scale-110 bg-gradient-to-tr from-pink-600/90 to-purple-700/90 shadow-[0_0_40px_8px_rgba(255,77,141,0.8)] border-pink-500"
                  : "bg-gray-900/80 border-gray-700 hover:shadow-[0_0_25px_3px_rgba(255,77,141,0.5)]"
              }`}
            >
              {/* Ribbon */}
              {pkg.ribbon && (
                <span
                  className={`absolute top-4 right-[-30px] w-40 text-center text-sm font-bold py-1 rotate-45 ${
                    pkg.highlight
                      ? "bg-pink-500 text-white"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  {pkg.ribbon}
                </span>
              )}

              {/* Header */}
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center py-4 text-xl font-bold tracking-wide">
                {pkg.title}
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col items-center">
                <h3
                  className={`text-4xl font-bold mb-6 ${
                    pkg.highlight ? "text-pink-300 animate-pulse" : "text-white"
                  }`}
                >
                  {pkg.price}
                </h3>

                <ul className="text-gray-300 space-y-3 mb-6 w-full">
                  {pkg.features.map((feature, index) => (
                    <li
                      key={index}
                      className={`flex items-center gap-2 ${
                        feature.highlight
                          ? "text-pink-400 font-bold text-lg animate-pulse"
                          : ""
                      }`}
                    >
                      <span>{feature.icon}</span> {feature.text}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  className={`mt-auto px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:scale-105 ${
                    pkg.highlight
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-[0_0_20px_4px_rgba(255,77,141,0.7)]"
                      : "bg-white text-pink-600 hover:bg-gray-100"
                  }`}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
