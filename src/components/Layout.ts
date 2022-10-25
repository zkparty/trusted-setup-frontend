import styled from 'styled-components'

// Single section page
export const SingleContainer = styled.div`
  color: ${({ theme }) => theme.text};
  height: 100vh;
  width: 100vw;

  transform: scale(0.85);
`

export const Over = styled.div`
  height: 100vh;
  width: 100vw;

  min-height: 820px;
  min-width: 960px;
  overflow: hidden;
  position: absolute;
`

export const SingleWrap = styled.div`
  position: absolute;
  left: -20000px;
  right: -20000px;
  top: -20000px;
  bottom: -20000px;

  width: 542px;
  height: 542px;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 50%;
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
  width: 360px;
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
