import mongoose from "mongoose";

const heritageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Fort",
        "Palace",
        "Temple",
        "Mosque",
        "Gurudwara",
        "Monument",
        "Museum",
        "Stepwell",
        "Other",
      ],
    },

    state: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      default: "India",
    },

    era: {
      type: String,
    },

    builtYear: {
      type: String,
    },

    image: {
      type: String,
    },

    images: [
      {
        type: String,
      },
    ],

    rating: {
      type: Number,
      default: 0,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    location: {
      latitude: Number,
      longitude: Number,
    },

    tags: [
      {
        type: String,
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

heritageSchema.index({
  name: "text",
  description: "text",
  city: "text",
  state: "text",
  tags: "text",
});

export default mongoose.model("Heritage", heritageSchema);