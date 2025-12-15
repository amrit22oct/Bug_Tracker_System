import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "hi", // Fixed: lowercase 'f'
    supportedLngs: ["en", "hi"],
    debug: true,

    // Add backend configuration for loading translation files
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Adjust path as needed
    },

    // Configure language detection
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "selectedLanguage",
    },

    interpolation: {
      escapeValue: false,
    },

    // Load translations synchronously on init
    react: {
      useSuspense: false,
    },
  });

export default i18n;
