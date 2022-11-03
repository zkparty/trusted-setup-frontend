import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import { PrimaryButtonLarge } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  TextSection,
  InnerWrap,
  Over,
} from '../components/Layout'
import ROUTES from '../routes'

const LobbyFullPage = () => {
  useTranslation()
  const navigate = useNavigate()

  return (
    <Over>
      <Container>
        <Wrap>
        <InnerWrap>
          <PageTitle>
            <Trans i18nKey="lobbyFull.title">Too much <br /> magic</Trans>
          </PageTitle>
          <TextSection>
            <Trans i18nKey="lobbyFull.description">
              <Description>
              Too many summoners at this time, please come back later.
              Close this window and try again in a moment to check
              if there is a slot available in the lobby.
              </Description>
            </Trans>
          </TextSection>
          <ButtonSection>
            <PrimaryButtonLarge
              onClick={() => {
                navigate(ROUTES.ROOT)
              }}
            >
              <Trans i18nKey="lobbyFull.button">Return to home</Trans>
            </PrimaryButtonLarge>
          </ButtonSection>
        </InnerWrap>
        </Wrap>
      </Container>
    </Over>
  )
}

const ButtonSection = styled.div`
  padding-bottom: 24px;
`

export default LobbyFullPage
