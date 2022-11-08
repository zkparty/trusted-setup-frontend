import ROUTES from '../routes'
import { useCallback } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { textSerif } from '../style/utils'
import { useNavigate } from 'react-router-dom'
import { TextSection } from '../components/Layout'
import Explanation from '../components/Explanation'
import { PrimaryButton } from '../components/Button'
import { Trans, useTranslation } from 'react-i18next'
import LandingBg from '../assets/landing-boarder.png'
import { Description, PageTitle } from '../components/Text'
import { isMobile } from '../utils'

const LandingPage = () => {
  useTranslation()
  const navigate = useNavigate()
  const onClickGetStart = useCallback(() => {
    navigate(ROUTES.ENTROPY_INPUT)
  }, [navigate])

  return (
    <>
      <Header />
      <TopSection>
        <BgColor />
        <PageTitle>
          <Trans i18nKey="landing.title">
            SUMMONING <br /> GUIDE
          </Trans>
        </PageTitle>
        <TextSection>
          <Trans i18nKey="landing.description">
            <Description>
              Whispers from the shadows tell of a powerful spirit Dankshard, who
              will open the next chapter of Ethereum scalability. To summon its
              powers, a Ceremony needs your contribution. This illuminated guide
              will lead you through the movements necessary to complete the
              ritual.
            </Description>
            <Description>
              Magic math awaits - are you ready to add your color to the story?
            </Description>
          </Trans>
        </TextSection>
        <PrimaryButton onClick={onClickGetStart} disabled={isMobile()} >
          {isMobile() ? <Trans i18nKey="landing.button-mobile">Proceed on desktop</Trans> : <Trans i18nKey="landing.button">Begin</Trans>}
        </PrimaryButton>
        <Link href="#explanation">
          <Footnote>
            {isMobile() ? <Trans i18nKey="landing.learn-more-mobile">↓ learn more below ↓</Trans> : <Trans i18nKey="landing.learn-more">↓ or learn more below ↓</Trans>}
          </Footnote>
        </Link>
      </TopSection>
      <Explanation />
      <Footer />
    </>
  )
}

const Section = styled.section`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TopSection = styled(Section)`
  border: min(10vw, 6rem) solid;
  border-image-source: url(${LandingBg});
  border-image-slice: 230;
  border-image-repeat: round;
  margin: 6rem auto;
  box-sizing: border-box;
  width: 100%;
  max-width: 100ch;
`

const BgColor = styled.div`
  background-color: ${({ theme }) => theme.surface};
  height: 500px;
  width: 500px;
  border-radius: 50%;
  box-shadow: 0 0 200px 120px ${({ theme }) => theme.surface};
  position: absolute;
  z-index: -1;
  top: 240px;
`

const Footnote = styled.p`
  font-style: italic;
  ${textSerif}
`

const Link = styled.a``

export default LandingPage
