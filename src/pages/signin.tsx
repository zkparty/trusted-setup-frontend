import styled from 'styled-components'
import { PrimaryButtonLarge } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  SingleButtonSection as ButtonSection
} from '../components/Layout'
import Logo from '../components/Logo'
import EthImg from '../assets/eth.svg'
import GithubImg from '../assets/github.svg'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../routes'
import useAuthenticate from '../hooks/useAuthenticate'
import { useAuthStore } from '../store/auth'
import { SERVER_ERROR } from '../constants'

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
    <Container>
      <Wrap>
        <Logo inverse />
        <Title>step forward.</Title>
        <Desc>
          You are indeed worthy, but are you willing? Demonstrate your
          commitment to the KZG by moving forward.
        </Desc>
        <Desc>
          Signing with your address does not send any funds or allow any
          contracts. This only allows us to deliver a totem to your address once
          the Ceremony has concluded.
        </Desc>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonSection>
          <PrimaryButtonLarge inverse onClick={onSigninSIE}>
            Sign in with Ethereum <ButtonIcon src={EthImg} alt="ETH icon" />
          </PrimaryButtonLarge>
          <PrimaryButtonLarge inverse onClick={onSigninGithub}>
            Sign in with Github <ButtonIcon src={GithubImg} alt="Github icon" />
          </PrimaryButtonLarge>
        </ButtonSection>
      </Wrap>
    </Container>
  )
}

const Title = styled(PageTitle)`
  color: ${({ theme }) => theme.onPrimary};
  margin-top: 0;
`

const Desc = styled(Description)`
  color: ${({ theme }) => theme.onPrimary};
`

const ButtonIcon = styled.img`
  margin-left: 16px;
`

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.error};
`

export default SigninPage
