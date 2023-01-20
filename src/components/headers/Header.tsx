// Import libraries
import { Trans, useTranslation } from 'react-i18next'
import { textSerif } from '../../style/utils'
import styled from 'styled-components'
// Import components
import Logo from '../Logo'
import LanguageSelector from '../LanguageSelector'
// Import image assets
import { ReactComponent as Star } from '../../assets/star.svg'
// Import constants
import { FONT_SIZE, BREAKPOINT, ENVIRONMENT, COMPUTE_DEADLINE } from '../../constants'
// Import hooks
import useSequencerStatus from '../../hooks/useSequencerStatus'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import { isMobile } from '../../utils'
import ROUTES from '../../routes'
import { Bold } from '../Text'

const Header = () => {

  useTranslation()
  const navigate = useNavigate()
  const { nickname } = useAuthStore()
  const { data } = useSequencerStatus()
  const isonline = data?.status === "Online"
  const indicatorColor = isonline ? "#61cc61" : "red"
  return (
    <Container isMobile={isMobile()}>
        <Logo onClick={() => navigate(ROUTES.ROOT)} />
        <div style={{ display: 'flex'}}>
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
        </div>
        <SequencerStatus style={{ fontSize: FONT_SIZE.XXS }}>
          <span style={{ paddingBottom: '2px' }}>
            <Bold>{ data?.num_contributions.toLocaleString('en-US',{maximumFractionDigits: 0}) } {' '}</Bold>
            <Trans i18nKey="header.totalContributions">total contributions</Trans>
          </span>
          <span style={{ paddingBottom: '2px' }}>
            <Bold>{ data?.lobby_size.toLocaleString('en-US',{maximumFractionDigits: 0}) } {' '}</Bold>
            <Trans i18nKey="header.participantsInLobby">participants in lobby</Trans>
          </span>
          <span>
            <Bold>{ ((data?.lobby_size! * COMPUTE_DEADLINE) / (60*60) ).toLocaleString('en-US',{maximumFractionDigits: 0}) } {' '}</Bold>
            <Trans i18nKey="header.waitTime"><Bold>hours</Bold> max. estimated wait time</Trans>
          </span>
        </SequencerStatus>
        { ENVIRONMENT === 'testnet' ?
          <CenterSection isMobile={isMobile()}>
            <Trans i18nKey="header.ceremony">TEST CEREMONY</Trans>
          </CenterSection>
          :
          <></>
        }
        <Address>
          {nickname}
        </Address>
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
  padding-inline: ${({isMobile}) => isMobile ? '5vw' : '22vw;'};
  width: 100%;
  z-index: 3;
  position: absolute;
  top: 0;
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
