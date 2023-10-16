import ROUTES from '../routes'
import { isMobile } from '../utils'
import styled from 'styled-components'
import Footer from '../components/Footer'
import { useRef, useEffect } from 'react'
import { useAuthStore } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import FaqPage from '../components/landing/Faq'
import Header from '../components/headers/Header'
import { TextSection } from '../components/Layout'
import { Trans, useTranslation } from 'react-i18next'
import {
  CIRCLE_SIZE,
  ENVIRONMENT,
  FONT_SIZE,
  TRANSCRIPT_HASH
} from '../constants'
import {
  Bold,
  Description,
  ItalicSubTitle,
  PageTitle
} from '../components/Text'
import Explanation from '../components/landing/Explanation'
import { BgColoredContainer } from '../components/Background'
import LatestRecords from '../components/landing/LatestRecords'
import OtherResources from '../components/landing/OtherResources'
import { PrimaryButton } from '../components/Button'
import LatestContributionsBorder from '../assets/latest-contributions-border.svg'

const LandingPage = () => {
  useTranslation()
  const ref = useRef<null | HTMLElement>(null)
  const navigate = useNavigate()
  const { signout } = useAuthStore()

  useEffect(() => {
    ;(async () => {
      signout()
      await navigator.serviceWorker.ready
      // eslint-disable-next-line no-restricted-globals
      if (!self.crossOriginIsolated) {
        console.log('refreshing...')
        navigate(0)
      } else {
        console.log(
          `${window.crossOriginIsolated ? '' : 'not'} x-origin isolated`
        )
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onClickVerify = () => {
    navigate(ROUTES.RECORD)
  }

  return (
    <BgColoredContainer>
      <Header />
      <TopSection>
        <WhiteBackground>
          <BgColor />
          <PageTitle style={{ marginTop: '30px' }}>
            <Trans i18nKey="landing.title">SUMMONING GUIDES</Trans>
          </PageTitle>
          {ENVIRONMENT === 'testnet' ? (
            ''
          ) : (
            <>
              <ItalicSubTitle style={{ marginBottom: '20px' }}>
                <Trans i18nKey="landing.over">The ceremony is over</Trans>
              </ItalicSubTitle>
              <ItalicSubTitle
                style={{ fontSize: FONT_SIZE.SM, marginBottom: '0px' }}
              >
                <Bold>{'Transcript sha256 hash: '}</Bold>
              </ItalicSubTitle>
              <ItalicSubTitle
                style={{
                  fontSize: FONT_SIZE.SM,
                  width: isMobile() ? '240px' : '55ch',
                  wordBreak: 'break-all',
                  marginBottom: '25px'
                }}
              >
                {TRANSCRIPT_HASH}
              </ItalicSubTitle>
            </>
          )}
          <TextSection style={{ width: '55ch' }}>
            <Trans i18nKey="landing.description-over">
              <Description>
                Whispers from the shadows tell of a powerful spirit Dankshard,
                who will open the next chapter of Ethereum scalability.
                Contributors have come together to summon its power.
              </Description>
              <Description>
                Magic math completed - check out your participation in the
                ceremony:
              </Description>
            </Trans>
          </TextSection>
          <PrimaryButton onClick={onClickVerify} disabled={isMobile()}>
            {isMobile() ? (
              <Trans i18nKey="landing.button-mobile">Proceed on desktop</Trans>
            ) : (
              <Trans i18nKey="landing.button-verify">Verify transcript</Trans>
            )}
          </PrimaryButton>
          <OtherResources />
        </WhiteBackground>
      </TopSection>
      <Explanation refFromLanding={ref} />
      <LatestRecords />
      <FaqPage />
      <Footer />
    </BgColoredContainer>
  )
}

const Section = styled.section`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TopSection = styled(Section)`
  border: min(12vw, 8rem) solid;
  border-image-source: url(${LatestContributionsBorder});
  border-image-slice: 150;
  border-image-repeat: round;
  margin: 6rem auto;
  padding: 0px;
  box-sizing: border-box;
  width: 100%;
  max-width: 100ch;
`

const BgColor = styled.div`
  background-color: ${({ theme }) => theme.surface};
  height: ${CIRCLE_SIZE}px;
  width: ${CIRCLE_SIZE}px;
  max-width: 100%;
  border-radius: 50%;
  box-shadow: 0 0 200px 120px ${({ theme }) => theme.surface};
  position: absolute;
  z-index: -1;
  margin-top: -30px;
`

const WhiteBackground = styled.div`
  background: white;
  width: 100%;
  padding-block: 5vh;
  padding-inline: 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default LandingPage
