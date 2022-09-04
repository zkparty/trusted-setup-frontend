import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import { textSerif } from '../style/utils'
import { FONT_SIZE } from '../constants'
import ROUTES from '../routes'

const Footer = () => {
  return (
    <Container>
      <LeftSection>
        <LogoGroup>
          <img src={Logo} alt="Logo" />
          <LogoTextGroup>
            <LogoTextMain>KZG</LogoTextMain>
            <LogoTextMain>Ceremony</LogoTextMain>
          </LogoTextGroup>
        </LogoGroup>
        <Copyright>Build by Ethereum Foundation, R&D team. 2022</Copyright>
      </LeftSection>
      <RightSection>
        <LinkGroup>
          <SiteLinkItem to={ROUTES.RECORD}>Record</SiteLinkItem>
          <SiteLinkItem to={ROUTES.SIGNIN}>Sign in</SiteLinkItem>
        </LinkGroup>
        <LinkGroup>
          <LinkItem href="#">Github repo</LinkItem>
          <LinkItem href="#">Documentation</LinkItem>
          <LinkItem href="#">Audit report</LinkItem>
        </LinkGroup>
      </RightSection>
    </Container>
  )
}

const Container = styled.footer`
  background-color: #e4e4e4;
  height: 360px;
  padding: 120px 10%;
  display: flex;
  justify-content: space-between;
`

const LeftSection = styled.div``

const RightSection = styled.div`
  display: flex;
`

const LogoGroup = styled.div`
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

const Copyright = styled.p`
  color: ${({ theme }) => theme.textBlack};
`

const LinkGroup = styled.div`
  margin-left: 40px;
  display: flex;
  flex-direction: column;
`

const LinkItem = styled.a`
  font-size: ${FONT_SIZE.L};
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 24px;
`

const SiteLinkItem = styled(Link)`
  font-size: ${FONT_SIZE.L};
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 24px;
`

export default Footer
