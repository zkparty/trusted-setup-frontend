import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'
import blockies from 'blockies-identicon'
import { stringToColor } from '../utils'
import ReactTooltip, {Place} from 'react-tooltip'

type Props = {
  opts: {
    seed?: string
    size?: number
    scale?: number
  }
  onClick?: () => void
  clickable?: boolean
  tooltipPlace?: Place
}

const BlockiesIdenticon = ({
  opts: { seed = 'foo', size = 15, scale = 3 },
  onClick,
  clickable = false,
  tooltipPlace = "right"
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
      <Canvas
        ref={canvasRef}
        onClick={onClick}
        clickable={clickable}
        data-tip={"Blockie tooltip content in div below"}
        data-for={"blockiePoT" + seed}
      />
      <ReactTooltip
        id={"blockiePoT" + seed}
        place={tooltipPlace}
        overridePosition={(
          { left, top },
          _currentEvent, _currentTarget, _node) => {
            ReactTooltip.rebuild()
            return { top, left }
          }
        }
        backgroundColor="black"
        effect="solid"
        padding="12px"
      >
      <div style={{ width: "40ch", wordBreak: "break-word" }}>
        {t("record.transcriptModal.potPubkeyTooltip")}
      </div>
      </ReactTooltip>
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
