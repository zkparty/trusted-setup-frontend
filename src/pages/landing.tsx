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
import Explanation from '../components/Explanation'

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
          Whispers from the shadows tell of a powerful spirit Dankshard,
          who will open the next chapter of Ethereum scalability.
          To summon its powers, a Ceremony needs your contribution.
          This illuminated guide will lead you through the movements necessary
          to complete the ritual.
          </Description>
          <Description>
            Magic math awaits - are you ready to add your color to the story?
          </Description>
        </TextSection>
        <PrimaryButton onClick={onClickGetStart}>Begin</PrimaryButton>
        <Footnote>↓ or learn more below ↓</Footnote>
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

export default LandingPage
