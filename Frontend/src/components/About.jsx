import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-secondary/80">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="bg-primary/20 absolute -top-4 -left-4 right-12 bottom-12 rounded-lg"></div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative z-10">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-700">
                  {/* Placeholder for image - in a real project, you'd use an actual image */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/40 to-secondary flex items-center justify-center">
                    <span className="text-4xl">✨</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-white">About </span>
              <span className="text-primary">Loveable</span>
            </h2>
            <p className="text-gray-300 mb-4">
              Welcome to Loveable, where beauty meets luxury. Established in 2020, we have quickly become the premier destination for those seeking exceptional beauty services in a serene and elegant environment.
            </p>
            <p className="text-gray-300 mb-4">
              Our team of highly skilled professionals is dedicated to providing personalized services that enhance your natural beauty. We use only premium products and cutting-edge techniques to ensure you receive the best results.
            </p>
            <p className="text-gray-300 mb-6">
              At Loveable, we believe that self-care is essential, and our mission is to help you look and feel your absolute best. Whether you're preparing for a special occasion or simply treating yourself, we're here to exceed your expectations.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-secondary p-4 rounded-lg border border-gray-800">
                <h4 className="text-primary font-bold text-xl mb-1">5+</h4>
                <p className="text-gray-400 text-sm">Years Experience</p>
              </div>
              <div className="bg-secondary p-4 rounded-lg border border-gray-800">
                <h4 className="text-primary font-bold text-xl mb-1">15+</h4>
                <p className="text-gray-400 text-sm">Expert Stylists</p>
              </div>
              <div className="bg-secondary p-4 rounded-lg border border-gray-800">
                <h4 className="text-primary font-bold text-xl mb-1">1000+</h4>
                <p className="text-gray-400 text-sm">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;