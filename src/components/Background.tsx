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

  return (
    <Container>
      <Bg src={BgImg} visible={bg === 'white' || bg === 'animate'} />
      {bg === 'animate' && (
        <BgPulse src={BgImgPulse} visible={bg === 'animate'} />
      )}
      <Bg src={BgImgColor} visible={bg === 'color'} />
      <PizzaImg
        src={PizzaInner}
        visible={pizza === 'color' || pizza === 'animate'}
        rounding={pizza === 'animate'}
      />
      <PizzaImg
        src={PizzaOuter}
        visible={pizza === 'color' || pizza === 'animate'}
        rounding={pizza === 'animate'}
      />
      <Img src={InnerWhite} visible={inner === 'white'} />
      <Img src={InnerColor} visible={inner === 'color'} />
      <Img src={OuterWhite} visible={outer === 'white'} />
      <Img src={OuterColor} visible={outer === 'color'} />
      <Img src={SnakeWhite} visible={snake === 'white'} />
      <Img src={SnakeColor} visible={snake === 'color'} />
      {children}
    </Container>
  )
}

const Container = styled.div`
  color: ${({ theme }) => theme.text};
  height: 100vh;
  width: 100vw;
`

export default Background
