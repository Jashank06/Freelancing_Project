import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

// Images import (replace with your actual image paths)
import hairImg from "../assets/images/Haircut.png";
import makeupImg from "../assets/images/makeup.png";
import facialImg from "../assets/images/facial.png";
import spaImg from "../assets/images/Hair_spa.png";
import waxingImg from "../assets/images/waxing.png";
import nailImg from "../assets/images/nail.png";
// import threadingImg from "../assets/images/threading.png";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("services");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "Hair Styling",
      description: "Expert cuts, coloring, and styling for all hair types.",
      image: hairImg,
      route: "hair-styling",
    },
    {
      id: 2,
      title: "Makeup",
      description: "Professional makeup for any occasion using premium products.",
      image: makeupImg,
      route: "makeup",
    },
    {
      id: 3,
      title: "Facials",
      description: "Rejuvenating treatments to nourish and revitalize your skin.",
      image: facialImg,
      route: "facials",
    },
    {
      id: 4,
      title: "Hair Spa",
      description: "Relaxing massages and body treatments for ultimate wellness.",
      image: spaImg,
      route: "spa",
    },
    {
      id: 5,
      title: "Waxing",
      description: "Smooth and flawless skin with our gentle waxing services.",
      image: waxingImg,
      route: "waxing",
    },
    {
      id: 6,
      title: "Nail Extension",
      description: "Trendy and durable nail extensions for a stylish look.",
      image: nailImg,
      route: "nail-extension",
    },
    // {
    //   id: 7,
    //   title: "Threading",
    //   description: "Perfectly shaped brows and facial threading for a refined look.",
    //   image: threadingImg,
    //   route: "threading",
    // },
  ];

  const handleBookNow = (serviceRoute) => {
    navigate(`/service/${serviceRoute}`);
  };

  return (
    <section id="services" className="py-20 bg-secondary/80">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Our </span>
            <span className="text-primary">Services</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Indulge in our premium beauty services designed to enhance your
            natural beauty and provide a relaxing experience.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`relative bg-secondary rounded-3xl shadow-lg border border-gray-800 overflow-hidden transform transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_0_30px_5px_rgba(255,77,141,0.7)] hover:bg-primary group flex flex-col ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image full cover top */}
              <div className="w-full h-56">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col p-6 flex-1">
                <h3 className="text-2xl font-bold text-primary group-hover:text-white mb-3 text-center transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-300 group-hover:text-gray-100 text-center mb-6 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Button */}
                <button 
                  onClick={() => handleBookNow(service.route)}
                  className="mt-auto px-6 py-3 rounded-xl bg-white text-primary font-semibold hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
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

export default Services;
