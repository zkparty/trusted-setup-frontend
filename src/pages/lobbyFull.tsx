import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { PrimaryButtonLarge } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import {
  SingleContainer as Container,
  SingleWrap as Wrap
} from '../components/Layout'
import Logo from '../components/Logo'
import ROUTES from '../routes'

const LobbyFullPage = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Wrap>
        <Logo />
        <Title>Entropy & sorcery.</Title>
        <Desc>
          The hallway is packed with too many spell, please come back a little
          later...
        </Desc>
        <ButtonSection>
          <PrimaryButtonLarge
            onClick={() => {
              navigate(ROUTES.ROOT)
            }}
          >
            Return to home
          </PrimaryButtonLarge>
        </ButtonSection>
      </Wrap>
    </Container>
  )
}

const Title = styled(PageTitle)`
  color: ${({ theme }) => theme.text};
  margin-top: 0;
`

const Desc = styled(Description)`
  color: ${({ theme }) => theme.text};
`

const ButtonSection = styled.div`
  padding-bottom: 24px;
`

export default LobbyFullPage
