import styled from 'styled-components'
import LogoImg from '../assets/logo.svg'
import LogoInvImg from '../assets/logo-inverse.svg'
import { textSerif } from '../style/utils'
import { FONT_SIZE } from '../constants'

type Props = {
  inverse?: boolean
  hideVersion?: boolean
}

const Logo = ({ inverse, hideVersion }: Props) => {
  return (
    <LogoSection>
      <img src={inverse ? LogoInvImg : LogoImg} alt="Logo" />
      <LogoTextGroup>
        <LogoTextMain inverse={inverse}>KZG</LogoTextMain>
        <LogoTextMain inverse={inverse}>Ceremony</LogoTextMain>
        {!hideVersion && <LogoTextSub inverse={inverse}>Alpha</LogoTextSub>}
      </LogoTextGroup>
    </LogoSection>
  )
}

type InversibleProps = {
  inverse?: boolean
}

const LogoSection = styled.div`
  display: flex;
  align-items: center;
`

const LogoTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`

const LogoTextMain = styled.span<InversibleProps>`
  font-size: ${FONT_SIZE.M};
  font-weight: 600;
  ${textSerif};
  line-height: 14px;
  ${({ inverse, theme }) => (inverse ? `color: ${theme.onPrimary};` : '')}
`

const LogoTextSub = styled.span<InversibleProps>`
  font-size: ${FONT_SIZE.XS};
  color: ${({ inverse, theme }) => (inverse ? theme.onPrimary : '#494e53')};
  ${textSerif};
`

export default Logo
