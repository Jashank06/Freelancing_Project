import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Particles from './Particles'; // ✅ Particles import

// Images import
import hairImg from "../assets/images/Haircut.png";
import makeupImg from "../assets/images/makeup.png";
import facialImg from "../assets/images/facial.png";
import spaImg from "../assets/images/Hair_spa.png";
import waxingImg from "../assets/images/waxing.png";
import nailImg from "../assets/images/nail.png";

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
    { id: 1, title: "Hair Styling", description: "Expert cuts, coloring, and styling for all hair types.", image: hairImg, route: "hair-styling" },
    { id: 2, title: "Makeup", description: "Professional makeup for any occasion using premium products.", image: makeupImg, route: "makeup" },
    { id: 3, title: "Facials", description: "Rejuvenating treatments to nourish and revitalize your skin.", image: facialImg, route: "facials" },
    { id: 4, title: "Hair Spa", description: "Relaxing massages and body treatments for ultimate wellness.", image: spaImg, route: "spa" },
    { id: 5, title: "Waxing", description: "Smooth and flawless skin with our gentle waxing services.", image: waxingImg, route: "waxing" },
    { id: 6, title: "Nail Extension", description: "Trendy and durable nail extensions for a stylish look.", image: nailImg, route: "nail-extension" },
  ];

  const handleBookNow = (serviceRoute) => {
    navigate(`/service/${serviceRoute}`);
  };

  return (
    <section id="services" className="relative py-20 bg-secondary/80">
      {/* Particles Background */}
      <div style={{ width: '100%', height: '600px', position: 'absolute', top: 0, left: 0, zIndex: -10 }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-2 sm:px-0">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative bg-black/90 rounded-2xl overflow-hidden transform transition-all duration-700 hover:-translate-y-3 sm:hover:-translate-y-6 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 cursor-pointer border border-gray-800 hover:border-primary/50 min-h-[380px] sm:min-h-[420px] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
              style={{ 
                transitionDelay: `${index * 200}ms`
              }}
              onClick={() => handleBookNow(service.route)}
            >
              {/* Image Container */}
              <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Floating Icon */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-primary/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              {/* Content Container */}
              <div className="relative p-4 sm:p-6 flex flex-col justify-between flex-1">
                {/* Title */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary mb-3 transition-all duration-500 transform group-hover:scale-105">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-300 group-hover:text-gray-100 text-sm md:text-base leading-relaxed transition-all duration-500 line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Book Now Button */}
                <div className="mt-3 sm:mt-4">
                  <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary to-pink-600 text-white font-semibold rounded-full transform transition-all duration-500 hover:from-pink-600 hover:to-primary hover:scale-105 hover:shadow-lg hover:shadow-primary/50 group-hover:animate-pulse text-sm sm:text-base">
                    <span>Book Now</span>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="absolute -top-2 -left-2 w-16 h-16 bg-pink-500/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100"></div>
              </div>

              {/* Card Border Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-pink-500 to-primary opacity-20 blur-sm"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
