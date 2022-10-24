import styled from 'styled-components'
import { PrimaryButton } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  Over
} from '../components/Layout'
import EthImg from '../assets/eth.svg'
import GithubImg from '../assets/github.svg'
import { useAuthStore } from '../store/auth'
import BgImg from '../assets/img-graphic-base.svg'
import InnerWhite from '../assets/inner-white.svg'
import SnakeWhite from '../assets/snake-white.svg'
import OuterWhite from '../assets/outer-white.svg'
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
        <Bg src={BgImg} />
        <Img src={InnerWhite} />
        <Img src={OuterWhite} />
        <Img src={SnakeWhite} />
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
              The Ceremony requires souls of pure intent.
              Summoners show their integrity by unlocking with an address that
              has at least three sent transactions.
              </Desc>
              <Desc>
              It does not send any funds or permit any contracts.
              This method also allows us to deliver a POAP after the Ceremony.
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
            <PrimaryButton onClick={onSigninGithub} style={{ width: '280px' }}>
              <Trans i18nKey="signin.unlockWithGithub">
                Unlock with Github{' '}
                <ButtonIcon src={GithubImg} alt="Github icon" />
              </Trans>
            </PrimaryButton>
          </ButtonSection>
        </Wrap>
      </Container>
      </Over>
    </>
  )
}

const Bg = styled.img`
  z-index: -2;
  position: absolute;
  top: -9999px;
  bottom: -9999px;
  left: -9999px;
  right: -9999px;
  margin: auto;
`

const Img = styled.img`
  position: absolute;
  top: -9999px;
  bottom: -9999px;
  left: -9999px;
  right: -9999px;
  margin: auto;
`

const TextSection = styled.div`
  width: 360px;
`

const Desc = styled(Description)`
  margin: 0 0 20px;
  font-size: 18px;
`

const ButtonIcon = styled.img`
  margin-left: 16px;
`

export const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 120px;
  align-items: center;
  justify-content: space-around;
  margin-top: 12px;
`

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.error};
  text-align: center;
`

export default SigninPage
