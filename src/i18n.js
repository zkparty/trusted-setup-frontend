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
          'title': 'Dankshard <br/> esta cerca',
          'description': `
          <0>
            ¡Éxito! Una parte de usted se fusiono permanentemente con los demás en esta Ceremonia de Invocación.
          </0>
          <1>
            <0>Recuerde:</0>
            una Ceremonia en la red de prueba - asegúrese de regresar para la invocación completa de Dankshard.
          </1>`,
          'button': 'Vea su contribución',
        },
        doubleSign: {
          'title': 'Vincule su <br /> Contribución',
          'description': `
          <0>
          Esta firma vincula la contribucion entrópica de cada Invocador a su address de Ethereum.
          </0>
          `,
          'button': 'Firmar',
        },
        entropyInput: {
          'title': 'Ingresar <br /> Entropía',
          'description': `
          <0>La Ceremonia requiere tres entradas random de cada Invocador.</0>
          <1>
            <0>Secreto:</0> Una parte de usted en forma de texto, caracteres añadidos al azar. 
            Unas palabras para el futuro, o el nombre de un ser querido.
          </1>
          <2>
            <0>Sello:</0> Recorra algunos elementos de la guía con
            el cursor - la interface capturará tu recorrido único.
          </2>
          <3>
            <0>Muestra:</0> Su navegador generara su propia alateroridad en el background.
          </3>
          `,
          'button': 'Enviar'
        },
        landing: {
          'title': 'GUÍA DE <br/> INVOCACIÓN',
          'description': `
          <0>
            Los susurros provenientes de las sombras hablan del poderoso espiritu Dankshard,
            que abrirá las puertas del próximo capítulo de la escalabilidad de Ethereum.
            Para invocar sus poderes, una Ceremonia necesita de su contribución.
            Esta guía iluminada te conducirá a través de los movimientos 
            para completar el ritual. 
          </0>
          <1>
            La magia de las matemáticas te esperan: ¿está preparado para ser parte de esta historia?
          </1>`,
          'button': 'Comenzar',
          'learn-more': '↓ o infórmese a continuación ↓',
        },
        lobby: {
          'title': 'A la espera de ser <br /> Enviada',
          'description': `
          <0>
            Su contribución está lista para ser aceptada por el secuenciador.
            Por favor, deje esta guía abierta y  
            añadiremos su contribución a las otras en breve.
          </0>
          <1>Deje esta guía abierta y este atento.</1>
          `,
        },
        lobbyFull: {
          'title': 'La suma de las partes.',
          'description': `
          <0>Por favor, deje esta guía abierta - su contribución se verá en breve.</0>
          <1>Muchos otros están junto a usted en esta Ceremonia - su paciencia será recompensada.</1>
          `,
          'button': 'Volver a Inicio'
        },
        mobile: {
          'description': 'Las contribuciones a la ceremonia sólo son posibles en desktop setting. ¡Vea allí!',
        },
        signin: {
          'title': 'ABRIR <br /> EL CAMINO',
          'description': `
          <0>
            La Ceremonia requiere almas de intenciones puras.
            Los invocadores demuestran su integridad al desbloquear una address que tenga al menos tres transacciones enviadas.
          </0>
          <1>
            No envía fondos ni aprueba ningún contrato.
            Este método nos permite entregar un POAP después de la Ceremonia.
          </1>
          `,
          'unlockWithEthereum': 'Desbloquear con Ethereum <2></2>',
          'unlockWithGithub': 'Desbloquear con Github <2></2>',
        }
      }
    },
};

i18next.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    resources: languages
})