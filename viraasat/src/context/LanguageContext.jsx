import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import i18n from "../i18n/i18n";
import { changeLanguage } from "../i18n/i18n";

const LanguageContext = createContext(null);

const STORAGE_KEY = "viraasat-language";

export const LanguageProvider = ({ children }) => {
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState(
    localStorage.getItem(STORAGE_KEY) || "en"
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/languages`
        );

        const data = await response.json();

        setLanguages(data.data || []);

        await changeLanguage(language);
      } catch (error) {
        console.error(
          "Language initialization failed:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    initializeLanguage();
  }, []);

  const setSiteLanguage = async (newLanguage) => {
    try {
      setLoading(true);

      await changeLanguage(newLanguage);

      setLanguage(newLanguage);

      localStorage.setItem(
        STORAGE_KEY,
        newLanguage
      );

      const selected = languages.find(
        (item) => item.code === newLanguage
      );

      document.documentElement.lang =
        selected?.locale || newLanguage;

      document.documentElement.dir =
        selected?.direction || "ltr";
    } catch (error) {
      console.error(
        "Language change failed:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedLanguage = languages.find(
    (item) => item.code === language
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        languages,
        selectedLanguage,
        setSiteLanguage,
        loading,
        i18n,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
};