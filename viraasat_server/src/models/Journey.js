import mongoose from "mongoose";

const journeyPlaceSchema = new mongoose.Schema(
  {
    heritage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Heritage",
      required: true,
    },

    visited: {
      type: Boolean,
      default: false,
    },

    visitedAt: {
      type: Date,
      default: null,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const journeySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    startDate: {
      type: Date,
      default: null,
    },

    endDate: {
      type: Date,
      default: null,
    },

    places: [journeyPlaceSchema],

    status: {
      type: String,
      enum: [
        "Draft",
        "Upcoming",
        "Ongoing",
        "Completed",
      ],
      default: "Draft",
    },

    source: {
      type: String,
      enum: ["manual", "ai"],
      default: "manual",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Journey", journeySchema);