import styled from 'styled-components'
import LogoImg from '../assets/logo.svg'
import { textSerif } from '../style/utils'
import { FONT_SIZE } from '../constants'

type Props = {
  withVersion?: boolean
}

const Logo = ({ withVersion }: Props) => {
  return (
    <LogoSection>
      <img src={LogoImg} alt="Logo" />
      <LogoTextGroup>
        <LogoTextMain>KZG</LogoTextMain>
        <LogoTextMain>Ceremony</LogoTextMain>
        {withVersion && <LogoTextSub>Alpha</LogoTextSub>}
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
  margin-inline-start: 8px;
`

const LogoTextMain = styled.span`
  font-size: ${FONT_SIZE.M};
  font-weight: 600;
  ${textSerif};
  line-height: 14px;
`

const LogoTextSub = styled.span`
  font-size: ${FONT_SIZE.XS};
  color: #494e53;
  ${textSerif};
`

export default Logo
