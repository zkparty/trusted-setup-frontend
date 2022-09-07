import styled from 'styled-components'

// Single section page
export const SingleContainer = styled.div`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.onPrimary};
  min-height: 100vh;
  padding-top: 120px;
`

export const SingleWrap = styled.div`
  width: 80%;
  margin: auto;
`

export const SingleButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-around;
  width: 340px;
`

//
