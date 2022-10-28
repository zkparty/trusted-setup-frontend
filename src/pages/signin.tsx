import styled from 'styled-components'
import ErrorMessage from '../components/Error'
import SnakeProgress from '../components/SnakeProgress'
import { PrimaryButton, SecondaryButton } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  Over
} from '../components/Layout'
import EthImg from '../assets/eth.svg'
import { useAuthStore } from '../store/auth'
import { Trans, useTranslation } from 'react-i18next'
import HeaderJustGoingBack from '../components/HeaderJustGoingBack'
import api from '../api'

const SigninPage = () => {
  useTranslation()
  const { error } = useAuthStore()

  const onSigninSIE = async () => {
    const requestLinks = await api.getRequestLink()
    window.location.replace(requestLinks.eth_auth_url)
  }

  const onSigninGithub = async () => {
    const requestLinks = await api.getRequestLink()
    window.location.replace(requestLinks.github_auth_url)
  }

  return (
    <>
      <HeaderJustGoingBack />
      <Over>
        <Container>
        <SnakeProgress onSetPlayer={()=>{}} />
          <Wrap>
            <PageTitle>
              <Trans i18nKey="signin.title">
                OPEN <br /> THE WAY
              </Trans>
            </PageTitle>
            <TextSection>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <Trans i18nKey="signin.description">
                <Desc>
                  The Ceremony requires souls of pure intent. Summoners show
                  their integrity by unlocking with an address that has at least
                  three sent transactions.
                </Desc>
                <Desc>
                  It does not send any funds or permit any contracts. This
                  method also allows us to deliver a POAP after the Ceremony.
                </Desc>
              </Trans>
            </TextSection>

          <ButtonSection>
            <PrimaryButton onClick={onSigninSIE} style={{ width: '360px' }}>
              <Trans i18nKey="signin.unlockWithEthereum">
                Unlock with Ethereum{' '}
                <ButtonIcon src={EthImg} alt="ETH icon" />
              </Trans>
            </PrimaryButton>
            <SecondaryButton onClick={onSigninGithub} style={{ width: '280px' }}>
              <Trans i18nKey="signin.unlockWithGithub">
                or unlock with Github
              </Trans>
            </SecondaryButton>
          </ButtonSection>
        </Wrap>
      </Container>
      </Over>
    </>
  )
}

const TextSection = styled.div`
  width: 360px;
`

const Desc = styled(Description)`
  margin: 0 0 20px;
  font-size: 18px;
`

const ButtonIcon = styled.img`
  margin-inline-start: 16px;
`

export const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 120px;
  align-items: center;
  justify-content: space-around;
  margin-top: 12px;
`

export default SigninPage
