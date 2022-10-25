import Logo from './Logo'
import ROUTES from '../routes'
import Star from '../assets/star.svg'
import styled from 'styled-components'
import { FONT_SIZE } from '../constants'
import { PrimaryButton } from './Button'
import { useAuthStore } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import LanguageSelector from './LanguageSelector'
import { Trans, useTranslation } from 'react-i18next'
import useSequencerStatus from '../hooks/useSequencerStatus'

const Header = () => {
  useTranslation()
  const navigate = useNavigate()
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
      <LanguageSelector></LanguageSelector>
      <ButtonGroup>
        {nickname ? (
          <span>{nickname.slice(0, 10)}</span>
        ) : (
          <PrimaryButton
            onClick={() => navigate(ROUTES.SIGNIN)}
            variant="white"
          >
            <Trans i18nKey="header.button">Unlock</Trans>
          </PrimaryButton>
        )}
      </ButtonGroup>
    </Container>
  )
}

const Container = styled.header`
  background-color: ${({ theme }) => theme.surface2};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
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
  margin-left: 12px;
  font-size: ${FONT_SIZE.XS};
  display: flex;
  flex-direction: column;
`

const Status = styled.span`
  font-weight: 700;
  font-size: ${FONT_SIZE.M};
`

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 120px;
`

export default Header
