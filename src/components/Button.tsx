import styled from 'styled-components'
import { FONT_SIZE } from '../constants'

const PrimaryButton = styled.button<{ inverse?: boolean }>`
  cursor: pointer;
  background-color: ${({ theme, inverse }) =>
    inverse ? theme.onPrimary : theme.primary};
  color: ${({ theme, inverse }) => (inverse ? theme.primary : theme.onPrimary)};
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

const SigninButton = styled(PrimaryButton)`
  padding: 24px 32px;
  border-radius: 38px;
  font-size: ${FONT_SIZE.L};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export { PrimaryButton, SigninButton }
