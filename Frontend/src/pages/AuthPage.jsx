import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AuthPageScoped.css';

const AuthPage = ({ setUser }) => {
  const [isActive, setIsActive] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = signup form, 2 = OTP
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Add event listeners for the animated transitions
    const handleRegisterClick = (e) => {
      e.preventDefault();
      setIsActive(true);
      setError("");
      setMessage("");
    };

    const handleLoginClick = (e) => {
      e.preventDefault();
      setIsActive(false);
      setError("");
      setMessage("");
      setStep(1);
    };

    const registerLink = document.querySelector('.SignUpLink');
    const loginLink = document.querySelector('.SignInLink');
    
    if (registerLink) {
      registerLink.addEventListener('click', handleRegisterClick);
    }
    
    if (loginLink) {
      loginLink.addEventListener('click', handleLoginClick);
    }

    return () => {
      if (registerLink) registerLink.removeEventListener('click', handleRegisterClick);
      if (loginLink) loginLink.removeEventListener('click', handleLoginClick);
    };
  }, [isActive]);

  // Login handlers
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        loginData
      );

      if (data?.token) localStorage.setItem("token", data.token);
      if (data?.user) setUser(data.user);
      setLoginData({ email: "", password: "" });
      navigate("/");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else if (err.request) {
        setError("No response from server. Check backend.");
      } else {
        setError("Login failed: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Signup handlers
  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/send-otp`, {
        email: signupData.email,
      });
      setMessage("OTP sent to your email!");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/verify-otp`, {
        ...signupData,
        otp,
      });
      setMessage("Signup successful! Please login.");
      setTimeout(() => {
        setIsActive(false);
        setStep(1);
        setMessage("");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className={`container ${isActive ? 'active' : ''}`}>
        {/* Login Form */}
        <div className="form-box Login">
          <form onSubmit={handleLoginSubmit}>
            <h2 className="animation" style={{'--S': 0, '--D': 21}}>Sign In</h2>
            
            {error && !isActive && (
              <div className="error-message animation" style={{'--S': 1, '--D': 20}}>
                {error}
              </div>
            )}

            <div className="input-box animation" style={{'--S': 1, '--D': 20}}>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
              <label>Email</label>
            </div>

            <div className="input-box animation" style={{'--S': 2, '--D': 19}}>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
              <label>Password</label>
            </div>

            <button 
              type="submit" 
              className="btn animation" 
              style={{'--S': 3, '--D': 18}}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <div className="regi-link animation" style={{'--S': 4, '--D': 17}}>
              <p>Don't have an account? <button type="button" className="SignUpLink" onClick={(e) => { setIsActive(true); setError(""); setMessage(""); }}>Sign Up</button></p>
            </div>
          </form>
        </div>

        {/* Info Content for Login */}
        <div className="info-content Login">
          <h2 className="animation" style={{'--S': 0, '--D': 21}}>Welcome Back!</h2>
          <p className="animation" style={{'--S': 1, '--D': 20}}>
            Enter your personal details to access your beauty appointments and profile.
          </p>
        </div>

        {/* Register Form */}
        <div className="form-box Register">
          {step === 1 ? (
            <form onSubmit={handleSendOtp}>
              <h2 className="animation" style={{'--li': 17, '--S': 0}}>Sign Up</h2>
              
              {error && isActive && (
                <div className="error-message animation" style={{'--li': 16, '--S': 1}}>
                  {error}
                </div>
              )}

              {message && (
                <div className="success-message animation" style={{'--li': 16, '--S': 1}}>
                  {message}
                </div>
              )}

              <div className="input-box animation" style={{'--li': 16, '--S': 1}}>
                <input
                  type="text"
                  name="name"
                  value={signupData.name}
                  onChange={handleSignupChange}
                  required
                />
                <label>Full Name</label>
              </div>

              <div className="input-box animation" style={{'--li': 15, '--S': 2}}>
                <input
                  type="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  required
                />
                <label>Email</label>
              </div>

              <div className="input-box animation" style={{'--li': 14, '--S': 3}}>
                <input
                  type="password"
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  required
                />
                <label>Password</label>
              </div>

              <button 
                type="submit" 
                className="btn animation" 
                style={{'--li': 13, '--S': 4}}
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>

              <div className="regi-link animation" style={{'--li': 12, '--S': 5}}>
                <p>Already have an account? <button type="button" className="SignInLink" onClick={() => { setIsActive(false); setError(""); setMessage(""); setStep(1); }}>Sign In</button></p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <h2 className="animation" style={{'--li': 17, '--S': 0}}>Verify OTP</h2>
              
              {error && (
                <div className="error-message animation" style={{'--li': 16, '--S': 1}}>
                  {error}
                </div>
              )}

              {message && (
                <div className="success-message animation" style={{'--li': 16, '--S': 1}}>
                  {message}
                </div>
              )}

              <div className="input-box animation" style={{'--li': 15, '--S': 2}}>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength="6"
                  style={{textAlign: 'center', letterSpacing: '0.5em'}}
                />
                <label>Enter OTP</label>
              </div>

              <button 
                type="submit" 
                className="btn animation" 
                style={{'--li': 14, '--S': 3}}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify & Sign Up"}
              </button>

              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="btn-secondary animation" 
                style={{'--li': 13, '--S': 4}}
              >
                Back to Sign Up
              </button>

              <div className="regi-link animation" style={{'--li': 12, '--S': 5}}>
                <p>Already have an account? <button type="button" className="SignInLink" onClick={() => { setIsActive(false); setError(""); setMessage(""); setStep(1); }}>Sign In</button></p>
              </div>
            </form>
          )}
        </div>

        {/* Info Content for Register */}
        <div className="info-content Register">
          <h2 className="animation" style={{'--li': 17, '--S': 0}}>Hello, Beautiful!</h2>
          <p className="animation" style={{'--li': 16, '--S': 1}}>
            Join us today and discover amazing beauty services tailored just for you.
          </p>
        </div>

        {/* Curved Shapes */}
        <div className="curved-shape"></div>
        <div className="curved-shape2"></div>
      </div>
    </div>
  );
};

export default AuthPage;
