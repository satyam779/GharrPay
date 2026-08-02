const mongoose = require("mongoose");

const PHONE_REGEX = /^[0-9]{10}$/;

const bookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [80, "Name must be at most 80 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [PHONE_REGEX, "Enter a valid 10-digit mobile number"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      enum: {
        values: ["Bengaluru", "Hyderabad", "Pune", "NCR"],
        message: "Invalid city",
      },
    },
    roomType: {
      type: String,
      default: "",
      trim: true,
      maxlength: [80, "Room type is too long"],
    },
    moveInDate: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
      trim: true,
      maxlength: [1000, "Notes must be at most 1000 characters"],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
