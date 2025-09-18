import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  services: [
    {
      name: { type: String, required: true },
      price: { type: String, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  appointmentDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", BookingSchema);
