import styled from 'styled-components'
import { FONT_SIZE } from '../constants'
import { textSerif } from '../style/utils'

const Button = styled.button`
  cursor: pointer;
  /* border-radius: 100px; */
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${FONT_SIZE.M};
  font-weight: 600;

  :disabled {
    transform: scale(0.9);
    box-shadow: none;
    opacity: 60%;
  }
`

const PrimaryButtonInner = styled(Button)`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.disabled : theme.primary};
  color: ${({ theme }) => theme.text};
  border: none;
  min-width: 120px;
  padding: 8px 24px;
  line-height: 20px;
  height: 48px;
  clip-path: polygon(
    25px 2px,
    3px 50%,
    25px calc(100% - 2px),
    calc(100% - 25px) calc(100% - 2px),
    calc(100% - 3px) 50%,
    calc(100% - 25px) 2px
  );
  ${textSerif}
`

const PrimaryButtonOuter = styled.div`
  background-color: black;
  clip-path: polygon(
    24px 0,
    0 50%,
    24px 100%,
    calc(100% - 24px) 100%,
    100% 50%,
    calc(100% - 24px) 0
  );
  display: inline;
  width: fit-content;
`

const PrimaryButton = (props: any) => {
  return (
    <PrimaryButtonOuter>
      <PrimaryButtonInner {...props} />
    </PrimaryButtonOuter>
  )
}

const PrimaryButtonLarge = styled(PrimaryButton)`
  padding: 24px 32px;
  min-width: 240px;
  font-size: ${FONT_SIZE.L};
`

const BorderedButton = styled(Button)`
  background: transparent;
  border: solid 1px ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};

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
