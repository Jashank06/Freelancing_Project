import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Import images
import hairImg from '../assets/images/hair.png';
import makeupImg from '../assets/images/makeup.png';
import facialImg from '../assets/images/facial.png';
import nailImg from '../assets/images/nail.png';
import waxingImg from '../assets/images/waxing.png';
import threadingImg from '../assets/images/threading.png';
import spaImg from '../assets/images/manicure.png';
import CurtainImg from '../assets/images/Curtain_bangs.png';

const serviceOptions = {
  'hair-styling': {
    options: [
      { name: 'Curtain Bangs', price: '₹800' , image : CurtainImg},
      { name: 'Bob Cut', price: '₹1000' },
      { name: 'Hair Coloring', price: '₹2500' },
      { name: 'Straightening', price: '₹3000' },
      { name: 'Curling', price: '₹1500' },
      { name: 'Hair Treatment', price: '₹2000' }
    ],
    image: hairImg,
    description: 'Professional hair styling services for all hair types'
  },
  makeup: {
    options: [
      { name: 'Bridal Makeup', price: '₹5000' },
      { name: 'Party Makeup', price: '₹2500' },
      { name: 'Casual Makeup', price: '₹1500' },
      { name: 'Glam Makeup', price: '₹3000' },
      { name: 'Natural Look', price: '₹1200' },
      { name: 'HD Makeup', price: '₹3500' }
    ],
    image: makeupImg,
    description: 'Expert makeup services for any occasion'
  },
  facials: {
    options: [
      { name: 'Hydra Facial', price: '₹2000' },
      { name: 'Anti-aging Facial', price: '₹2500' },
      { name: 'Brightening Facial', price: '₹1800' },
      { name: 'Detox Facial', price: '₹2200' },
      { name: 'Gold Facial', price: '₹3000' },
      { name: 'Diamond Facial', price: '₹3500' }
    ],
    image: facialImg,
    description: 'Rejuvenating facial treatments for healthy skin'
  },
  'nail-extension': {
    options: [
      { name: 'Classic Extension', price: '₹1200' },
      { name: 'Gel Extension', price: '₹1500' },
      { name: 'Acrylic Extension', price: '₹1800' },
      { name: 'French Manicure', price: '₹800' },
      { name: 'Nail Art', price: '₹1000' },
      { name: 'Designer Nails', price: '₹2000' }
    ],
    image: nailImg,
    description: 'Beautiful nail extensions and nail art services'
  },
  waxing: {
    options: [
      { name: 'Full Body Waxing', price: '₹3000' },
      { name: 'Upper Lip', price: '₹200' },
      { name: 'Underarm', price: '₹500' },
      { name: 'Bikini Line', price: '₹800' },
      { name: 'Full Legs', price: '₹1200' },
      { name: 'Arms', price: '₹800' }
    ],
    image: waxingImg,
    description: 'Smooth and gentle waxing services'
  },
  threading: {
    options: [
      { name: 'Eyebrow Threading', price: '₹300' },
      { name: 'Upper Lip Threading', price: '₹150' },
      { name: 'Chin Threading', price: '₹200' },
      { name: 'Full Face Threading', price: '₹600' },
      { name: 'Forehead Threading', price: '₹250' },
      { name: 'Side Face Threading', price: '₹350' }
    ],
    image: threadingImg,
    description: 'Precision threading for perfect eyebrows and facial hair'
  },
  spa: {
    options: [
      { name: 'Swedish Massage', price: '₹2500' },
      { name: 'Aromatherapy', price: '₹3000' },
      { name: 'Hot Stone Massage', price: '₹3500' },
      { name: 'Deep Tissue Massage', price: '₹2800' },
      { name: 'Thai Massage', price: '₹3200' },
      { name: 'Couple Massage', price: '₹5000' }
    ],
    image: spaImg,
    description: 'Relaxing spa treatments for ultimate wellness'
  },
};

const ServiceDetail = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const serviceData = serviceOptions[serviceName] || { options: [], image: null, description: '' };

  // --- existing states ---
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // --- new states for booking ---
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [bookingError, setBookingError] = useState('');

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleServiceSelect = (option) => {
    const isSelected = selectedServices.find(service => service.name === option.name);

    // Visual feedback simulation (sound effect replacement)
    const button = document.activeElement;
    if (button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        if (button.style) button.style.transform = '';
      }, 150);
    }

    if (isSelected) {
      // Remove service if already selected
      const updatedServices = selectedServices.filter(service => service.name !== option.name);
      setSelectedServices(updatedServices);
      calculateTotal(updatedServices);
    } else {
      // Add service to selection
      const updatedServices = [...selectedServices, option];
      setSelectedServices(updatedServices);
      calculateTotal(updatedServices);
    }
  };

  const calculateTotal = (services) => {
    const total = services.reduce((sum, service) => {
      return sum + parseInt(service.price.replace('₹', ''));
    }, 0);
    setTotalPrice(total);
  };

  // --- updated booking flow ---

  const handleBookAppointment = () => {
    if (selectedServices.length === 0) {
      alert('Please select at least one service!');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      // If user not logged in, redirect to login and request them to login first
      if (window.confirm('You need to be logged in to book. Go to login?')) {
        navigate('/login');
      }
      return;
    }

    // Open date-time picker modal
    setShowDatePicker(true);
    setBookingError('');
  };

  const handleConfirmBooking = async () => {
    if (!appointmentDate) {
      setBookingError('Please select date and time for the appointment.');
      return;
    }

    setBookingLoading(true);
    setBookingError('');

    try {
      const token = localStorage.getItem('token');
      // Build payload
      const payload = {
        services: selectedServices.map(s => ({ name: s.name, price: s.price })),
        totalPrice,
        appointmentDate: appointmentDate.toISOString(),
      };

      // Post to backend (adjust base URL if needed)
      const res = await axios.post('http://localhost:5000/api/bookings', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // success
      setBookingInfo(res.data.booking || res.data);
      setBookingSuccess(true);
      setShowDatePicker(false);
      setSelectedServices([]);
      setTotalPrice(0);
      setAppointmentDate(null);
    } catch (err) {
      console.error('Booking error:', err);
      // Different error shapes handled
      const msg = err.response?.data?.message || err.message || 'Booking failed';
      setBookingError(msg);
    } finally {
      setBookingLoading(false);
    }
  };

  // const handleCloseSuccess = () => {
  //   setBookingSuccess(false);
  //   setBookingInfo(null);
  // };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-primary animate-glow-pulse">Loading Services...</h2>
          <p className="text-gray-300 mt-2">Please wait while we prepare your beauty experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95">
      {/* Header */}
      <div className="bg-black/90 py-6 px-6 border-b border-primary/30">
        <div className="container mx-auto">
          <Link to="/" className="text-primary hover:text-pink-400 transition-colors mb-4 inline-block">
            ← Back to Home
          </Link>
          {/* Large Cover Image */}
          {serviceData.image && (
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8 animate-fade-in">
              <img
                src={serviceData.image}
                alt={serviceName.replace('-', ' ')}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="text-center animate-slide-up">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-scale-in">
                    <span className="text-primary">{serviceName.replace('-', ' ')}</span> Services
                  </h1>
                  <p className="text-xl text-gray-200 animate-fade-in delay-300">{serviceData.description}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>
          )}
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-12 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
              Select Your Preferred Services
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg animate-fade-in delay-200">
              Choose multiple services and see your total price update automatically
            </p>
            {selectedServices.length > 0 && (
              <div className="mt-6 animate-bounce-in">
                <div className="inline-block bg-primary/20 border border-primary rounded-full px-8 py-3 animate-glow-pulse">
                  <span className="text-primary font-bold text-lg">
                    {selectedServices.length} Service{selectedServices.length > 1 ? 's' : ''} Selected - Total: ₹{totalPrice}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {serviceData.options.map((option, index) => {
              const isSelected = selectedServices.find(service => service.name === option.name);
              return (
                <div
                  key={index}
                  onClick={() => handleServiceSelect(option)}
                  className={`group bg-black/70 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 transform hover:-translate-y-3 animate-fade-in ${
                    isSelected
                      ? 'border-primary bg-primary/20 scale-105 shadow-primary/50 animate-glow-pulse'
                      : 'border-gray-800 hover:border-primary/50 hover:bg-black/80 hover:shadow-primary/30'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-center">
                    {/* Large Service Image */}
                    <div className="mb-6">
                      <div className="relative w-32 h-32 mx-auto overflow-hidden rounded-2xl">
                        <img
                          src={serviceData.image}
                          alt={option.name}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                        />
                        <div className={`absolute inset-0 transition-all duration-500 rounded-2xl ${
                          isSelected
                            ? 'bg-primary/40 border-2 border-primary'
                            : 'group-hover:bg-primary/20'
                        }`}>
                          {isSelected && (
                            <div className="absolute inset-0 flex items-center justify-center animate-bounce-in">
                              <div className="bg-primary rounded-full p-3 animate-pulse shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary transition-colors duration-300">{option.name}</h3>
                    <p className={`text-2xl font-bold mb-4 transition-all duration-300 ${
                      isSelected ? 'text-white scale-110' : 'text-primary group-hover:scale-105'
                    }`}>{option.price}</p>
                    <div className={`font-medium transition-all duration-300 ${
                      isSelected ? 'text-white' : 'text-primary group-hover:text-white'
                    }`}>
                      {isSelected ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          Selected
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Add to Cart
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Book Appointment Section */}
          {selectedServices.length > 0 && (
            <div className="text-center animate-slide-up">
              <div className="bg-black/90 p-8 rounded-2xl max-w-2xl mx-auto mb-8 border border-primary/30">
                <h3 className="text-2xl font-bold text-white mb-4">Selected Services</h3>
                <div className="space-y-3 mb-6">
                  {selectedServices.map((service, index) => (
                    <div 
                      key={index} 
                      className={`flex justify-between items-center p-4 bg-primary/10 rounded-lg border border-primary/30 hover:bg-primary/20 transition-all duration-300 ${
                        index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'
                      }`}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <span className="text-white font-medium">{service.name}</span>
                      <span className="text-primary font-bold text-lg">{service.price}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-600 pt-4">
                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span className="text-white">Total Amount:</span>
                    <span className="text-primary animate-pulse">₹{totalPrice}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleBookAppointment}
                className="px-12 py-5 bg-gradient-to-r from-primary to-pink-600 text-white font-bold text-xl rounded-2xl hover:from-pink-600 hover:to-primary transition-all duration-500 transform hover:scale-110 shadow-xl hover:shadow-2xl hover:shadow-primary/50 animate-glow-pulse relative overflow-hidden group"
              >
                <span className="relative z-10">Book Appointment - ₹{totalPrice}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
              {/* Clear Selection Button */}
              <button
                onClick={() => {
                  setSelectedServices([]);
                  setTotalPrice(0);
                }}
                className="ml-4 px-6 py-4 bg-gray-700 text-white font-semibold rounded-2xl hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear All
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* DATE/TIME PICKER MODAL */}
      {showDatePicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-black rounded-2xl p-6 max-w-md w-full border border-primary/30">
            <h3 className="text-xl font-bold text-white mb-3">Select Date & Time</h3>
            <p className="text-gray-300 mb-4">Choose a date and time for your appointment</p>

            <DatePicker
              selected={appointmentDate}
              onChange={(date) => setAppointmentDate(date)}
              showTimeSelect
              timeIntervals={30}
              minDate={new Date()}
              dateFormat="Pp"
              placeholderText="Click to select date & time"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
            />

            {bookingError && <p className="text-red-400 mt-3">{bookingError}</p>}

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => { setShowDatePicker(false); setBookingError(''); }}
                className="px-4 py-2 rounded bg-gray-700 text-white"
                disabled={bookingLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-4 py-2 rounded bg-pink-500 text-white"
                disabled={bookingLoading}
              >
                {bookingLoading ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING SUCCESS */}
      {bookingSuccess && bookingInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-black/95 rounded-2xl p-6 max-w-lg w-full border border-green-600">
            <h3 className="text-2xl font-bold text-green-400 mb-3">Booking Confirmed!</h3>
            <p className="text-gray-300 mb-2">Your appointment has been successfully booked.</p>
            <div className="bg-black/80 rounded p-4 mb-4 border border-primary/20">
              <p className="text-white"><strong>Services:</strong> {bookingInfo.services?.map(s => s.name).join(', ')}</p>
              <p className="text-white"><strong>Total:</strong> ₹{bookingInfo.totalPrice}</p>
              <p className="text-white"><strong>Appointment:</strong> {new Date(bookingInfo.appointmentDate).toLocaleString()}</p>
              <p className="text-white"><strong>Booked At:</strong> {new Date(bookingInfo.createdAt || Date.now()).toLocaleString()}</p>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => { setBookingSuccess(false); setBookingInfo(null); }} className="px-4 py-2 rounded bg-gray-700 text-white">Close</button>
              <button onClick={() => { setBookingSuccess(false); navigate('/'); }} className="px-4 py-2 rounded bg-primary text-white">Back to Home</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;
