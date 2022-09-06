import styled from 'styled-components'
import { SigninButton } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import Logo from '../components/Logo'
import EthImg from '../assets/eth.svg'
import GithubImg from '../assets/github.svg'

const SigninPage = () => {
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
          <SigninButton inverse>
            Sign in with Ethereum <ButtonIcon src={EthImg} alt="ETH icon" />
          </SigninButton>
          <SigninButton inverse>
            Sign in with Github <ButtonIcon src={GithubImg} alt="Github icon" />
          </SigninButton>
        </ButtonSection>
      </Wrap>
    </Container>
  )
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.primary};
  min-height: 100vh;
  padding-top: 120px;
`

const Wrap = styled.div`
  width: 80%;
  margin: auto;
`

const Title = styled(PageTitle)`
  color: ${({ theme }) => theme.onPrimary};
  margin-top: 0;
`

const Desc = styled(Description)`
  color: ${({ theme }) => theme.onPrimary};
`

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-around;
  width: 340px;
`

const ButtonIcon = styled.img`
  margin-left: 16px;
`

export default SigninPage
