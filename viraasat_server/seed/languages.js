import mongoose from "mongoose";
import dotenv from "dotenv";
import Language from "../src/models/Language.js";

dotenv.config();

const languages = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    locale: "en-IN",
    speechRecognitionCode: "en-IN",
    speechSynthesisCode: "en-IN",
    order: 1,
  },

  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    locale: "hi-IN",
    speechRecognitionCode: "hi-IN",
    speechSynthesisCode: "hi-IN",
    order: 2,
  },

  {
    code: "pa",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    locale: "pa-IN",
    speechRecognitionCode: "pa-IN",
    speechSynthesisCode: "pa-IN",
    order: 3,
  },
];

export const seedLanguages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Language.deleteMany({});

    await Language.insertMany(languages);

    console.log("Languages seeded");
  } catch (error) {
    console.error(error);
  }
};

