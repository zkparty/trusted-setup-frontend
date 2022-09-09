import styled from 'styled-components'
import { FONT_SIZE } from '../constants'

const Button = styled.button`
  cursor: pointer;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${FONT_SIZE.M};
  font-weight: 600;

  transition: all linear 0.1s;

  :hover {
    transform: translateY(-4px);
    box-shadow: 0px 16px 6px 2px #00000033;
  }
`

const PrimaryButton = styled(Button)<{ inverse?: boolean }>`
  background-color: ${({ theme, inverse }) =>
    inverse ? theme.onPrimary : theme.primary};
  color: ${({ theme, inverse }) => (inverse ? theme.primary : theme.onPrimary)};
  border: none;
  min-width: 120px;
  padding: 8px 24px;
  line-height: 20px;
`

const PrimaryButtonLarge = styled(PrimaryButton)`
  padding: 24px 32px;
  border-radius: 38px;
  min-width: 240px;
  font-size: ${FONT_SIZE.L};
`

const BorderedButton = styled(Button)<{ inverse?: boolean }>`
  background: transparent;
  border: solid 1px
    ${({ theme, inverse }) => (inverse ? theme.onPrimary : theme.primary)};
  color: ${({ theme, inverse }) => (inverse ? theme.onPrimary : theme.primary)};

  min-width: 120px;
`

const BorderedButtonLarge = styled(BorderedButton)`
  padding: 24px 32px;
  border-radius: 38px;
  min-width: 240px;
  font-size: ${FONT_SIZE.L};
`

export {
  PrimaryButton,
  PrimaryButtonLarge,
  BorderedButton,
  BorderedButtonLarge
}
