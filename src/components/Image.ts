import styled, { css, keyframes } from 'styled-components'

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
`

export const Img = styled(Base)`
  position: absolute;
  top: -9999px;
  bottom: -9999px;
  left: -9999px;
  right: -9999px;
  margin: auto;
`

const r = keyframes`
  0%   { transform: rotate(0deg) scale(0.85); }
  100% { transform: rotate(360deg) scale(0.85); }
`

export const PizzaImg = styled(Img)<{ rounding: boolean }>`
  transition: all 3s ease;
  ${({ rounding }) =>
    rounding
      ? css`
          animation: ${r} 12s linear infinite;
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
`
