import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/Error'
import { Description, PageTitle, Bold } from '../components/Text'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  Over,
  TextSection,
  InnerWrap
} from '../components/Layout'
import { LOBBY_CHECKIN_FREQUENCY, AVERAGE_CONTRIBUTION_TIME } from '../constants'
import useTryContribute from '../hooks/useTryContribute'
import ROUTES from '../routes'
import { useContributionStore, Store } from '../store/contribute'
import { isSuccessRes, sleep } from '../utils'
import { useAuthStore } from '../store/auth'
import HeaderJustGoingBack from '../components/headers/HeaderJustGoingBack'
import useSequencerStatus from '../hooks/useSequencerStatus'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ErrorRes } from '../types'

const LobbyPage = () => {
  const { t } = useTranslation()
  const { data } = useSequencerStatus()
  const { error, setError } = useAuthStore()
  const [showError, setShowError] = useState(error)
  const [ lobbySize, setLobbySize] = useState(data?.lobby_size || 0)
  const [ chances, setChances] = useState('0.0')

  const tryContribute = useTryContribute()
  const updateContribution = useContributionStore(
    (state: Store) => state.updateContribution
  )
  const navigate = useNavigate()

  useEffect(() => {

    async function poll(): Promise<void> {
      // periodically post /lobby/try_contribute
      let timeToContribute = false
      while (!timeToContribute){
        const res = await tryContribute.mutateAsync()
        if (isSuccessRes(res) && res.hasOwnProperty('contributions')) {
          timeToContribute = true
          updateContribution(JSON.stringify(res))
          navigate(ROUTES.CONTRIBUTING)
          return
        } else {
          const resError = res as ErrorRes
          switch (resError.code) {
            case 'TryContributeError::RateLimited':
              setError( t('error.tryContributeError.rateLimited') )
              console.log(resError.error)
              navigate(ROUTES.SIGNIN)
              break
            case 'TryContributeError::UnknownSessionId':
              setError( t('error.tryContributeError.unknownSessionId') )
              console.log(resError.error)
              navigate(ROUTES.SIGNIN)
              break
            case 'TryContributeError::AnotherContributionInProgress':
              console.log(resError.error)
              break
            case 'TryContributeError::LobbyIsFull':
              console.log(resError.error)
              navigate(ROUTES.LOBBY_FULL)
              break
            default:
              // StorageError and TaskError keep you in the lobby until sequencer gets fixed
              setShowError( t('error.tryContributeError.unknownError', resError) )
              console.log(resError)
              break
          }
          //  try again after LOBBY_CHECKIN_FREUQUENCY
          await sleep(LOBBY_CHECKIN_FREQUENCY)
        }
      }
    }
    poll()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setLobbySize(data?.lobby_size || 0)
    const slotsInOneHour = (60*60) / AVERAGE_CONTRIBUTION_TIME
    let chancesNumber = ((slotsInOneHour / lobbySize) * 100)
    if (chancesNumber > 100 || lobbySize === 0){
      chancesNumber = 99.9
    }
    setChances( chancesNumber.toLocaleString('en-US',{maximumFractionDigits: 1}) )
  }, [data, lobbySize])

  return (
    <>
      <HeaderJustGoingBack />
      <Over>
        <Container>
          <Wrap>
            <InnerWrap>
              <PageTitle>
                <Trans i18nKey="lobby.title">
                  Waiting to be <br /> submitted
                </Trans>
              </PageTitle>
              <TextSection>
                {showError && <ErrorMessage>{showError}</ErrorMessage>}
                <Desc>
                  <Bold>{lobbySize} </Bold>
                  <Trans i18nKey="lobby.lobby_size">
                    participants in the lobby
                  </Trans>
                </Desc>
                <Description>
                  <Bold>{chances + "%"} </Bold>
                  <Trans i18nKey="lobby.chance">
                    chance of contributing in the next hour
                  </Trans>
                </Description>
                <Trans i18nKey="lobby.description">
                  <Description>
                    Your entropy is ready to be accepted by the Sequencer.
                    Contributions are chosen randomly from the Lobby.
                  </Description>
                  <Description>
                    Trying to contribute from multiple tabs may result in errors,
                    please only use one tab. Leave this guide open with your
                    computer awake and your contribution will be combined
                    with the others soon.
                  </Description>
                </Trans>
              </TextSection>
            </InnerWrap>
          </Wrap>
        </Container>
      </Over>
    </>
  )
}

const Desc = styled(Description)`
  margin-bottom: 5px;
`

export default LobbyPage
