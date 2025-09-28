'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextType from './TextType';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate all elements with fade-slide
      gsap.utils.toArray('.fade-up').forEach((el, i) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1,
          delay: i * 0.2, // stagger
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-20 bg-secondary/80">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side Image */}
          <div className="lg:w-1/2 fade-up">
            <div className="relative">
              <div className="bg-primary/20 absolute -top-4 -left-4 right-12 bottom-12 rounded-lg"></div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative z-10">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-700">
                  {/* Placeholder for image */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/40 to-secondary flex items-center justify-center">
                    <span className="text-4xl">✨</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 fade-up">
              <span className="text-white">About </span>
              <span className="text-primary">Mamta Beauty Parlour</span>
            </h2>

            {/* Typing Animation */}
            <div className="fade-up">
              <TextType 
                text={[
                  "Enhancing Your Natural Beauty",
                  "Luxury Salon Experience",
                  "Where Style Meets Elegance"
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                className="text-xl text-gray-200 mb-6"
                textColors={["#F472B6", "#C084FC", "#60A5FA"]}
              />
            </div>

            <p className="text-gray-300 mb-4 fade-up">
              Welcome to Mamta Beauty Parlour, where beauty meets luxury. Established in 2020, we have quickly become the premier destination for those seeking exceptional beauty services in a serene and elegant environment.
            </p>
            <p className="text-gray-300 mb-4 fade-up">
              Our team of highly skilled professionals is dedicated to providing personalized services that enhance your natural beauty. We use only premium products and cutting-edge techniques to ensure you receive the best results.
            </p>
            <p className="text-gray-300 mb-6 fade-up">
              At Mamta Beauty Parlour, we believe that self-care is essential, and our mission is to help you look and feel your absolute best. Whether you're preparing for a special occasion or simply treating yourself, we're here to exceed your expectations.
            </p>

            {/* Stats Section */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-secondary p-4 rounded-lg border border-gray-800 fade-up">
                <h4 className="text-primary font-bold text-xl mb-1">5+</h4>
                <p className="text-gray-400 text-sm">Years Experience</p>
              </div>
              {/* <div className="bg-secondary p-4 rounded-lg border border-gray-800 fade-up">
                <h4 className="text-primary font-bold text-xl mb-1">15+</h4>
                <p className="text-gray-400 text-sm">Expert Stylists</p>
              </div> */}
              <div className="bg-secondary p-4 rounded-lg border border-gray-800 fade-up">
                <h4 className="text-primary font-bold text-xl mb-1">1000+</h4>
                <p className="text-gray-400 text-sm">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>

        {/* 🔥 New Section: Parlour Classes */}
        <div className="mt-16 text-center fade-up">
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Also Giving <span className="text-primary">Parlour Classes</span>
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Learn the art of beauty and styling from our experienced professionals. Join our parlour classes and start your journey towards becoming an expert stylist.
          </p>
          <button 
            onClick={() => setShowModal(true)} 
            className="px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-primary/90 transition-colors duration-300"
          >
            Enroll Now
          </button>
        </div>
      </div>

      {/* 🔔 Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center w-[90%] max-w-sm">
            <h4 className="text-xl font-semibold text-white mb-4">Call Now</h4>
            <p className="text-gray-300 mb-6">📞 8368333480</p>
            <div className="flex justify-center gap-4">
              <a 
                href="tel:8368333480" 
                className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
              >
                Call Now
              </a>
              <button 
                onClick={() => setShowModal(false)} 
                className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
