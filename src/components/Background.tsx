import React from 'react'
import styled from 'styled-components'
import { CIRCLE_SIZE } from '../constants'
import useBackgroundVisibility from '../hooks/useBackgroundVisibility'
import { Img, Bg, BgPulse, PizzaImg } from '../components/Image'
import { ColorWrap } from '../components/Layout'

import PizzaInner from '../assets/crust.svg'
import PizzaOuter from '../assets/fig.svg'
import BgImg from '../assets/img-graphic-base.svg'
import BgImgColor from '../assets/img-base-color.svg'
import BgImgNoPiz from '../assets/img-base-no-piz.svg'
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
        <Bg src={BgImg} visible={bg === 'white' || bg === 'animate'} style={{display: getDisplay(bg)}} />
        {bg === 'animate' && (
          <BgPulse src={BgImgPulse} visible={bg === 'animate'} style={{display: getDisplay(bg)}} />
        )}
        <Bg src={BgImgNoPiz} visible={bg === 'white-no-pizza'} style={{display: getDisplay(bg)}} />
        <Bg src={BgImgColor} visible={bg === 'color'} style={{display: getDisplay(bg)}} />
        <PizzaImg
          src={PizzaInner}
          style={{width: (CIRCLE_SIZE + 405)+'px', display: getDisplay(pizza)}}
          visible={pizza === 'color' || pizza === 'animate'}
          rounding={pizza === 'animate'}
        />
        <PizzaImg
          src={PizzaOuter}
          style={{width: (CIRCLE_SIZE + 284)+'px', display: getDisplay(pizza)}}
          visible={pizza === 'color' || pizza === 'animate'}
          rounding={pizza === 'animate'}
        />
        <ColorWrap></ColorWrap>
        <Img src={InnerWhite} visible={inner === 'white'} style={{width: (CIRCLE_SIZE + 27)+'px', display: getDisplay(inner)}} />
        <Img src={InnerColor} visible={inner === 'color'} style={{width: (CIRCLE_SIZE + 27)+'px', display: getDisplay(inner)}} />
        <Img src={OuterWhite} visible={outer === 'white'} style={{width: (CIRCLE_SIZE + 87.5)+'px', display: getDisplay(outer)}} />
        <Img src={OuterColor} visible={outer === 'color'} style={{width: (CIRCLE_SIZE + 87.5)+'px', display: getDisplay(outer)}} />
        <Img src={SnakeWhite} visible={snake === 'white'} style={{width: (CIRCLE_SIZE + 76.5)+'px', display: getDisplay(snake)}} />
        <Img src={SnakeColor} visible={snake === 'color'} style={{width: (CIRCLE_SIZE + 76.5)+'px', display: getDisplay(snake)}} />
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
