// Import libraries
import { Trans, useTranslation } from 'react-i18next'
import { textSerif } from '../../style/utils'
import styled from 'styled-components'
// Import components
import Logo from '../Logo'
import LanguageSelector from '../LanguageSelector'
// Import constants
import { FONT_SIZE, BREAKPOINT, ENVIRONMENT } from '../../constants'
// Import hooks
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import { isMobile } from '../../utils'
import ROUTES from '../../routes'

const Header = () => {
  useTranslation()
  const navigate = useNavigate()
  const { nickname } = useAuthStore()
  return (
    <Container isMobile={isMobile()}>
      <Logo onClick={() => navigate(ROUTES.ROOT)} />

      {ENVIRONMENT === 'testnet' ? (
        <CenterSection isMobile={isMobile()}>
          <Trans i18nKey="header.ceremony">TEST CEREMONY</Trans>
        </CenterSection>
      ) : (
        <></>
      )}
      <Address>{nickname}</Address>
      <LanguageSelector />
    </Container>
  )
}

const Container = styled.header<{ isMobile: boolean }>`
  background-color: ${({ theme }) => theme.surface2};
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 1px 2px 6px 1px #b4b2b2;
  padding-inline: ${({ isMobile }) => (isMobile ? '5vw' : '21vw')};
  width: 100%;
  z-index: 3;
  position: absolute;
  top: 0;
`

const CenterSection = styled.div<{ isMobile: boolean }>`
  display: flex;
  color: #3e70bc;
  align-items: start;
  font-size: ${({ isMobile }) => (isMobile ? FONT_SIZE.S : FONT_SIZE.XXL)};
  letter-spacing: ${({ isMobile }) => (isMobile ? '0.5px' : '2px')};
  ${textSerif}
  font-weight: 800;
`

const Address = styled.div`
  max-width: 11ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: ${BREAKPOINT.M}) {
    display: none;
  }
`

export default Header
