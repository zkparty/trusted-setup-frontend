import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { PrimaryButton } from '../components/Button'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Description, PageTitle } from '../components/Text'
import { textSerif } from '../style/utils'
import ROUTES from '../routes'
import { TextSection } from '../components/Layout'
import LandingBg from '../assets/landing-boarder.png'

const LandingPage = () => {
  const navigate = useNavigate()
  const onClickGetStart = useCallback(() => {
    navigate(ROUTES.SIGNIN)
  }, [navigate])

  return (
    <>
      <Header />
      <TopSection>
        <BgColor />
        <PageTitle>
          SUMMONING <br /> GUIDE
        </PageTitle>
        <TextSection>
          <Description>
            Whispers from the shadows tell of a powerful spirit Dankshard, which
            will open the next chapter of Ethereum scalability. To summon its
            powers, we need as many community contributions as possible. This
            illuminated guide will lead you through the steps necessary to
            complete your contribution.
          </Description>
          <Description>
            Magic math awaits - are you ready to add your color to the story?
          </Description>
        </TextSection>
        <PrimaryButton onClick={onClickGetStart}>Begin</PrimaryButton>
        <Footnote>↓ or learn more below ↓</Footnote>
      </TopSection>
      <SecondSection>
        <PageTitle>
          PROTO-DANKSHARDING <br /> AND THE CEREMONY
        </PageTitle>
        <SecondTextSection>
          <Description>
            This Trusted Setup is a multi-party ceremony designed to generate a
            secure SRS (structured reference string) to be used in the
            proto-danksharding protocol. OK, let's slow down and talk about
            those terms in more detail.
          </Description>
          <Description>
            Proto-danksharding (aka EIP-4844) is a planned change to the
            Ethereum protocol which allows transaction data from rollups (Layer
            2s) to be succinctly represented on the Layer 1 (mainnet). The
            benefits are lower transaction fees on the L2, greater scalability
            and more accessibility to more people!
          </Description>
          <Description>
            The Trusted Setup is a preparatory step required for certain
            cryptographic schemes such as the KZG polynomial commitment scheme
            to be used in proto-danksharding. In our case, the trust assumption
            is that one contributor needs to successfully conceal their secret
            for the result to be secure.
          </Description>
          <Description>
            It's a multi-party ceremony: Contributors each create a secret and
            run a computation to mix it with previous contributions and generate
            a result that can be made public and passed to the next contributor.
            We need to guard against attempts to control the ceremony, so you'll
            need an Ethereum or GitHub account with an established history.
          </Description>
        </SecondTextSection>
      </SecondSection>
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
  background: url(${LandingBg}) no-repeat bottom / contain;
  height: 840px;
  margin-top: 24px;
  padding-top: 100px;
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

const SecondSection = styled(Section)`
  padding: 0 24px 40px;
`

const SecondTextSection = styled(TextSection)`
  width: 698px;
`

export default LandingPage
