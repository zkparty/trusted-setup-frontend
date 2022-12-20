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
import { LOBBY_CHECKIN_FREQUENCY } from '../constants'
import useTryContribute from '../hooks/useTryContribute'
import ROUTES from '../routes'
import { useContributionStore, Store } from '../store/contribute'
import { isSuccessRes, sleep } from '../utils'
import { useAuthStore } from '../store/auth'
import HeaderJustGoingBack from '../components/HeaderJustGoingBack'
import useSequencerStatus from '../hooks/useSequencerStatus'
import { Trans, useTranslation } from 'react-i18next'
import { ErrorRes } from '../types'

const LobbyPage = () => {
  const { t } = useTranslation()
  const { error, setError } = useAuthStore()
  const [showError, setShowError] = useState(error)

  const { data } = useSequencerStatus()
  const tryContribute = useTryContribute()
  const updateContribution = useContributionStore(
    (state: Store) => state.updateContribution
  )
  const navigate = useNavigate()

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    if (!self.crossOriginIsolated) {
      console.log('refreshing...')
      navigate(0)
    } else {
      console.log(`${window.crossOriginIsolated ? "" : "not"} x-origin isolated`)
      console.log(`secure context?: ${window.isSecureContext}`)
    }

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
                <Description>
                  <Bold>{data?.lobby_size} </Bold>
                  <Trans i18nKey="looby.lobby_size">
                    participants in the lobby.
                  </Trans>
                </Description>
                <Trans i18nKey="lobby.description">
                  <Description>
                    Your contribution is ready to be accepted by the
                    Sequencer. Please leave this guide open in the background
                    and we will add your contribution to the others soon.
                  </Description>
                  <Description>
                    Please leave this guide open and awake.
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

export default LobbyPage
