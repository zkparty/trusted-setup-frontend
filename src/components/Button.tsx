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
    cursor: default;
  }
`

const PrimaryButtonInner = styled(Button)<{
  variant: string
  disabled?: boolean
}>`
  background-color: ${({ theme, variant }) =>
    variant === 'white' ? theme.surface2 : theme.primary};
  color: ${({ theme, disabled }) => (disabled ? theme.disabled : theme.text)};
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

const PrimaryButtonOuter = styled.div<{ disabled?: boolean }>`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.disabled : 'black'};
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

const PrimaryButtonWrapper = styled.div<{ disabled?: boolean }>`
  width: fit-content;
  display: flex;
  transition: all 0.2s ease;

  :hover:not([disabled]) {
    filter: drop-shadow(2px 6px 6px #b4b2b2);
  }
`

const PrimaryButton = ({ disabled, variant, ...props }: any) => {
  return (
    <PrimaryButtonWrapper disabled={disabled}>
      <PrimaryButtonOuter disabled={disabled}>
        <PrimaryButtonInner disabled={disabled} variant={variant} {...props} />
      </PrimaryButtonOuter>
    </PrimaryButtonWrapper>
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

const SecondaryButton = styled.button`
  border: none;
  cursor: pointer;
  background: transparent;

  font-size: ${FONT_SIZE.M};
  font-style: italic;
  font-weight: 500;

  :disabled {
    cursor: default;
  }
  :hover:not([disabled]) {
    filter: drop-shadow(0px 10px 12px #00000226);
  }
  ${textSerif}
`

export {
  PrimaryButton,
  PrimaryButtonLarge,
  BorderedButton,
  BorderedButtonLarge,
  SecondaryButton,
}
