import styled, { css, keyframes } from 'styled-components'
import { CIRCLE_SIZE } from '../constants'

const Base = styled.img<{ visible?: boolean }>`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: scale(0.85);
  transition: all 1s ease;
`

export const Bg = styled(Base)`
  z-index: -2;
  position: absolute;
  top: -9999px;
  bottom: -9999px;
  left: -9999px;
  right: -9999px;
  margin: auto;
  height: auto;
  width: ${CIRCLE_SIZE + 1244}px;
`

export const Img = styled(Base)`
  position: absolute;
  top: -9999px;
  bottom: -9999px;
  left: -9999px;
  right: -9999px;
  margin: auto;
  height: auto;
`

const r = keyframes`
  0%   { transform: rotate(0deg) scale(0.85); }
  100% { transform: rotate(360deg) scale(0.85); }
`

const o = keyframes`
  to   { opacity: 1; }
`

export const PizzaImg = styled(Img)<{ rounding: boolean }>`
  height: auto;
  transition: all 3s ease;
  opacity: 0;
  animation: ${o} 0s 1.5s forwards;
  animation-duration: fadeInAnimation 3s;
  ${({ rounding }) =>
    rounding
      ? css`
          animation: ${r} 40s linear infinite, ${o} 3s forwards;
        `
      : ''}
`

const p = keyframes`
  0%   { opacity: 0; }
  50% {opacity: 1;}
  100% { opacity: 0; }
`

export const BgPulse = styled(Bg)`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  animation: ${p} 10s ease-in-out infinite;
  height: auto;
  width: ${CIRCLE_SIZE + 1244}px;
`
