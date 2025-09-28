import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const router = express.Router();

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    console.log("Decoded user in booking:", req.user);

    
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid" });
  }
};

// POST /api/bookings
router.post("/", auth, async (req, res) => {
  const { services, totalPrice, appointmentDate } = req.body;

  if (!services || services.length === 0 || !totalPrice || !appointmentDate) {
    return res.status(400).json({ message: "Missing booking info" });
  }

  try {
    // Get user details for email
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const booking = new Booking({
      userId: req.user.id,
      services,
      totalPrice,
      appointmentDate: new Date(appointmentDate),
    });

    await booking.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // tumhare email pe
      subject: "New Booking Received",
      html: `
        <h2>New Booking Received</h2>
        <h3>Customer Details:</h3>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone || 'Not provided'}</p>
        <p><strong>Address:</strong> ${user.address || 'Not provided'}</p>
        <p><strong>City:</strong> ${user.city || 'Not provided'}</p>
        
        <h3>Booking Details:</h3>
        <p><strong>Services:</strong> ${services.map(s => s.name).join(", ")}</p>
        <p><strong>Total Price:</strong> ₹${totalPrice}</p>
        <p><strong>Appointment Date & Time:</strong> ${new Date(appointmentDate).toLocaleString()}</p>
        <p><strong>Booking ID:</strong> ${booking._id}</p>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error("Email error:", err);
    });

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/bookings - Get user's bookings
router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .sort({ createdAt: -1 }); // Latest first
    
    res.json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/bookings/:id - Get specific booking
router.get("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    res.json({ booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
