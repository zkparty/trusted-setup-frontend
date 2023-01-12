import Logo from './Logo'
import ROUTES from '../routes'
import { Trans } from 'react-i18next'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { BREAKPOINT, FONT_SIZE } from '../constants'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <LeftSection>
        <Logo centerOnMobile onClick={() => navigate(ROUTES.ROOT)}/>
        <Copyright>
          <Trans i18nKey="footer.copyright">
            Built by the Ethereum Community - 2022
          </Trans>
        </Copyright>
      </LeftSection>
      <RightSection>
        <LinkGroup>
          <LinkItem href="https://github.com/zkparty/trusted-setup-frontend" target="_blank">
            GitHub
          </LinkItem>
          <LinkItem href="https://github.com/ethereum/kzg-ceremony" target="_blank">
            <Trans i18nKey="footer.documentation">
              Documentation
            </Trans>
          </LinkItem>
          <LinkItem href="#" target="_blank">
            <Trans i18nKey="footer.auditedIPFS">
              Audited IPFS version
            </Trans>
          </LinkItem>
          <LinkItem href="https://github.com/ethereum/kzg-ceremony/blob/main/KZG10-Ceremony-audit-report.pdf" target="_blank">
            <Trans i18nKey="footer.audit">
              Audit report
            </Trans>
          </LinkItem>
        </LinkGroup>
      </RightSection>
    </Container>
  )
}

const Container = styled.footer`
  background-color: ${({ theme }) => theme.surface2};
  /* height: 360px; */
  padding: 60px 10%;
  display: flex;
  justify-content: space-between;
  gap: 2.5rem;
  @media (max-width: ${BREAKPOINT.M}) {
    flex-direction: column;
    align-items: center;
  }
`

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: ${BREAKPOINT.M}) {
    align-items: center;
  }
  p {
    text-align: center;
  }
`

const RightSection = styled.div`
  display: flex;
`

const Copyright = styled.p`
  color: ${({ theme }) => theme.text};
`

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: ${BREAKPOINT.M}) {
    align-items: center;
  }
`

const LinkItem = styled.a`
  font-size: ${FONT_SIZE.L};
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 24px;
`

export default Footer
