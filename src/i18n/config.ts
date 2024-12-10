import { initReactI18next } from 'react-i18next';

import i18next from 'i18next';

import Backend from 'i18next-http-backend'
import { getLanguageCookie } from '../configs/auth/utils';

const userLang = getLanguageCookie();

const isProductionCode = import.meta.env.VITE_ENV === 'production';
const fallbackLanguage = 'en'

const projectToken = import.meta.env.VITE_TRANSLATION_PROJECT_ID; // YOUR PROJECT TOKEN

const cdnBaseUrl = "https://cdn.simplelocalize.io";
const environment = "_latest"; // or "_production"
const loadPath = `${cdnBaseUrl}/${projectToken}/${environment}/{{lng}}`;
i18next.use(initReactI18next).use(Backend).init({
  lng: userLang || 'en', // if we're using a language detector, do not define the lng option
  debug: false,
  fallbackLng: fallbackLanguage,
        backend: {
            loadPath: loadPath || './en/translation.json', // or loadPathWithNamespaces if you use namespaces
        },
        saveMissing: !isProductionCode,
        defaultNS: "", // you can set default namespace here
  // if we see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
  // set returnNull to false (and also in the i18next.d.ts options)
  // returnNull: false,
});
