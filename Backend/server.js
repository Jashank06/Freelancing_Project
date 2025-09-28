// server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/bookings.js";

dotenv.config();

console.log("Loaded Mongo URI:", process.env.MONGODB_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected...");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};
connectDB();

const app = express();
app.use(express.json());

// ===================== CORS SETUP =====================
const defaultOrigins = ["http://localhost:3000", "http://localhost:3003"];
const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || defaultOrigins;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // curl, Postman
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS policy does not allow access from this origin."), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ===================== ROUTES =====================
app.use("/api/auth", authRoutes);
app.use("/api/user", authRoutes); // Profile routes accessible via /api/user
app.use("/api/bookings", bookingRoutes);

// Root route
app.get("/", (req, res) => res.send("API running..."));

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "Backend is working!", 
    timestamp: new Date().toISOString(),
    port: PORT 
  });
});

// ===================== SERVER =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
