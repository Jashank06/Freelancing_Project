import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_URL; // Docker container ke liye

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = form, 2 = OTP
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/send-otp`, {
        email: formData.email,
      });
      console.log("OTP sent response:", res.data);
      setMessage("✅ OTP sent to your email!");
      setStep(2);
    } catch (err) {
      console.error("Axios error object:", err);
      setMessage(err.response?.data?.message || "❌ Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP & Register
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/verify-otp`, {
        ...formData,
        otp,
      });
      console.log("OTP verification response:", res.data);
      setMessage("🎉 Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Axios error object:", err);
      setMessage(err.response?.data?.message || "❌ OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-secondary to-secondary/95">
      <div className="bg-black p-8 rounded-2xl shadow-xl border border-pink-500/30 w-96 transition-all">
        <h2 className="text-3xl font-bold text-pink-500 mb-6 text-center">Signup</h2>

        {message && (
          <p
            className={`mb-4 text-center ${
              message.startsWith("✅") || message.startsWith("🎉")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="p-2 rounded bg-gray-800 text-white border border-pink-500 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="p-2 rounded bg-gray-800 text-white border border-pink-500 focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="p-2 rounded bg-gray-800 text-white border border-pink-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className={`py-2 rounded text-white transition ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-pink-500 hover:bg-pink-600"
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="p-2 rounded bg-gray-800 text-white border border-pink-500 focus:outline-none tracking-widest text-center"
            />
            <button
              type="submit"
              disabled={loading}
              className={`py-2 rounded text-white transition ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-pink-500 hover:bg-pink-600"
              }`}
            >
              {loading ? "Verifying..." : "Verify OTP & Signup"}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-gray-400 hover:underline text-sm mt-2"
            >
              ⬅ Back to Signup
            </button>
          </form>
        )}

        <p className="text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
