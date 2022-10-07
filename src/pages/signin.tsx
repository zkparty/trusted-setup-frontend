import styled from 'styled-components'
import { PrimaryButton } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import {
  SingleContainer as Container,
  SingleWrap as Wrap
} from '../components/Layout'
import EthImg from '../assets/eth.svg'
import GithubImg from '../assets/github.svg'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../routes'
import useAuthenticate from '../hooks/useAuthenticate'
import { useAuthStore } from '../store/auth'
import { SERVER_ERROR } from '../constants'
import BgImg from '../assets/img-graphic-base.svg'
import InnerWhite from '../assets/inner-white.svg'
import SnakeWhite from '../assets/snake-white.svg'
import OuterWhite from '../assets/outer-white.svg'
import HeaderJustGoingBack from '../components/HeaderJustGoingBack'

const SigninPage = () => {
  const { signinGithub, signinSIE } = useAuthenticate()
  const { error } = useAuthStore()

  const navigate = useNavigate()
  const onSigninSIE = async () => {
    const result = await signinSIE()
    if (result) {
      navigate(ROUTES.ENTROPY_INPUT)
    } else if (error === SERVER_ERROR.LOBBY_IS_FULL) {
      navigate(ROUTES.LOBBY_FULL)
    }
  }

  const onSigninGithub = async () => {
    const result = await signinGithub()
    if (result) {
      navigate(ROUTES.ENTROPY_INPUT)
    } else if (error === SERVER_ERROR.LOBBY_IS_FULL) {
      navigate(ROUTES.LOBBY_FULL)
    }
  }

  return (
    <>
      <HeaderJustGoingBack />
      <Container>
        <Bg src={BgImg} />
        <Img src={InnerWhite} />
        <Img src={OuterWhite} />
        <Img src={SnakeWhite} />
        <Wrap>
          <PageTitle>
            OPEN <br /> THE WAY
          </PageTitle>
          <TextSection>
            <Desc>
              To secure the integrity of the Ceremony, contributions must come
              from an identity above the minimum qualifications.
            </Desc>
            <Desc>
              Unlocking with Ethereum requires an address with at least two
              transactions sent from it, and does not send any funds or allow
              any contracts. This method also allows us to deliver an onchain
              memento after the Ceremony.
            </Desc>
          </TextSection>

          <ButtonSection>
            <PrimaryButton onClick={onSigninSIE} style={{ width: '360px' }}>
              Unlock with Ethereum <ButtonIcon src={EthImg} alt="ETH icon" />
            </PrimaryButton>
            <PrimaryButton onClick={onSigninGithub} style={{ width: '280px' }}>
              Unlock with Github{' '}
              <ButtonIcon src={GithubImg} alt="Github icon" />
            </PrimaryButton>
          </ButtonSection>
        </Wrap>
      </Container>
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

export default SigninPage
