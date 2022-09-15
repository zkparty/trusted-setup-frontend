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

const SigninPage = () => {
  const { signinGithub, signinSIE } = useAuthenticate()

  const navigate = useNavigate()
  const onSigninSIE = () => {
    navigate(ROUTES.ENTROPY_INPUT)
  }

  const onSigninGithub = async () => {
    try {
      const result = await signinGithub()
      console.log(result)
      // set auth state and provider
      navigate(ROUTES.ENTROPY_INPUT)
    } catch (e) {
      console.log(e)
      // if lobby is full
      // navigate(ROUTES.LOBBY_FULL)
      // else, do nothing
    }
  }

  return (
    <Container>
      <Wrap>
        <Logo inverse />
        <Title>step forward.</Title>
        <Desc>
          You are few of citizens we are trust to form this power, please choose
          your preference to step forward
        </Desc>

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

export default SigninPage
