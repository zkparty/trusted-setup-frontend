import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import { PrimaryButtonLarge } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import {
  SingleContainer as Container,
  Over,
  SingleWrap as Wrap
} from '../components/Layout'
import Logo from '../components/Logo'
import ROUTES from '../routes'

const LobbyFullPage = () => {
  useTranslation()
  const navigate = useNavigate()

  return (
    <Over>
    <Container>
      <Wrap>
        <Logo />
        <Title>
          <Trans i18nKey="lobbyFull.title">
            Sum of the parts.
          </Trans>
        </Title>
        <Trans i18nKey="lobbyFull.description">
          <Desc>
          Please leave this guide open in the background -
          your contribution will be collected soon.
          </Desc>
          <Desc>
          Many others are alongside you in this Ceremony -
          your patience will be rewarded.
          </Desc>
        </Trans>
        <ButtonSection>
          <PrimaryButtonLarge
            onClick={() => {
              navigate(ROUTES.ROOT)
            }}
          >
            <Trans i18nKey="lobbyFull.button">
              Return to home
            </Trans>
          </PrimaryButtonLarge>
        </ButtonSection>
      </Wrap>
    </Container>
    </Over>
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
