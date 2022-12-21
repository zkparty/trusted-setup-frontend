import styled from 'styled-components'
import { CIRCLE_SIZE, FONT_SIZE } from '../constants'

// Single section page
export const SingleContainer = styled.div`
  color: ${({ theme }) => theme.text};
  height: 100vh;
  width: 100vw;

  transform: scale(0.85);
`

export const OverRelative = styled.div`
  height: 100vh;
  width: 100vw;

  position: relative;
`

export const Over = styled.div`
  height: 100vh;
  width: 100vw;

  overflow: hidden;
  position: absolute;
`

export const SingleWrap = styled.div`
  position: absolute;
  left: -20000px;
  right: -20000px;
  top: -20000px;
  bottom: -20000px;

  width: ${CIRCLE_SIZE}px;
  height: ${CIRCLE_SIZE}px;
  background-color: transparent;
  border-radius: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ColorWrap = styled(SingleWrap)`
  background-color: ${({ theme }) => theme.surface};
`

export const InnerWrap = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SingleButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  align-items: center;
  justify-content: space-around;
  margin-top: 40px;
`

export const TextSection = styled.div`
  width: 36ch;
  font-size: ${FONT_SIZE.SM};
  max-width: 100%;
`

export const Bg = styled.img`
  z-index: 0;
  position: absolute;
  top: -9999px;
  bottom: -9999px;
  left: -9999px;
  right: -9999px;
  margin: auto;
`

export const Img = styled.img`
  position: absolute;
  top: -9999px;
  bottom: -9999px;
  left: -9999px;
  right: -9999px;
  margin: auto;
`
