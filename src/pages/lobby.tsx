import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { css, keyframes } from 'styled-components'
import { Description, PageTitle } from '../components/Text'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  TextSection,
  Bg,
  Img
} from '../components/Layout'
import { LOBBY_CHECKIN_FREQUENCY } from '../constants'
import useTryContribute from '../hooks/useTryContribute'
import ROUTES from '../routes'
import { useContributionStore, Store } from '../store/contribute'
import { isSuccessRes, sleep } from '../utils'

import BgImg from '../assets/img-graphic-base.svg'
import InnerColor from '../assets/inner-color.svg'
import SnakeColor from '../assets/snake-color.svg'
import OuterColor from '../assets/outer-color.svg'
import PizzaInner from '../assets/crust.svg'
import PizzaOuter from '../assets/fig.svg'
import Explanation from '../components/Explanation'
import Footer from '../components/Footer'
import HeaderJustGoingBack from '../components/HeaderJustGoingBack'
import { Trans, useTranslation } from 'react-i18next'


const LobbyPage = () => {
  useTranslation()
  const [visible, setVisible] = useState(false)
  const [rounding, setRounding] = useState(false)

  const tryContribute = useTryContribute()
  const updateContribution = useContributionStore(
    (state: Store) => state.updateContribution
  )
  const navigate = useNavigate()

  useEffect(() => {
    // start coloring pizza img after 3 seconds and start circulating after that
    setTimeout(() => {
      setVisible(true)
    }, 1000)
    setTimeout(() => {
      setRounding(true)
    }, 4000)
  }, [])

  useEffect(() => {
    async function poll(): Promise<void> {
      // periodically post /slot/join
      const res = await tryContribute.mutateAsync()
      if (isSuccessRes(res) && res.hasOwnProperty('contributions')) {
        updateContribution(JSON.stringify(res))
        navigate(ROUTES.CONTRIBUTING)
      } else {
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
      <Container>
        <Bg src={BgImg} />

        <PizzaImg visible={visible} rounding={rounding} src={PizzaInner} />
        <PizzaImg visible={visible} rounding={rounding} src={PizzaOuter} />
        <Img src={InnerColor} />
        <Img src={OuterColor} />
        <Img src={SnakeColor} />
        <Wrap>
          <InnerWrap>
            <PageTitle>
              <Trans i18nKey="lobby.title">
                Waiting to be <br /> submitted
              </Trans>
            </PageTitle>
            <TextSection>
            <Trans i18nKey="lobby.description">
              <Description>
                Your contribution is ready to be accepted by the Sequencer.
                Please leave this guide open in the background and we will add
                your contribution to the others soon.
              </Description>
              <Description>Please leave this guide open and awake.</Description>
            </Trans>
            </TextSection>
          </InnerWrap>
        </Wrap>
      </Container>
      <Explanation />
      <Footer />
    </>
  )
}

const r = keyframes`
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const PizzaImg = styled(Img)<{ visible: boolean; rounding: boolean }>`
  transition: all 3s ease;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  ${({ rounding }) =>
    rounding
      ? css`
          animation: ${r} 10s ease-in-out infinite;
        `
      : ''}
`

const InnerWrap = styled.div`
  margin-top: 100px;
`

export default LobbyPage
