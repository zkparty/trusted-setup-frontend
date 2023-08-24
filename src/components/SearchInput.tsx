import styled from 'styled-components'
import { BREAKPOINT, FONT_SIZE } from '../constants'
import SearchIcon from '../assets/search.svg'

const SearchInput = styled.input`
  font-size: ${FONT_SIZE.M};
  font-weight: 400;
  padding: 8px 40px 8px 16px;
  border: solid 1px ${({ theme }) => theme.text};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  background: url(${SearchIcon}) no-repeat scroll right 12px bottom 50%;
  width: 70%;

  @media (max-width: ${BREAKPOINT.M}) {
    width: 100%;
  }
`

export default SearchInput
