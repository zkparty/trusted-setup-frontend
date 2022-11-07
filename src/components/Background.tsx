import React from 'react'
import styled from 'styled-components'
import useBackgroundVisibility from '../hooks/useBackgroundVisibility'
import { Img, Bg, BgPulse, PizzaImg } from '../components/Image'

import PizzaInner from '../assets/crust.svg'
import PizzaOuter from '../assets/fig.svg'
import BgImg from '../assets/img-graphic-base.svg'
import BgImgColor from '../assets/img-base-color.svg'
import BgImgPulse from '../assets/img-graphic-pulse.svg'
import InnerWhite from '../assets/inner-white.svg'
import InnerColor from '../assets/inner-color.svg'
import SnakeWhite from '../assets/snake-white.svg'
import SnakeColor from '../assets/snake-color.svg'
import OuterWhite from '../assets/outer-white.svg'
import OuterColor from '../assets/outer-color.svg'

type Props = {
  children: React.ReactNode
}

const Background = ({ children }: Props) => {
  const { bg, inner, outer, snake, pizza } = useBackgroundVisibility()
  const getDisplay = (value: string): string => value === "hidden" ? "none" : "unset"
  const displayContainer = [bg, inner, outer, snake, pizza].filter((value) => getDisplay(value) !== "none").length > 0 ? "unset" : "none"
  return (
    <Container>
      <BgContainer style={{ display: displayContainer }}>
        <Bg src={BgImg} visible={bg === 'white' || bg === 'animate'} display={getDisplay(bg)} />
        {bg === 'animate' && (
          <BgPulse src={BgImgPulse} visible={bg === 'animate'} display={getDisplay(bg)} />
        )}
        <Bg src={BgImgColor} visible={bg === 'color'} display={getDisplay(bg)} />
        <PizzaImg
          src={PizzaInner}
          visible={pizza === 'color' || pizza === 'animate'}
          rounding={pizza === 'animate'}
          display={getDisplay(pizza)}
        />
        <PizzaImg
          src={PizzaOuter}
          visible={pizza === 'color' || pizza === 'animate'}
          rounding={pizza === 'animate'}
          display={getDisplay(pizza)}
        />
        <Img src={InnerWhite} visible={inner === 'white'} display={getDisplay(inner)} />
        <Img src={InnerColor} visible={inner === 'color'} display={getDisplay(inner)} />
        <Img src={OuterWhite} visible={outer === 'white'} display={getDisplay(outer)} />
        <Img src={OuterColor} visible={outer === 'color'} display={getDisplay(outer)} />
        <Img src={SnakeWhite} visible={snake === 'white'} display={getDisplay(snake)} />
        <Img src={SnakeColor} visible={snake === 'color'} display={getDisplay(snake)} />
      </BgContainer>
      {children}
    </Container>
  )
}

const Container = styled.div`
  color: ${({ theme }) => theme.text};
  height: 100vh;
  width: 100vw;
`

const BgContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  overflow: hidden;
`

export default Background
