import React from 'react';
import Lottie from 'react-lottie'
import { isMobile } from '../utils'
import animationData from '../lotties/flower.json'

const FlowerAnimation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      }

    return (
      <div style={ isMobile() ? {
        marginTop: '-130px',
        marginBottom: '90px',
        height: '200px',
      } : {}}>
        <Lottie
            options={defaultOptions}
            height={390}
            width={170}
            style={{
              transform: isMobile() ? 'rotate(90deg)' : '',
            }}
        />
      </div>
    )
  }

  export default FlowerAnimation;