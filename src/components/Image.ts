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

export const PizzaImg = styled(Img)<{ rounding: boolean }>`
  height: auto;
  transition: all 3s ease;
  ${({ rounding }) =>
    rounding
      ? css`
          animation: ${r} 12s linear infinite;
        `
      : ''}

  animation: cssAnimation 0s 1.5s forwards;
  -o-animation: cssAnimation 0s 1.5s forwards;
  -moz-animation: cssAnimation 0s 1.5s forwards;

  animation-duration: 4s;
  opacity: 0;

  @keyframes cssAnimation {
    to   { opacity: 1; }
  }
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
