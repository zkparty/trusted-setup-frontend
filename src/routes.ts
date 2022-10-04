import { useMemo } from 'react'

const ROUTES = {
  ROOT: '/',
  LANDING: '/landing',
  SIGNIN: '/signin',
  ENTROPY_INPUT: '/entropy_input',
  LOBBY_FULL: '/lobby_full',
  LOBBY: '/lobby',
  CONTRIBUTING: '/contributing',
  COMPLETE: '/complete',
  RECORD: '/record',
  GATE: '/gate',
  MOBILE: '/mobile'
}

const INVERSE_ROUTES = [ROUTES.SIGNIN, ROUTES.ENTROPY_INPUT, ROUTES.MOBILE]

export function useIsInverse(route: string) {
  return useMemo(() => {
    return INVERSE_ROUTES.includes(route)
  }, [route])
}

export default ROUTES
