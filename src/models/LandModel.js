const mongoose = require("mongoose");

const LandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 200,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 2000,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zipCode: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      default: "El Salvador",
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    areaSqFeet: {
      type: Number,
      required: true,
      min: 1,
    },
    landType: {
      type: String,
      enum: ["residential", "commercial", "agricultural", "industrial", "recreational"],
      required: true,
    },
    zoning: {
      type: String,
      enum: ["R1", "R2", "R3", "C1", "C2", "M1", "M2", "A1", "mixed-use"],
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "pending", "sold", "withdrawn"],
      default: "available",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    virtualTourUrl: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    // location: {
    //   type: {
    //     type: String,
    //     enum: ["Point"],
    //     default: "Point",
    //   },
    //   coordinates: {
    //     type: [Number], // [longitude, latitude]
    //     required: true,
    //   },
    // },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Create 2dsphere index for geolocation queries
LandSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Land", LandSchema);
