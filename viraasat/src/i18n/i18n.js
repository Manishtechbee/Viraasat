import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const API_URL = import.meta.env.VITE_API_URL;

const STORAGE_KEY = "viraasat-language";

const savedLanguage =
  localStorage.getItem(STORAGE_KEY) || "en";

const loadTranslations = async (language) => {
  try {
    const response = await fetch(
      `${API_URL}/i18n?lang=${language}&namespace=common`,
      {
        headers: {
          "Accept-Language": language,
        },
        credentials: "include",
      }
    );

    const data = await response.json();

    return data.translations || {};
  } catch (error) {
    console.error(
      "Failed to load translations:",
      error
    );

    return {};
  }
};

await i18n
  .use(initReactI18next)
  .init({
    lng: savedLanguage,

    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },

    resources: {
      en: {
        common: {},
        auto: {},
      },

      [savedLanguage]: {
        common: {},
        auto: {},
      },
    },

    ns: ["common", "auto"],

    defaultNS: "common",

    react: {
      useSuspense: false,
    },
  });

export const changeLanguage = async (language) => {
  /*
   * Load manually-defined translations.
   */
  const translations =
    await loadTranslations(language);

  i18n.addResourceBundle(
    language,
    "common",
    translations,
    true,
    true
  );

  /*
   * Now change the actual i18next language.
   */
  await i18n.changeLanguage(language);
};

export default i18n;