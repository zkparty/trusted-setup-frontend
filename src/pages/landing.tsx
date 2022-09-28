import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { PrimaryButton } from '../components/Button'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Description, PageTitle, SectionTitle } from '../components/Text'
import FaqItem from '../components/FaqItem'
import { FONT_SIZE } from '../constants'
import { textSerif } from '../style/utils'
import ROUTES from '../routes'
import bgImg from '../assets/img-what-KZGceremony.png'

const LandingPage = () => {
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
          Are you worthy? Only the most valiant, with the highest integrity,
          shall form the collective power. The time has come to awaken the
          danksharding. Enchantment and magic math awaits.
        </Description>
        <GetStartedButton onClick={onClickGetStart}>
          Get Started
        </GetStartedButton>
      </TopSection>
      <SecondSection>
        <SectionTitle>The proto-danksharding & the trusted setup.</SectionTitle>
        <DescriptionMid>
          This Trusted Setup is a multi-party ceremony designed to generate a
          secure SRS (structured reference string) to be used in the
          proto-danksharding protocol. OK, let's slow down and talk about those
          terms in more detail.
        </DescriptionMid>
        <DescriptionMid>
          Proto-danksharding (aka EIP-4844) is a planned change to the Ethereum
          protocol. It will allow transaction data from rollups to be succinctly
          represented in layer 1, thus lowering transaction fees.
        </DescriptionMid>
        <DescriptionMid>
          The Trusted Setup is a preparatory step required for certain
          cryptographic schemes such as the KZG polynomial commitment scheme to
          be used in proto-danksharding. In our case, the trust assumption is
          that one contributor needs to successfully conceal their secret for
          the result to be secure.
        </DescriptionMid>
        <DescriptionMid>
          It's a multi-party ceremony: Contributors each create a secret and run
          a computation to mix it with previous contributions and generate a
          result that can be made public and passed to the next contributor. We
          need to guard against attempts to control the ceremony, so you'll need
          an Ethereum or GitHub account with an established history.
        </DescriptionMid>
        <LandingBgImg src={bgImg} alt="section background" />
      </SecondSection>
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
  margin-top: -40px;
`

const DescriptionMid = styled(Description)`
  max-width: 760px;
`

const FAQSection = styled.div`
  background-color: ${({ theme }) => theme.background};
  width: 80%;
  margin: auto;
  padding-bottom: 120px;
`

const FaqTitle = styled.h2`
  font-size: 64px;
  color: ${({ theme }) => theme.onBackground};
  ${textSerif}
  text-align: center;
`

export default LandingPage
