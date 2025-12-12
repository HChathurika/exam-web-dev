const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    vin: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      required: true, // e.g. "Excellent"
    },
    location: {
      type: String,
      required: true, // e.g. "Garage B2"
    },
    availability: {
      isAvailable: {
        type: Boolean,
        required: true,
      },
      dueDate: {
        type: Date,
      },
      renter: {
        type: String,
      },
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
