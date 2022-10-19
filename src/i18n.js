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
        doubleSign: {
          'title': 'Bind your <br /> Contribution',
          'description': `
          <0>
            This signature binds each Summoner’s entropy contribution to their Ethereum address.
          </0>
          `,
          'button': 'Sign',
        },
        entropyInput: {
          'title': 'Entropy <br /> Entry',
          'description': `
          <0>The Ceremony requires three random inputs from each Summoner.</0>
          <1>
            <0>Secret:</0> A piece of you in text form, with random characters added.
            A hope for the future, or the name of someone dear.
          </1>
          <2>
            <0>Sigil:</0> Trace some elements of the guide with your cursor -
            the interface will capture your unique path.
          </2>
          <3>
            <0>Sample:</0> Your browser will generate its own randomness in the background.
          </3>
          `,
          'button': 'Submit'
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
        lobby: {
          'title': 'Waiting to be <br /> submitted',
          'description': `
          <0>
              ES: Your contribution is ready to be accepted by the Sequencer.
              Please leave this guide open in the background and we will add
              your contribution to the others soon.
          </0>
          <1>Please leave this guide open and awake.</1>
          `,
        },
        lobbyFull: {
          'title': 'Sum of the parts.',
          'description': `
          <0>Please leave this guide open in the background - your contribution will be collected soon.</0>
          <1>Many others are alongside you in this Ceremony - your patience will be rewarded.</1>
          `,
          'button': 'Return to home'
        },
        mobile: {
          'description': 'Ceremony contributions are only possible in the desktop setting. See you there!',
        },
        signin: {
          'title': 'OPEN <br /> THE WAY',
          'description': `
          <0>
            The Ceremony requires souls of pure intent.
            Summoners show their integrity by unlocking with an address that has at least three sent transactions.
          </0>
          <1>
            It does not send any funds or permit any contracts.
            This method also allows us to deliver a POAP after the Ceremony.
          </1>
          `,
          'unlockWithEthereum': 'Unlock with Ethereum <2></2>',
          'unlockWithGithub': 'Unlock with Github <2></2>',
        }
      }
    },
};

i18next.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    resources: languages
})