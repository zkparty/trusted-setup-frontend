import styled from 'styled-components'
import Footer from '../components/Footer'
import { useRef, useEffect } from 'react'
import { useAuthStore } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import FaqPage from '../components/landing/Faq'
import useCountdown from '../hooks/useCountdown'
import Header from '../components/headers/Header'
import { TextSection } from '../components/Layout'
import { Trans, useTranslation } from 'react-i18next'
import ExternalLink from '../components/ExternalLink'
import { CIRCLE_SIZE, END_DATE, ENVIRONMENT, FONT_SIZE } from '../constants'
import { Description, ItalicSubTitle, PageTitle } from '../components/Text'
import Explanation from '../components/landing/Explanation'
import { BgColoredContainer } from '../components/Background'
import LatestRecords from '../components/landing/LatestRecords'
import LatestContributionsBorder from '../assets/latest-contributions-border.svg'

const LandingPage = () => {
  useTranslation()
  const ref = useRef<null | HTMLElement>(null)
  const navigate = useNavigate()
  const { signout } = useAuthStore()
  const [days, hours, minutes, seconds] = useCountdown(END_DATE)

  useEffect(() => {
    (async () => {
      signout()
      await navigator.serviceWorker.ready
      // eslint-disable-next-line no-restricted-globals
      if (!self.crossOriginIsolated) {
        console.log('refreshing...')
        navigate(0)
      } else {
        console.log(`${window.crossOriginIsolated ? "" : "not"} x-origin isolated`)
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BgColoredContainer>
      <Header />
      <TopSection>
        <WhiteBackground>
        <BgColor />
        <PageTitle style={{ marginTop: '30px' }}>
          <Trans i18nKey="landing.title">
            SUMMONING GUIDES
          </Trans>
        </PageTitle>
        { ENVIRONMENT === 'testnet' ?
          ''
          :
          <>
            <ItalicSubTitle style={{ marginBottom: '0px' }}>
              <Trans i18nKey="landing.period">Special contributions</Trans>
              {' - '+days+' : '+hours+' : '+minutes+' : '+seconds}
            </ItalicSubTitle>
            <ItalicSubTitle style={{ fontSize: FONT_SIZE.S, marginBottom: '20px' }}>
              <Trans i18nKey="landing.special">the Ceremony is only accepting special contributions at this time</Trans>
            </ItalicSubTitle>
          </>
        }
        <TextSection style={{ width: '55ch' }}>
          <Trans i18nKey="landing.description">
            <Description>
              The KZG Ceremony is currently in the Special Contribution Period. For the next few weeks,
              more complex contributions will be allocated slots. Some have large groups collectively
              generating entropy or particular setup restrictions which may need more time for computation.
              These contributions are were proposed by the community and funded through the
              <ExternalLink href='https://blog.ethereum.org/2022/12/15/kzg-ceremony-grants-round'>KZG Grants Round</ExternalLink>.
            </Description>
            <Description>
              Learn more about about the Ceremony below
            </Description>
          </Trans>
        </TextSection>
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
