const FONT_SIZE = {
  XXS: '10px',
  XS: '12px',
  S: '14px',
  M: '16px',
  L: '20px',
  XL: '24px',
  XXL: '32px'
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

const API_ROOT = 'http://localhost:8888'

const SERVER_ERROR = {
  LOBBY_IS_FULL: 'lobby is full'
}

const LOBBY_CHECKIN_FREQUENCY = 30000

export {
  FONT_SIZE,
  SPACE,
  RADIUS,
  API_ROOT,
  SERVER_ERROR,
  LOBBY_CHECKIN_FREQUENCY
}
