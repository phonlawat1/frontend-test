import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import EN from "./Language/EN/EN.json";
import TH from "./Language/TH/TH.json";

const resources = {
  en: {
    home: EN,
  },
  th: {
    home: TH,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "th", //default language
});

export default i18next;
