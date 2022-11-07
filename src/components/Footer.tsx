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
          <LinkItem href="https://github.com/zkparty/trusted-setup-frontend">Github</LinkItem>
          <LinkItem href="https://github.com/ethereum/kzg-ceremony">Documentation</LinkItem>
          <LinkItem href="https://github.com/ethereum/kzg-ceremony/blob/main/KZG10-Ceremony-audit-report.pdf">Audit report</LinkItem>
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

export default Footer
