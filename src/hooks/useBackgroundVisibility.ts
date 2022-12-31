import { useLocation } from 'react-router-dom'
import ROUTES from '../routes'
import { isBgRoute } from '../utils'

type ColorState = 'hidden' | 'white' | 'color' | 'white-no-pizza'
type AnimateState = ColorState | 'animate'

type InnerState = ColorState
type OuterState = ColorState
type BgState = AnimateState
type DarkState = 'hidden' | 'true'
type SnakeState = ColorState | 'progress'
type PizzaState = AnimateState

type Visibilities = {
  bg: BgState
  dark: DarkState
  inner: InnerState
  outer: OuterState
  snake: SnakeState
  pizza: PizzaState
}

const initial: Visibilities = {
  bg: 'hidden',
  dark: 'hidden',
  inner: 'hidden',
  outer: 'hidden',
  snake: 'hidden',
  pizza: 'hidden'
}

export default function useBackgroundVisibility(): Visibilities {
  const location = useLocation()

  if (!isBgRoute(location.pathname)) return initial

  if (location.pathname === ROUTES.SIGNIN)
    return {
      bg: 'white',
      dark: 'hidden',
      inner: 'color',
      outer: 'white',
      snake: 'color',
      pizza: 'hidden'
    }

  if (location.pathname === ROUTES.ENTROPY_INPUT)
    return {
      bg: 'white',
      dark: 'hidden',
      inner: 'hidden',
      outer: 'hidden',
      snake: 'progress',
      pizza: 'hidden'
    }

  if (location.pathname === ROUTES.LOBBY)
    return {
      bg: 'white-no-pizza',
      dark: 'hidden',
      inner: 'color',
      outer: 'color',
      snake: 'color',
      pizza: 'animate'
    }
  if (location.pathname === ROUTES.LOBBY_FULL)
    return {
      bg: 'white',
      dark: 'hidden',
      inner: 'color',
      outer: 'color',
      snake: 'color',
      pizza: 'hidden'
    }

  if (location.pathname === ROUTES.DOUBLE_SIGN)
    return {
      bg: 'white',
      dark: 'hidden',
      inner: 'color',
      outer: 'color',
      snake: 'color',
      pizza: 'hidden'
    }

  if (location.pathname === ROUTES.CONTRIBUTING)
    return {
      bg: 'animate',
      dark: 'hidden',
      inner: 'color',
      outer: 'color',
      snake: 'color',
      pizza: 'color'
    }

  if (location.pathname === ROUTES.COMPLETE)
    return {
      bg: 'color',
      dark: 'hidden',
      inner: 'color',
      outer: 'color',
      snake: 'color',
      pizza: 'color'
    }

  return initial
}
