// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        translation: {
          logoAlt: "Logo Carga Fácil",
          donoDaCarga: "Dono da Carga",
          motorista: "Motorista",
          cidades: "Cidades",
          sobreCargaFacil: "Sobre a Carga Fácil",
          carreiras: "Carreiras",
          parceiros: "Parceiros"
        }
      },
      en: {
        translation: {
          logoAlt: "Easy Load Logo",
          donoDaCarga: "Cargo Owner",
          motorista: "Driver",
          cidades: "Cities",
          sobreCargaFacil: "About Easy Load",
          carreiras: "Careers",
          parceiros: "Partners"
        }
      }
    },
    lng: "pt",
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;