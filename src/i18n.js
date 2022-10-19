import i18next from "i18next"
import { initReactI18next } from "react-i18next"


export const languages = {
    en: { nativeName: 'English' },
    es: {
      nativeName: 'Spanish',
      translation: {
        'init': `
        <0>
            Espanol: Whispers from the shadows tell of a powerful spirit Dankshard,
            who will open the next chapter of Ethereum scalability.
            To summon its powers, a Ceremony needs your contribution.
            This illuminated guide will lead you through the movements necessary
            to complete the ritual.
        </0>
        <1>
            Espanol: Magic math awaits - are you ready to add your color to the story?
        </1>`
      }
    },
};

i18next.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    resources: languages
})