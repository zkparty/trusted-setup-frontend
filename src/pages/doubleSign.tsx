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
import { blsSignId } from '../utils'
import { useAuthStore } from '../store/auth'
import BgImg from '../assets/img-graphic-base.svg'
import InnerColor from '../assets/inner-color.svg'
import SnakeColor from '../assets/snake-color.svg'
import OuterWhite from '../assets/outer-white.svg'
import { useContributionStore } from '../store/contribute'
import HeaderJustGoingBack from '../components/HeaderJustGoingBack'

const DoubleSignPage = () => {
  const { provider, nickname } = useAuthStore()
  const { entropy } = useContributionStore()
  const navigate = useNavigate()
  const handleClickSign = async () => {
    // do double sign
    //console.log(provider)
    //console.log(nickname)
    //const signed = blsSignId(entropy[0], provider!, nickname!);
    //console.log(await signed)
    // TODO: save signed message
    navigate(ROUTES.LOBBY)
  }

  return (
    <>
      <HeaderJustGoingBack />
      <Container>
        <Bg src={BgImg} />
        <Img src={InnerColor} />
        <Img src={OuterWhite} />
        <Img src={SnakeColor} />
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
    </>
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
