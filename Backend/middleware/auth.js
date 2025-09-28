import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  let token;

  console.log('Auth middleware - Headers:', req.headers.authorization ? 'Present' : 'Missing');

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log('Token extracted:', token ? 'Yes' : 'No');

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded - User ID:', decoded.id);

      // get user and attach to request
      req.user = await User.findById(decoded.id).select("-password");
      console.log('User found in middleware:', req.user ? 'Yes' : 'No');
      
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }
      
      next();
    } catch (error) {
      console.error("Auth middleware error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.log('No authorization header or invalid format');
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default authMiddleware;
