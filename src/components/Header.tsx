import Logo from './Logo'
import Star from '../assets/star.svg'
import styled from 'styled-components'
import { FONT_SIZE } from '../constants'
import { useAuthStore } from '../store/auth'
import LanguageSelector from './LanguageSelector'
import { Trans, useTranslation } from 'react-i18next'
import useSequencerStatus from '../hooks/useSequencerStatus'

const Header = () => {
  useTranslation()
  const { nickname } = useAuthStore()
  const sequencerStatus = useSequencerStatus()

  return (
    <Container>
      <LeftSection>
        <Logo />
        <Border />
        <img src={Star} alt="sequencer status" />
        <SequencerStatus>
          <span>
            <Trans i18nKey="header.sequencer">Sequencer</Trans>
          </span>
          <Status
            style={{ color: sequencerStatus === 'Online' ? '#61cc61' : 'red' }}
          >
            {sequencerStatus}
          </Status>
        </SequencerStatus>
      </LeftSection>
      <RightSection>
      <div>
        {nickname ? (<span>{nickname.slice(0, 10)}</span>) : ("")}
      </div>
      <div>
        <LanguageSelector></LanguageSelector>
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
  padding: 0 10vw;
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
`

const Status = styled.span`
  font-weight: 700;
  font-size: ${FONT_SIZE.M};
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 120px;
`

export default Header
