import styled from 'styled-components'
import LogoImg from '../assets/logo.svg'
import { textSerif } from '../style/utils'
import { FONT_SIZE } from '../constants'

const Logo = () => {
  return (
    <LogoSection>
      <img src={LogoImg} alt="Logo" />
      <LogoTextGroup>
        <LogoTextMain>KZG</LogoTextMain>
        <LogoTextMain>Ceremony</LogoTextMain>
      </LogoTextGroup>
    </LogoSection>
  )
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

const LogoTextMain = styled.span`
  font-size: ${FONT_SIZE.M};
  font-weight: 600;
  ${textSerif};
  line-height: 14px;
`

export default Logo
