import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  Bg,
  Img,
  TextSection
} from '../components/Layout'
import ROUTES from '../routes'
import BgImg from '../assets/img-graphic-base.svg'
import InnerColor from '../assets/inner-color.svg'
import SnakeColor from '../assets/snake-color.svg'
import OuterWhite from '../assets/outer-white.svg'

const DoubleSignPage = () => {
  const navigate = useNavigate()
  const handleClickSign = () => {
    // do double sign
    navigate(ROUTES.LOBBY)
  }

  return (
    <Container>
      <Bg src={BgImg} />
      <Img src={InnerColor} />
      <Img src={SnakeColor} />
      <Img src={OuterWhite} />
      <Wrap>
        <InnerWrap>
          <PageTitle>
            Seal your <br /> memory
          </PageTitle>
          <TextSection>
            <Description>
              Rember the neverending flight to birth new tools which we use to
              build towards brighter worlds. We are part of this story, every
              day a new page.
            </Description>
          </TextSection>
          <ButtonSection>
            <PrimaryButton onClick={handleClickSign}>Seal it</PrimaryButton>
          </ButtonSection>
        </InnerWrap>
      </Wrap>
    </Container>
  )
}

const InnerWrap = styled.div`
  margin-top: 100px;
`

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
`

export default DoubleSignPage
