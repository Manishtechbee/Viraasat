import mongoose from "mongoose";
import dotenv from "dotenv";
import Translation from "../src/models/Translation.js";

dotenv.config();

const translations = [
  {
    namespace: "common",
    key: "navbar.home",
    translations: {
      en: "Home",
      hi: "होम",
      pa: "ਮੁੱਖ ਪੰਨਾ",
    },
  },

  {
    namespace: "common",
    key: "navbar.explore",
    translations: {
      en: "Explore",
      hi: "खोजें",
      pa: "ਖੋਜੋ",
    },
  },

  {
    namespace: "common",
    key: "navbar.map",
    translations: {
      en: "Map",
      hi: "मानचित्र",
      pa: "ਨਕਸ਼ਾ",
    },
  },

  {
    namespace: "common",
    key: "navbar.aiGuide",
    translations: {
      en: "AI Guide",
      hi: "AI गाइड",
      pa: "AI ਗਾਈਡ",
    },
  },

  {
    namespace: "common",
    key: "navbar.dashboard",
    translations: {
      en: "Dashboard",
      hi: "डैशबोर्ड",
      pa: "ਡੈਸ਼ਬੋਰਡ",
    },
  },

  {
    namespace: "common",
    key: "common.search",
    translations: {
      en: "Search",
      hi: "खोजें",
      pa: "ਖੋਜੋ",
    },
  },

  {
    namespace: "common",
    key: "common.loading",
    translations: {
      en: "Loading...",
      hi: "लोड हो रहा है...",
      pa: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
    },
  },

  {
    namespace: "common",
    key: "common.language",
    translations: {
      en: "Language",
      hi: "भाषा",
      pa: "ਭਾਸ਼ਾ",
    },
  },

  {
    namespace: "common",
    key: "home.title",
    translations: {
      en: "Discover India's Heritage",
      hi: "भारत की विरासत खोजें",
      pa: "ਭਾਰਤ ਦੀ ਵਿਰਾਸਤ ਦੀ ਖੋਜ ਕਰੋ",
    },
  },
  {
    namespace:"common",
    key:"home.featuredHeritage",
    translations:{
      en:"Featured Heritage",
      hi:"प्रमुख विरासत",
      pa:"ਪ੍ਰਮੁੱਖ ਵਿਰਾਸਤ"
    }

  },
  {
    namespace:"common",
    key: "home.featuredDescription",
    translations :{
      en:"Explore India's most iconic cultural treasures",
      hi:"भारत के सबसे प्रसिद्ध सांस्कृतिक खजानों की खोज करें",
      pa:"ਭਾਰਤ ਦੇ ਸਭ ਤੋਂ ਪ੍ਰਸਿੱਧ ਸੱਭਿਆਚਾਰਕ ਖਜ਼ਾਨਿਆਂ ਦੀ ਖੋਜ ਕਰੋ"
    }
  }
];

export const seedTranslations = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Translation.deleteMany({});

    await Translation.insertMany(translations);

    console.log("Translations seeded");
  } catch (error) {
    console.error(error);
  }
};