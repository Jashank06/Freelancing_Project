import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    console.log("Submitting login:", formData); // Debug

    try {
      const res = await axios.post(
  `${process.env.REACT_APP_API_URL}/auth/login`,
  formData
);
      
      console.log("Response from backend:", res.data); // Debug

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      setFormData({ email: "", password: "" });
      navigate("/");
    } catch (err) {
      console.error("Axios error object:", err); // Debug full error

      if (err.response) {
        // Server responded with a status code outside 2xx
        console.error("Backend response:", err.response.data);
        setError(err.response.data.message || "Login failed");
      } else if (err.request) {
        // Request made but no response received
        console.error("No response received:", err.request);
        setError("No response from server. Check backend.");
      } else {
        // Something else happened
        console.error("Error setting up request:", err.message);
        setError("Login failed: " + err.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-secondary to-secondary/95">
      <div className="bg-black p-8 rounded-lg shadow-lg border border-pink-500/30 w-96">
        <h2 className="text-2xl font-bold text-pink-500 mb-6">Login</h2>
        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            className="p-2 rounded bg-gray-800 text-white border border-pink-500 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            className="p-2 rounded bg-gray-800 text-white border border-pink-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition-colors"
          >
            Login
          </button>
        </form>
        <p className="text-gray-400 mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-pink-500 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
