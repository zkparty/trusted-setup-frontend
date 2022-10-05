import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { FONT_SIZE } from '../constants'
import ROUTES from '../routes'

const Footer = () => {
  return (
    <Container>
      <LeftSection>
        <Logo />
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
  background-color: ${({ theme }) => theme.surface2};
  height: 360px;
  padding: 120px 10%;
  display: flex;
  justify-content: space-between;
`

const LeftSection = styled.div``

const RightSection = styled.div`
  display: flex;
`

const Copyright = styled.p`
  color: ${({ theme }) => theme.text};
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
