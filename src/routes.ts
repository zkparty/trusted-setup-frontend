const ROUTES = {
  ROOT: '/',
  SIGNIN: '/signin',
  ENTROPY_INPUT: '/entropy_input',
  DOUBLE_SIGN: '/double_sign',
  LOBBY_FULL: '/lobby_full',
  LOBBY: '/lobby',
  CONTRIBUTING: '/contributing',
  COMPLETE: '/complete',
  RECORD: '/record',
  REDIRECT: '/redirect'
}

export const MOBILE_FRIENDLY_ROUTES = [
  ROUTES.ROOT,
  ROUTES.DOUBLE_SIGN,
  // ROUTES.FAQ, // TODO: Uncomment when FAQ is available
  ROUTES.RECORD
]

export default ROUTES
