import styled from 'styled-components'
import LogoImg from '../assets/logo.svg'
import { textSerif } from '../style/utils'
import { BREAKPOINT, FONT_SIZE } from '../constants'

type Props = {
  withVersion?: boolean
  centerOnMobile?: boolean
}

const Logo = ({ withVersion, centerOnMobile }: Props) => {
  return (
    <LogoSection centerOnMobile={centerOnMobile}>
      <img src={LogoImg} alt="Logo" />
      <LogoTextGroup>
        <LogoTextMain>KZG</LogoTextMain>
        <LogoTextMain>Ceremony</LogoTextMain>
        {withVersion && <LogoTextSub>Alpha</LogoTextSub>}
      </LogoTextGroup>
    </LogoSection>
  )
}

const LogoSection = styled.div<{ centerOnMobile?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${({ centerOnMobile }) => centerOnMobile && `
    @media (max-width: ${BREAKPOINT.M}) {
      flex-direction: column;
      & > div {
        align-items: center;
      }
    }
  `}
`

const LogoTextGroup = styled.div`
  display: flex;
  flex-direction: column;
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
