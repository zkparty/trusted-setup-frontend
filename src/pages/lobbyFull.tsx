import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import { PrimaryButtonLarge } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import HeaderJustGoingBack from '../components/headers/HeaderJustGoingBack'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  OverRelative,
  TextSection,
  InnerWrap,
  Over,
} from '../components/Layout'
import ROUTES from '../routes'
import useLanguage from '../hooks/useLanguage'

const LobbyFullPage = () => {
  useLanguage()
  useTranslation()
  const navigate = useNavigate()

  return (
    <>
      <HeaderJustGoingBack />
      <OverRelative>
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
                    There are too many summoners at this time, please come back
                    in a few hours!
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
      </OverRelative>
    </>
  )
}

const ButtonSection = styled.div`
  padding-bottom: 24px;
`

export default LobbyFullPage
