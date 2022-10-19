import i18next from "i18next"
import { initReactI18next } from "react-i18next"


export const languages = {
    en: { nativeName: 'English' },
    es: {
      nativeName: 'Spanish',
      translation: {
        header: {
          'sequencer': 'Sequenciador',
          'button': 'Desbloquear',
          'ceremony': 'CEREMONIA DE PRUEBA',
        },
        complete: {
          'title': 'Dankshard <br/> draws near',
          'description': `
          <0>
            Espanol: Success! Echoes of you are permanently fused with the others in this Summoning Ceremony.
          </0>
          <1>
            <0>Espanol: Remember:</0>
              this is only a testnet Ceremony - make sure to return for the full Dankshard summoning.
          </1>`,
          'button': 'View your contribution',
        },
        landing: {
          'title': 'GUÍA DE <br/> INVOCACIÓN',
          'description': `
          <0>
              Espanol: Whispers from the shadows tell of a powerful spirit Dankshard,
              who will open the next chapter of Ethereum scalability.
              To summon its powers, a Ceremony needs your contribution.
              This illuminated guide will lead you through the movements necessary
              to complete the ritual.
          </0>
          <1>
              Espanol: Magic math awaits - are you ready to add your color to the story?
          </1>`,
          'button': 'Comenzar',
          'learn-more': '↓ ó descubre más ↓',
        },
      }
    },
};

i18next.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    resources: languages
})