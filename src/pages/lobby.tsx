import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/Error'
import { Description, PageTitle } from '../components/Text'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  Over,
  TextSection,
  OverRelative,
  InnerWrap
} from '../components/Layout'
import { LOBBY_CHECKIN_FREQUENCY } from '../constants'
import useTryContribute from '../hooks/useTryContribute'
import ROUTES from '../routes'
import { useContributionStore, Store } from '../store/contribute'
import { isSuccessRes, sleep } from '../utils'

import Explanation from '../components/Explanation'
import Footer from '../components/Footer'
import HeaderJustGoingBack from '../components/HeaderJustGoingBack'
import { Trans, useTranslation } from 'react-i18next'
import { ErrorRes } from '../types'

const LobbyPage = () => {
  useTranslation()
  const [error, setError] = useState<null | string>(null)

  const tryContribute = useTryContribute()
  const updateContribution = useContributionStore(
    (state: Store) => state.updateContribution
  )
  const navigate = useNavigate()

  useEffect(() => {
    async function poll(): Promise<void> {
      // periodically post /slot/join
      const res = await tryContribute.mutateAsync()
      if (isSuccessRes(res) && res.hasOwnProperty('contributions')) {
        updateContribution(JSON.stringify(res))
        navigate(ROUTES.CONTRIBUTING)
      } else {
        const resError = res as ErrorRes
        switch (resError.code) {
          case 'TryContributeError::RateLimited':
            setError(resError.error)
            break
          case 'TryContributeError::UnknownSessionId':
            setError(
              resError.error +
                '. You might have taken more time than expected in the lobby. Please reload and sign in again with a different account'
            )
            break
          case 'TryContributeError::AnotherContributionInProgress':
            setError(resError.error)
            break
          default:
            setError('Unknown error code: ' + resError.code)
            break
        }
        //  try again after LOBBY_CHECKIN_FREUQUENCY
        await sleep(LOBBY_CHECKIN_FREQUENCY)
        return await poll()
      }
    }
    poll()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <HeaderJustGoingBack />
      <OverRelative>
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
                  {error && <ErrorMessage>{error}</ErrorMessage>}
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
      </OverRelative>
      <Explanation />
      <Footer />
    </>
  )
}

export default LobbyPage
