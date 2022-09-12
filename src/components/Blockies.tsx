import { useEffect, useRef } from 'react'
import blockies from 'blockies-identicon'
import { stringToColor } from '../utils'

type Props = {
  opts: {
    seed?: string
    size?: number
    scale?: number
  }
}

const BlockiesIdenticon = ({
  opts: { seed = 'foo', size = 15, scale = 3 }
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

  return <canvas ref={canvasRef} style={{ borderRadius: '6px' }} />
}

export default BlockiesIdenticon
