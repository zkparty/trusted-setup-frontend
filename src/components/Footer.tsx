import styled from 'styled-components'
import Logo from './Logo'
import { FONT_SIZE } from '../constants'

const Footer = () => {
  return (
    <Container>
      <LeftSection>
        <Logo />
        <Copyright>Build by Ethereum Foundation, R&D team. 2022</Copyright>
      </LeftSection>
      <RightSection>
        <LinkGroup>
          <LinkItem href="#">Github</LinkItem>
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
  margin-inline-start: 40px;
  display: flex;
  flex-direction: column;
`

const LinkItem = styled.a`
  font-size: ${FONT_SIZE.L};
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 24px;
`

export default Footer
