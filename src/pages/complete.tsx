import { useEffect } from 'react'
import styled from 'styled-components'
import { PrimaryButtonLarge } from '../components/Button'
import Header from '../components/Header'
import { Description, PageTitle } from '../components/Text'
import { useContributionStore, Store } from '../store/contribute'
import wasm from '../wasm'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  Over
} from '../components/Layout'
import PizzaInner from '../assets/crust.svg'
import PizzaOuter from '../assets/fig.svg'
import BgImg from '../assets/img-graphic-base.svg'
import BgImgColor from '../assets/img-base-color.svg'
import InnerColor from '../assets/inner-color.svg'
import SnakeColor from '../assets/snake-color.svg'
import OuterColor from '../assets/outer-color.svg'

const CompletePage = () => {
  const { contribution, newContribution } = useContributionStore(
    (state: Store) => ({
      contribution: state.contribution,
      newContribution: state.newContribution
    })
  )

  useEffect(() => {
    ;(async () => {
      // TODO: check is done automatically or user start checking?
      const checks = await wasm.checkContributions(
        contribution!,
        newContribution!
      )
      console.log(checks)
    })()
  })

  return (
    <>
      <Header />
      <Over>
        <Container>
          <Bg src={BgImgColor} />
          <PizzaImg src={PizzaInner} />
          <PizzaImg src={PizzaOuter} />
          <Img src={InnerColor} />
          <Img src={OuterColor} />
          <Img src={SnakeColor} />
          <Wrap>
            <InnerWrap>
              <PageTitle>
                Dankshard <br /> draws near
              </PageTitle>

              <TextSection>
                <Desc>
                  Success! Echoes of you are permanently fused with the others
                  in this Summoning Ceremony.
                </Desc>
                <Desc>
                  <Bold>Remember:</Bold> this is only a testnet Ceremony - make
                  sure to return for the full Dankshard summoning.
                </Desc>
              </TextSection>

              <ButtonSection>
                <PrimaryButtonLarge>View your contribution</PrimaryButtonLarge>
              </ButtonSection>
            </InnerWrap>
          </Wrap>
        </Container>
      </Over>
    </>
  )
}

const InnerWrap = styled.div`
  margin-top: 50px;
`

const TextSection = styled.div`
  width: 360px;
`

const Desc = styled(Description)`
  margin: 0 0 20px;
  font-size: 18px;
`

const Bg = styled.img`
  z-index: -2;
  position: absolute;
  top: -9999px;
  bottom: -9999px;
  left: -9999px;
  right: -9999px;
  margin: auto;
`

const Img = styled.img`
  position: absolute;
  top: -9999px;
  bottom: -9999px;
  left: -9999px;
  right: -9999px;
  margin: auto;
`

export const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 120px;
  align-items: center;
  justify-content: space-around;
  margin-top: 12px;
`

const PizzaImg = styled(Img)`
  transition: all 3s ease;
`

const Bold = styled.span`
  font-weight: 700;
`

export default CompletePage
