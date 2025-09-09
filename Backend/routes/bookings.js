import express from "express";
import Booking from "../models/Booking.js";
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
        <h2>New Booking</h2>
        <p><strong>User ID:</strong> ${req.user.id}</p>
        <p><strong>Services:</strong> ${services.map(s => s.name).join(", ")}</p>
        <p><strong>Total Price:</strong> ₹${totalPrice}</p>
        <p><strong>Appointment Date & Time:</strong> ${new Date(appointmentDate).toLocaleString()}</p>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error(err);
    });

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
