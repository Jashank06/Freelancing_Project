import React, { useEffect, useState, useRef } from 'react';
import cardImage1 from '../assets/images/hair.png';
import cardImage2 from '../assets/images/facial.png';
import cardImage3 from '../assets/images/manicure.png';

// 🔹 Import CardSwap
import CardSwap, { Card } from './CardSwap';
import './CardSwap.css';

// 🔹 Import Particles
import Particles from './Particles';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const heroRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  const heroContents = [
    {
      category: 'BEAUTY PARLOUR',
      title: 'Discover Your True Beauty',
      description:
        'Experience luxury beauty treatments in a serene environment. Our expert stylists and therapists are dedicated to enhancing your natural beauty.',
      cta: 'Book Now'
    },
    {
      category: 'Hair SPA',
      title: 'Relax & Rejuvenate',
      description:
        'Indulge in our premium Hair spa treatments designed to refresh your body and mind. Let our specialists take care of your wellbeing.',
      cta: 'Book Session'
    },
    {
      category: 'HAIR STYLING',
      title: 'Transform Your Look',
      description:
        'Get the perfect hairstyle from our award-winning stylists. We use premium products to ensure your hair looks and feels amazing.',
      cta: 'Get Appointment'
    }
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const heroContent = heroContents[currentCardIndex];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);

    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const handleScroll = () => setScrollPosition(window.scrollY);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % heroContents.length);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const cardImages = [cardImage1, cardImage2, cardImage3];

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative overflow-hidden"
      style={{ height: '100vh', perspective: '1000px', backgroundColor: '#0d0d0d' }}
    >
      {/* 🔹 Particles Background */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
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

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10 h-full flex items-start pt-20 md:pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full">
          {/* Left Content */}
          <div className="flex flex-col items-start text-left">
            <span
              className={`inline-block text-sm font-bold tracking-widest text-primary ${
                isLoaded ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '300ms' }}
            >
              {heroContent.category}
            </span>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 overflow-hidden">
              {heroContent.title}
            </h1>

            <p
              className={`text-lg text-gray-300 max-w-xl mb-8 ${
                isLoaded ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '1200ms' }}
            >
              {heroContent.description}
            </p>

            <button
              onClick={() => setShowPopup(true)}
              className={`bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl ${
                isLoaded ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '1500ms' }}
            >
              {heroContent.cta}
            </button>
          </div>

          {/* Right CardSwap */}
          <div className="relative h-[500px] md:h-[600px] flex items-start justify-end pr-6 md:pr-0">
            <div style={{ height: '100%', position: 'relative' }}>
              <CardSwap cardDistance={60} verticalDistance={70} delay={5000} pauseOnHover={false}>
                {cardImages.map((img, index) => (
                  <Card key={index} className="shadow-xl overflow-hidden rounded-2xl">
                    <img
                      src={img}
                      alt={`Card ${index + 1}`}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white rounded-2xl p-6 shadow-xl text-center w-80">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Call Now</h2>
            <p className="text-lg font-semibold text-primary mb-6">📞 8368333480</p>
            <a
              href="tel:8368333480"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full mr-2 inline-block"
            >
              Call Now
            </a>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
