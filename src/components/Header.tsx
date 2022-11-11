// Import libraries
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'
// Import components
import Logo from './Logo'
import LanguageSelector from './LanguageSelector'
// Import image assets
import { ReactComponent as Star } from '../assets/star.svg'
// Import constants
import { FONT_SIZE, BREAKPOINT } from '../constants'
// Import hooks
import useSequencerStatus from '../hooks/useSequencerStatus'
import { useAuthStore } from '../store/auth'

const Header = () => {

  useTranslation()
  const { nickname } = useAuthStore()
  const sequencerStatus = useSequencerStatus()
  const isOnline = sequencerStatus === "Online"
  const indicatorColor = isOnline ? "#61cc61" : "red"
  return (
    <Container>
      <LeftSection>
        <Logo />
        <Border />
        <Indicator aria-label="sequencer status" isOnline={isOnline} color={indicatorColor} />
        <SequencerStatus>
          <span>
            <Trans i18nKey="header.sequencer">Sequencer</Trans>
          </span>
          <Status color={indicatorColor}>
            {isOnline ? (
              <Trans i18nKey="header.online">Online</Trans>
            ) : (
              <Trans i18nKey="header.offline">Offline</Trans>
            )}
          </Status>
        </SequencerStatus>
      </LeftSection>
      <RightSection>
        <div>
          {nickname ? (<span>{nickname.slice(0, 10)}</span>) : ("")}
        </div>
        <div>
          <LanguageSelector />
        </div>
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
  gap: 1rem;
`

const LeftSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  justify-content: space-between;
  shape-outside: circle();
`

const Indicator = styled(Star)<{ isOnline: boolean; color: string }>`
  transform: rotate(${({ isOnline }) => isOnline ? '0deg' : '45deg'});
  transition: all 0.2s;
  color: black;
  @media (max-width: ${BREAKPOINT.S}) {
    color: ${({ color }) => color};
  }
`

export default Header
