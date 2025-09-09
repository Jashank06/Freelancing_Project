import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ user, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setUser(null); // Update state
    navigate("/login"); // Redirect to login page
    setIsProfileMenuOpen(false); // Close profile menu
  };

  return (
    <nav className="bg-black py-4 px-6 sticky top-0 z-50 shadow-lg border-b border-pink-500/30">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <span className="text-pink-500">Mamta Beauty</span>
          <span className="text-white"> Parlour</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center space-x-10">
          <a href="#home" className="text-white hover:text-pink-500 transition-all duration-300">
            Home
          </a>
          <a href="#services" className="text-white hover:text-pink-500 transition-all duration-300">
            Services
          </a>
          <a href="#packages" className="text-white hover:text-pink-500 transition-all duration-300">
            Packages
          </a>
          <a href="#about" className="text-white hover:text-pink-500 transition-all duration-300">
            About
          </a>
          <a href="#contact" className="text-white hover:text-pink-500 transition-all duration-300">
            Contact
          </a>
        </div>

        {/* Right side (Login/Profile) */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {user ? (
            <div className="relative">
              <FaUserCircle
                className="text-pink-500 text-3xl cursor-pointer"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              />
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-black border border-pink-500/30 rounded shadow-lg py-2 z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-pink-500/30"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-all"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3 relative">
          {user ? (
            <div className="relative">
              <FaUserCircle
                className="text-pink-500 text-3xl cursor-pointer"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              />
              {isProfileMenuOpen && (
                <div className="absolute right-0 top-10 w-32 bg-black border border-pink-500/30 rounded shadow-lg py-2 z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-pink-500/30"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition-all text-sm"
            >
              Login
            </Link>
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-pink-500 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 absolute top-16 left-0 right-0 p-4 shadow-lg border-t border-pink-500/30">
          <div className="flex flex-col items-center space-y-4">
            <a href="#home" className="text-white hover:text-pink-500 transition-all">
              Home
            </a>
            <a href="#services" className="text-white hover:text-pink-500 transition-all">
              Services
            </a>
            <a href="#packages" className="text-white hover:text-pink-500 transition-all">
              Packages
            </a>
            <a href="#about" className="text-white hover:text-pink-500 transition-all">
              About
            </a>
            <a href="#contact" className="text-white hover:text-pink-500 transition-all">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
