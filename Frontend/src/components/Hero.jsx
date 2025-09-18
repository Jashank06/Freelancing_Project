import React, { useEffect, useState, useRef } from 'react';
import heroBg from '../assets/images/hero-bg.jpg';

// Import your card images
import cardImage1 from '../assets/images/hair.png';
import cardImage2 from '../assets/images/facial.png';
import cardImage3 from '../assets/images/manicure.png';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const heroRef = useRef(null);
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  
  const cardRotations = ['5deg', '4deg', '6deg'];
  const currentRotation = cardRotations[currentCardIndex];

  const heroContents = [
    {
      category: 'BEAUTY PARLOUR',
      title: 'Discover Your True Beauty',
      description: 'Experience luxury beauty treatments in a serene environment. Our expert stylists and therapists are dedicated to enhancing your natural beauty.',
      cta: 'Book Now'
    },
    {
      category: 'Hair SPA',
      title: 'Relax & Rejuvenate',
      description: 'Indulge in our premium Hair spa treatments designed to refresh your body and mind. Let our specialists take care of your wellbeing.',
      cta: 'Book Session'
    },
    {
      category: 'HAIR STYLING',
      title: 'Transform Your Look',
      description: 'Get the perfect hairstyle from our award-winning stylists. We use premium products to ensure your hair looks and feels amazing.',
      cta: 'Get Appointment'
    }
  ];
  
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

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      // After 1 second, change to next card
      setTimeout(() => {
        setCurrentCardIndex((prev) => (prev + 1) % 3);
        setIsTransitioning(false);
      }, 1000);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentCardIndex]);

  const getParallaxStyle = (strength = 20, delay = 0) => {
    const translateX = (mousePosition.x - 0.5) * strength;
    const translateY = (mousePosition.y - 0.5) * strength;
    return {
      transform: `translate(${translateX}px, ${translateY}px)`,
      transition: `transform ${delay}ms ease-out`
    };
  };

  const getSingleCardStyle = (isExiting = false) => {
    const strength = 25;
    const translateX = (mousePosition.x - 0.5) * strength;
    const translateY = (mousePosition.y - 0.5) * strength;
    const scrollEffect = scrollPosition * 0.05;
    const breathingScale = 1 + Math.sin(Date.now() / 1000 * 0.5) * 0.02;
    
    let transformValue = `translate(${translateX}px, ${translateY - scrollEffect}px) rotate(${parseFloat(currentRotation)}deg) scale(${isLoaded ? breathingScale : 0.8})`;
    let opacity = isLoaded ? 1 : 0;
    
    if (isExiting) {
      // Card exits to the right
      transformValue = `translateX(120%) translateY(${translateY - scrollEffect}px) rotate(${parseFloat(currentRotation) + 15}deg) scale(${breathingScale * 0.9})`;
      opacity = 0;
    }
    
    return {
      transform: transformValue,
      transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: opacity,
      zIndex: 5
    };
  };
  
  const getEnteringCardStyle = () => {
    const strength = 25;
    const translateX = (mousePosition.x - 0.5) * strength;
    const translateY = (mousePosition.y - 0.5) * strength;
    const scrollEffect = scrollPosition * 0.05;
    const breathingScale = 1 + Math.sin(Date.now() / 1000 * 0.5) * 0.02;
    
    // Start from bottom, slide up to center
    const startY = translateY - scrollEffect + 200;
    const endY = translateY - scrollEffect;
    const currentY = isTransitioning ? endY : startY;
    
    return {
      transform: `translate(${translateX}px, ${currentY}px) rotate(${parseFloat(currentRotation)}deg) scale(${breathingScale})`,
      transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: 1,
      zIndex: 4
    };
  };

  const cardImages = [cardImage1, cardImage2, cardImage3];

  return (
    <section ref={heroRef} id="home" className="py-20 md:py-32 relative overflow-hidden"
      style={{ height: '100vh', perspective: '1000px', backgroundColor: '#0d0d0d' }}
    >
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out ${isLoaded ? 'opacity-20' : 'opacity-0'}`}
        style={{
          backgroundImage: `url(${heroBg})`,
          transform: isLoaded ? 'scale(1.05)' : 'scale(1.2)',
          ...getParallaxStyle(10, 100)
        }}>
      </div>

      <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
          <div className="flex flex-col items-start justify-center text-left">
            <div className="overflow-hidden mb-2">
              <span 
                className={`inline-block text-sm font-bold tracking-widest text-primary ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: '300ms' }}
              >
                {heroContent.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 overflow-hidden">
              {heroContent.title.split(' ').map((word, wordIndex) => (
                <div key={`word-${wordIndex}`} className="flex flex-wrap">
                  {word.split('').map((letter, letterIndex) => (
                    <span 
                      key={`letter-${wordIndex}-${letterIndex}`} 
                      className={`text-white inline-block ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
                      style={{ animationDelay: `${(wordIndex * 5 + letterIndex) * 50 + 500}ms` }}
                    >
                      {letter}
                    </span>
                  ))}
                  <span className="inline-block">&nbsp;</span>
                </div>
              ))}
            </h1>

            <div className="overflow-hidden mb-8">
              <p 
                className={`text-lg text-gray-300 max-w-xl ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: '1200ms' }}
              >
                {heroContent.description}
              </p>
            </div>

            <button 
        onClick={() => setShowPopup(true)}   // 🔹 popup open
        className={`bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
        style={{ animationDelay: '1500ms' }}
      >
        {heroContent.cta}
      </button>
          </div>
          
          <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Current visible card */}
              <div
                key={`current-card-${currentCardIndex}`}
                className="absolute rounded-2xl shadow-xl overflow-hidden"
                style={{
                  width: '90%',
                  height: '85%',
                  left: '5%',
                  top: '7.5%',
                  ...getSingleCardStyle(isTransitioning)
                }}
              >
                <img
                  src={cardImages[currentCardIndex]}
                  alt={`Card ${currentCardIndex + 1}`}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              
              {/* Next card entering from bottom during transition */}
              {isTransitioning && (
                <div
                  key={`entering-card-${(currentCardIndex + 1) % 3}`}
                  className="absolute rounded-2xl shadow-xl overflow-hidden"
                  style={{
                    width: '90%',
                    height: '85%',
                    left: '5%',
                    top: '7.5%',
                    ...getEnteringCardStyle()
                  }}
                >
                  <img
                    src={cardImages[(currentCardIndex + 1) % 3]}
                    alt={`Next Card ${((currentCardIndex + 1) % 3) + 1}`}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div 
        className={`absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-primary/20 blur-3xl ${isLoaded ? 'animate-scale-in' : 'opacity-0'}`}
        style={{ animationDelay: '700ms', ...getParallaxStyle(5, 200) }}
      />
      <div 
        className={`absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/20 blur-3xl ${isLoaded ? 'animate-scale-in' : 'opacity-0'}`}
        style={{ animationDelay: '900ms', ...getParallaxStyle(5, 200) }}
      />
       {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white rounded-2xl p-6 shadow-xl text-center w-80">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Call Now</h2>
            <p className="text-lg font-semibold text-primary mb-6">📞 8368333480</p>

             {/* Direct Call Button */}
      <a
        href="tel:8368333480"
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full mr-2 inline-block"
      >
        Call Now
      </a>
            <button
              onClick={() => setShowPopup(false)} // close popup
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
