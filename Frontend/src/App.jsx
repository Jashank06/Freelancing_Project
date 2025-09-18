import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Component imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Packages from './components/Packages';
import About from './components/About';
import Contact from './components/Contact';
import ServiceDetail from './pages/ServiceDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { CartProvider } from "./context/CartContext";

// Home Page Component
const HomePage = ({ user }) => {
  return (
    <div className="App min-h-screen bg-gradient-to-b from-secondary to-secondary/95">
      <Hero />
      <Services />
      <Packages />
      <About />
      <Contact />
    </div>
  );
};

function App() {
  // ✅ Logged-in user state
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally, decode token or just mark user as logged in
      setUser({ token });
    }
  }, []);

  return (
    <Router>
      {/* Navbar receives user and setUser for login/logout */}
      <Navbar user={user} setUser={setUser} />
      <CartProvider>

      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/service/:serviceName" element={<ServiceDetail />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
      </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
