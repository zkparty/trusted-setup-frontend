import ToolTip from './Tooltip'
import styled from 'styled-components'
import { stringToColor } from '../utils'
import { useEffect, useRef } from 'react'
import blockies from 'blockies-identicon'
import { useTranslation } from 'react-i18next'

type Props = {
  opts: {
    seed?: string
    size?: number
    scale?: number
  }
  onClick?: () => void
  clickable?: boolean
}

const BlockiesIdenticon = ({
  opts: { seed = 'foo', size = 15, scale = 3 },
  onClick,
  clickable = false,
}: Props) => {
  const { t } = useTranslation();
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

  return (
    <>
    <ToolTip explanation={t("record.transcriptModal.potPubkeyTooltip")}>
      <Canvas
        ref={canvasRef}
        onClick={onClick}
        clickable={clickable}
      />
    </ToolTip>
    </>
  )
}

const Canvas = styled.canvas<{clickable: boolean}>`
  cursor: ${ ({ clickable }) => clickable ? 'pointer' : ''};
  border-radius: 6px;
  transition: all linear 0.1s;
  height: 30px;
  width: 30px;
  margin-right: 5px;
  :hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0px 6px 6px 2px #00000033;
  }
`

export default BlockiesIdenticon
