import React from 'react';
import Lottie from 'react-lottie'
import { isMobile } from '../utils'
import styled, { css } from 'styled-components'
import animationData from '../lotties/flower.json'

type Props = {
  inverse?: boolean
}

const FlowerAnimation = ({ inverse = false }: Props) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      }

    return (
      <Container isMobile={isMobile()} inverse={inverse}>
        <Lottie
            options={defaultOptions}
            height={390}
            width={170}
            style={{
              transform: isMobile() ? 'rotate(90deg)' : '',
            }}
        />
      </Container>
    )
  }

  const Container = styled.div<{ isMobile: boolean, inverse: boolean}>`
    ${({ isMobile }) => isMobile ?
      css`
        margin-top: -130px;
        margin-bottom: 90px;
        height: 200px;
      ` : ''
    }
    ${({ inverse }) => inverse ?
      css`
        -moz-transform: scale(-1, 1);
        -webkit-transform: scale(-1, 1);
        -o-transform: scale(-1, 1);
        -ms-transform: scale(-1, 1);
        transform: scale(-1, 1);
      ` : ''
    }
  `

  export default FlowerAnimation;