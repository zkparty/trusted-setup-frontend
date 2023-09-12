import styled from 'styled-components'
import { BREAKPOINT, FONT_SIZE } from '../constants'

const TextInput = styled.input`
  font-size: ${FONT_SIZE.M};
  font-weight: 400;
  padding: 8px 16px 8px 16px;
  border: solid 1px ${({ theme }) => theme.text};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  width: 95%;

  @media (max-width: ${BREAKPOINT.M}) {
    width: 100%;
  }
`

export default TextInput
