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
            ¡Éxito! Una parte de usted se fusionó permanentemente con los demás en esta Ceremonia de Invocación.
          </0>
          <1>
            <0>Recuerde:</0>
            Esta es una Ceremonia en la red de prueba - asegúrese de regresar para la invocación completa de Dankshard.
          </1>`,
          'button': 'Vea su contribución',
        },
        doubleSign: {
          'title': 'Vincule su <br /> Contribución',
          'description': `
          <0>
          Esta firma vincula la contribución entrópica de cada Invocador a su dirección de Ethereum.
          </0>
          `,
          'button': 'Firmar',
        },
        entropyInput: {
          'title': 'Ingresar <br /> Entropía',
          'description': `
          <0>La Ceremonia requiere tres entradas aleatorias de cada Invocador.</0>
          <1>
            <0>Secreto:</0> Una parte de usted en forma de texto, caracteres añadidos al azar. Pueden ser
            unas palabras para el futuro, o el nombre de un ser querido.
          </1>
          <2>
            <0>Sello:</0> Recorra algunos elementos de la guía con
            el cursor - la interface capturará tu recorrido único.
          </2>
          <3>
            <0>Muestra:</0> Su navegador generara su propia aleatoriedad en segundo plano.
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
        explanation: {
          'title': 'PROTO-DANKSHARDING <br /> Y LA CEREMONIA',
          'description': `
          <0>
            Esta configuracion de confianza es una Ceremonia multi-party diseñada para generar una
            SRS segura (structured reference string ó cadena de referencia estructurada) que se utilizará en el
            protocolo proto-danksharding. OK, vamos a ir más despacio y a hablar de estos términos con más detalle.
          </0>
          <1>
            Proto-danksharding (también conocido como EIP-4844) es un cambio previsto en el protocolo de Ethereum
            que permite que los datos de las transacciones de los rollups (Layer 2) sean
            sucintamente representados en la Layer 1 (mainnet). Los beneficios
            son fees de transacción más bajos en la L2, mayor escalabilidad y
            ¡más accesibilidad a más personas!
          </1>
          <2>
            La configuración de confianza es un paso preparatorio necesario para ciertos esquemas criptográficos como
            el esquema de compromiso polinomial KZG, que ser[a] utilizado en el proto-danksharding. En nuestro caso,
            el sujeto de confianza es un contribuyente que necesita ocultar con éxito su secreto para
            para que el resultado sea seguro.
          </2>
          <3>
            En un Ceremonia multi-party: cada uno de los contribuyentes crea un secreto y ejecuta
            un cálculo para mezclarlo con las contribuciones anteriores y generar un
            resultado que se puede hacer público y pasar al siguiente contribuyente.
            Necesitamos protegernos contra los intentos de sabotear la ceremonia, por lo que necesitarás
            una cuenta de Ethereum o GitHub con un historial establecido.
          </3>`
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
          'description': 'Las contribuciones a la ceremonia sólo son posibles en ambiente de escritorio. ¡Nos vemos ahí!',
        },
        signin: {
          'title': 'ABRIR <br /> EL CAMINO',
          'description': `
          <0>
            La Ceremonia requiere almas de intenciones puras.
            Los invocadores demuestran su integridad al desbloquear una dirección que tenga al menos tres transacciones enviadas.
          </0>
          <1>
            Esto no envía fondos ni aprueba ningún contrato.
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
    fallbackLng: 'en',
    resources: languages
})