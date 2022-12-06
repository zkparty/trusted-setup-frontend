const CIRCLE_SIZE = 486;

const PAGE_SIZE = 20;

const FONT_SIZE = {
  XXS: '9px',
  XS: '11px',
  S: '13px',
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
const LOBBY_CHECKIN_FREQUENCY =
  parseInt(process.env.REACT_APP_LOBBY_CHECKIN_FREQUENCY as string) || 30000
const MIN_MOUSE_ENTROPY_SAMPLES =
  parseInt(process.env.REACT_APP_MIN_MOUSE_ENTROPY_SAMPLES as string) || 64

const START_DATE = process.env.REACT_APP_START_DATE || ''
const END_DATE = process.env.REACT_APP_END_DATE || ''

const INFURA_ID = process.env.REACT_APP_INFURA_ID || 'cd82571d19ab490e828dd0f86ec3cbf0'

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
  LOBBY_CHECKIN_FREQUENCY,
  MIN_MOUSE_ENTROPY_SAMPLES,
  START_DATE,
  END_DATE,
  INFURA_ID,
}
