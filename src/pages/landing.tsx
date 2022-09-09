import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { PrimaryButton } from '../components/Button'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Description, PageTitle, SectionTitle } from '../components/Text'
import FaqItem from '../components/FaqItem'
import { FONT_SIZE, SPACE } from '../constants'
import { textSerif } from '../style/utils'
import useQueueNumber from '../hooks/useQueueNumber'
import ROUTES from '../routes'
import bgImg from '../assets/landing-section2-bg.png'

const LandingPage = () => {
  const queueNumQuery = useQueueNumber()
  const navigate = useNavigate()
  const onClickGetStart = useCallback(() => {
    navigate(ROUTES.SIGNIN)
  }, [navigate])

  return (
    <>
      <TopSection>
        <Header />
        <PageTitle>KZG Ceremony</PageTitle>
        <Description>
          The danksharding has risen & awaken. Calling citizens of the online
          community to demonstrate the honesty of humanity & form the collective
          power. Nights & days of enchantment, the magic math awaits you.
        </Description>
        <QueueInfo>
          <QueueInfoTitle>Summoners in queue</QueueInfoTitle>
          <QueueNumber>
            {!queueNumQuery.isLoading && queueNumQuery.data
              ? queueNumQuery.data
              : 'Loading...'}
          </QueueNumber>
          <QueueFootnote>Approx. wait time: 5 mins </QueueFootnote>
        </QueueInfo>
        <GetStartedButton onClick={onClickGetStart}>
          Get Started
        </GetStartedButton>
      </TopSection>
      <SecondSection>
        <SectionTitle>The Impact & The proto-danksharding.</SectionTitle>
        <DescriptionMid>
          In this ceremony, we are rollout proto-danksharding that enables much
          cheaper transactions in the ecosystem. As citizens who has ride with
          us for all these effort, it’s noting for you the impact you are about
          to contribute.
        </DescriptionMid>
        <DescriptionMid>
          paragraph 2, some other mentioning or lore
        </DescriptionMid>
        <LandingBgImg src={bgImg} alt="section background" />
      </SecondSection>
      <ThirdSection>
        <SectionTitleInverse>
          Coordinator status: online & Healthy
        </SectionTitleInverse>
        <ThirdSectionBody>
          <ThirdSectionLeft>
            <img src="https://placehold.jp/b6bfc9/ffffff/300x400.png" alt="" />
          </ThirdSectionLeft>
          <ThirdSectionRight>
            <SectionSubTitle>How does this ceremony work?</SectionSubTitle>
            <SectionDescription>
              Talk about trust setup..etc here
            </SectionDescription>
            <SectionDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla
              varius tempus massa nullam at cras sit vitae eget.
            </SectionDescription>
            <SectionDescription>
              This project has been fully audit & secured, view report here
            </SectionDescription>
          </ThirdSectionRight>
        </ThirdSectionBody>
      </ThirdSection>
      <FAQSection>
        <FaqTitle>FAQ</FaqTitle>
        <FaqItem
          title="How to contribute"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, leo donec egestas orci tortor, tellus. Diam eget libero id magna pellentesque fames pretium. Rutrum eget proin sagittis gravida ipsum fringilla molestie elit mauris."
        />
        <FaqItem
          title="My computer is not very powerful, can I contribute?"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, leo donec egestas orci tortor, tellus. Diam eget libero id magna pellentesque fames pretium. Rutrum eget proin sagittis gravida ipsum fringilla molestie elit mauris."
        />
        <FaqItem
          title="What to expect"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, leo donec egestas orci tortor, tellus. Diam eget libero id magna pellentesque fames pretium. Rutrum eget proin sagittis gravida ipsum fringilla molestie elit mauris."
        />
        <FaqItem
          title="Verify your contribution"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, leo donec egestas orci tortor, tellus. Diam eget libero id magna pellentesque fames pretium. Rutrum eget proin sagittis gravida ipsum fringilla molestie elit mauris."
        />
      </FAQSection>
      <Footer />
    </>
  )
}

const TopSection = styled.section`
  padding: 0 24px;
`

const QueueInfo = styled.div`
  margin: 20px 0;
  padding: 12px 24px;
  border: solid 1px ${({ theme }) => theme.primary};
  border-radius: 4px;
  width: 320px;
`

const QueueInfoTitle = styled.h2`
  color: ${({ theme }) => theme.primary};
  font-size: ${FONT_SIZE.S};
  font-weight: 600;
  display: inline-block;
  margin: 0;
`

const QueueNumber = styled.p`
  font-size: ${FONT_SIZE.XXL};
  font-weight: 700;
  margin: ${SPACE.M} 0;
`

const QueueFootnote = styled.p`
  margin: 0;
`

const GetStartedButton = styled(PrimaryButton)`
  padding: 18px 80px;
  border-radius: 40px;
`

const SecondSection = styled.section`
  margin-top: 120px;
  padding: 40px 24px;
`

const LandingBgImg = styled.img`
  width: 100%;
  margin-top: -260px;
`

const DescriptionMid = styled(Description)`
  max-width: 760px;
`

const ThirdSection = styled.div`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.onPrimary};
  padding: 40px 24px;
`

const SectionTitleInverse = styled(SectionTitle)`
  color: ${({ theme }) => theme.onPrimary};
  font-size: 96px;
  margin: 0 0 24px;
  text-align: center;
  white-space: nowrap;
  border-bottom: solid 2px;
  overflow: hidden;
`

const ThirdSectionBody = styled.div`
  display: flex;
  padding: 0 40px;
  justify-content: space-around;
  align-items: center;
`

const ThirdSectionLeft = styled.div``

const ThirdSectionRight = styled.div`
  margin-left: 32px;
`

const SectionSubTitle = styled.h3`
  text-transform: uppercase;
  font-size: 64px;
  line-height: 60px;
  ${textSerif}
  margin-bottom: 24px;
`

const SectionDescription = styled.p`
  font-size: ${FONT_SIZE.L};
`

const FAQSection = styled.div`
  width: 80%;
  margin: auto;
  padding-bottom: 120px;
`

const FaqTitle = styled.h2`
  font-size: 64px;
  ${textSerif}
  text-align: center;
`

export default LandingPage
