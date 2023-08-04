const CIRCLE_SIZE = 490

const PAGE_SIZE = 20

const FONT_SIZE = {
  XXS: '9px',
  XS: '11px',
  S: '13px',
  SM: '14px',
  M: '15px',
  L: '19px',
  XL: '23px',
  XXL: '25px'
} as const

const SPACE = {
  XS: '4px',
  S: '8px',
  M: '16px',
  L: '20px',
  XL: '24px',
  XXL: '32px'
} as const

const RADIUS = {
  S: '4px',
  M: '8px',
  L: '12px'
} as const

const BREAKPOINT = {
  S: '480px',
  M: '768px',
  L: '1024px',
  XL: '1280px'
} as const

const BACKGROUND_DARKNESS = 0.7

const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT || 'testnet'

const API_ROOT = process.env.REACT_APP_API_ROOT || 'http://127.0.0.1:3000'
const COMPUTE_DEADLINE =
  parseInt(process.env.REACT_APP_COMPUTE_DEADLINE as string) || 180
const LOBBY_CHECKIN_FREQUENCY =
  parseInt(process.env.REACT_APP_LOBBY_CHECKIN_FREQUENCY as string) || 32000
const MIN_MOUSE_ENTROPY_SAMPLES =
  parseInt(process.env.REACT_APP_MIN_MOUSE_ENTROPY_SAMPLES as string) || 64
const AVERAGE_CONTRIBUTION_TIME =
  parseInt(process.env.REACT_APP_AVERAGE_CONTRIBUTION_TIME as string) || 52
const ETH_MIN_NONCE =
  parseInt(process.env.REACT_APP_ETH_MIN_NONCE as string) || 3

const START_DATE =
  parseInt(process.env.REACT_APP_START_DATE as string) || 1678713180
const END_DATE =
  parseInt(process.env.REACT_APP_END_DATE as string) || 1681668780

const INFURA_ID =
  process.env.REACT_APP_INFURA_ID || 'cd82571d19ab490e828dd0f86ec3cbf0'
const PORTIS_ID =
  process.env.REACT_APP_PORTIS_ID || 'd6418a0a-18ae-4dfd-a206-3398012907ec'
const FORTMATIC_KEY =
  process.env.REACT_APP_FORTMATIC_KEY || 'pk_live_AAE763E3E8AC097E'

const WALLET_CONNECT_PROJECT_ID =
  process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID ||
  'c8abd7e451b16bf3f3cdf58aaea89f60'


const TRANSCRIPT_HASH =
  process.env.REACT_APP_TRANSCRIPT_HASH || '0x8f477608c3cbb9b3a5e444dea61897e58d25a4bee4f580e6c0ea30c28918181c'


export {
  FONT_SIZE,
  CIRCLE_SIZE,
  PAGE_SIZE,
  SPACE,
  RADIUS,
  BREAKPOINT,
  ENVIRONMENT,
  BACKGROUND_DARKNESS,
  API_ROOT,
  COMPUTE_DEADLINE,
  LOBBY_CHECKIN_FREQUENCY,
  MIN_MOUSE_ENTROPY_SAMPLES,
  AVERAGE_CONTRIBUTION_TIME,
  ETH_MIN_NONCE,
  START_DATE,
  END_DATE,
  PORTIS_ID,
  FORTMATIC_KEY,
  INFURA_ID,
  WALLET_CONNECT_PROJECT_ID,
  TRANSCRIPT_HASH,
}
