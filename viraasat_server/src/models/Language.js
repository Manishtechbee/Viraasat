import mongoose from "mongoose";

const languageSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    name: {
      type: String,
      required: true,
    },

    nativeName: {
      type: String,
      required: true,
    },

    locale: {
      type: String,
      required: true,
    },

    speechRecognitionCode: {
      type: String,
      required: true,
    },

    speechSynthesisCode: {
      type: String,
      required: true,
    },

    direction: {
      type: String,
      enum: ["ltr", "rtl"],
      default: "ltr",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Language", languageSchema);