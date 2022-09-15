import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from './Button'
import { LinkText } from './Text'
import Logo from './Logo'
import ROUTES from '../routes'
import { useGithubUserInfo } from '../hooks/useUserInfo'

const Header = () => {
  const navigate = useNavigate()
  const q = useGithubUserInfo()

  return (
    <Container>
      <Logo />
      <ButtonGroup>
        <LinkText to={ROUTES.RECORD}>Record</LinkText>
        <PrimaryButton onClick={() => navigate(ROUTES.SIGNIN)}>
          Sign in
        </PrimaryButton>
      </ButtonGroup>
    </Container>
  )
}

const Container = styled.header`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
`

export default Header
