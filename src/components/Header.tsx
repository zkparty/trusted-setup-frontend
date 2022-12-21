// Import libraries
import { Trans, useTranslation } from 'react-i18next'
import { textSerif } from '../style/utils'
import styled from 'styled-components'
// Import components
import Logo from './Logo'
import LanguageSelector from './LanguageSelector'
// Import image assets
import { ReactComponent as Star } from '../assets/star.svg'
// Import constants
import { FONT_SIZE, BREAKPOINT, ENVIRONMENT } from '../constants'
// Import hooks
import useSequencerStatus from '../hooks/useSequencerStatus'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { isMobile } from '../utils'
import ROUTES from '../routes'

const Header = () => {

  useTranslation()
  const navigate = useNavigate()
  const { nickname } = useAuthStore()
  const { data } = useSequencerStatus()
  const isonline = data?.status === "Online"
  const indicatorColor = isonline ? "#61cc61" : "red"
  return (
    <Container>
      <LeftSection>
        <Logo onClick={() => navigate(ROUTES.ROOT)} />
        <Border />
        <Indicator aria-label="sequencer status" isonline={isonline.toString()} color={indicatorColor} />
        <SequencerStatus>
          <span>
            <Trans i18nKey="header.sequencer">Sequencer</Trans>
          </span>
          <Status color={indicatorColor}>
            {isonline ? (
              <Trans i18nKey="header.online">Online</Trans>
            ) : (
              <Trans i18nKey="header.offline">Offline</Trans>
            )}
          </Status>
        </SequencerStatus>
      </LeftSection>
      { ENVIRONMENT === 'testnet' ?
        <CenterSection isMobile={isMobile()}>
          <Trans i18nKey="header.ceremony">TEST CEREMONY</Trans>
        </CenterSection>
        :
        <></>
      }
      <RightSection>
        <Address>
          {nickname}
        </Address>
        <LanguageSelector />
      </RightSection>
    </Container>
  )
}

const Container = styled.header`
  background-color: ${({ theme }) => theme.surface2};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5vw;
  width: 100vw;
  z-index: 3;
  position: absolute;
  top: 0;
`

const LeftSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CenterSection = styled.div<{ isMobile: boolean }>`
  display: flex;
  color: #3e70bc;
  align-items: start;
  font-size: ${({isMobile}) => isMobile ? FONT_SIZE.S : FONT_SIZE.XXL};
  letter-spacing: ${({isMobile}) => isMobile ? '0.5px' : '2px'};
  ${textSerif}
  font-weight: 800;
`

const Border = styled.span`
  height: 40px;
  display: inline-block;
  border-right: solid 1px #9ea3a7;
  margin: 0 16px;
`

const SequencerStatus = styled.div`
  margin-inline-start: 12px;
  font-size: ${FONT_SIZE.XS};
  display: flex;
  flex-direction: column;
  @media (max-width: ${BREAKPOINT.S}) {
    display: none;
  }
`

const Status = styled.span<{ color: string }>`
  font-weight: 700;
  font-size: ${FONT_SIZE.M};
  color: ${({ color }) => color};
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const Indicator = styled(Star)<{ isonline: string; color: string }>`
  transform: rotate(${({ isonline }) => isonline === 'true' ? '0deg' : '45deg'});
  transition: all 0.2s;
  color: black;
  @media (max-width: ${BREAKPOINT.S}) {
    color: ${({ color }) => color};
  }
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
