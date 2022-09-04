import styled from 'styled-components'
import { FONT_SIZE } from '../constants'

const PrimaryButton = styled.button`
  cursor: pointer;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.onPrimary};
  border-radius: 24px;
  border: none;
  min-width: 120px;
  padding: 8px 24px;
  font-weight: 600;
  font-size: ${FONT_SIZE.M};
  line-height: 20px;

  transition: all linear 0.1s;

  :hover {
    transform: translateY(-4px);
    box-shadow: 0px 16px 6px 2px #00000033;
  }
`

export { PrimaryButton }
