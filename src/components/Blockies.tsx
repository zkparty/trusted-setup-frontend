import { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import blockies from 'blockies-identicon'
import { stringToColor } from '../utils'

type Props = {
  opts: {
    seed?: string
    size?: number
    scale?: number
  }
  hover?: boolean
  onClick: () => void
}

const BlockiesIdenticon = ({
  opts: { seed = 'foo', size = 15, scale = 3 },
  hover = false,
  onClick
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!)

  useEffect(() => {
    const color = stringToColor(seed + 'main')
    const bgcolor = stringToColor(seed + 'bg')

    // render identicon after load
    blockies.render(
      {
        seed,
        color,
        bgcolor,
        size,
        scale,
        spotcolor: bgcolor
      },
      canvasRef.current
    )
    // eslint-disable-next-line
  }, [])

  return <Canvas ref={canvasRef} onClick={onClick} hover={hover} />
}

const hoverCSS = css`
  :hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0px 6px 6px 2px #00000033;
  }
`

const Canvas = styled.canvas<{hover: boolean}>`
  cursor: pointer;
  border-radius: 6px;
  transition: all linear 0.1s;
  height: 30px;
  width: 30px;
  margin-right: 5px;
  ${({ hover }) => hover ?
    hoverCSS
    :
    ''
  }
`

export default BlockiesIdenticon
