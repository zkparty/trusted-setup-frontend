import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from './Button'
import { LinkText } from './Text'
import Logo from './Logo'
import ROUTES from '../routes'
import { useAuthStore } from '../store/auth'
// import { useGithubUserInfo } from '../hooks/useUserInfo'

const Header = () => {
  const navigate = useNavigate()
  const { sessionId } = useAuthStore()

  return (
    <Container>
      <Logo />
      <ButtonGroup>
        {sessionId ? (
          <span>{sessionId.slice(0, 10)}</span>
        ) : (
          <PrimaryButton onClick={() => navigate(ROUTES.SIGNIN)}>
            Sign in
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
`

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
`

export default Header
