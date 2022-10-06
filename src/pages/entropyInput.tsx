import { useState, MouseEventHandler, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import { useContributionStore, Store } from '../store/contribute'
import {
  SingleContainer as Container,
  SingleWrap as Wrap
} from '../components/Layout'
import ROUTES from '../routes'
import BgImg from '../assets/img-graphic-base.svg'
import InnerColor from '../assets/inner-color.svg'
import SnakeWhite from '../assets/snake-white.svg'
import SnakeColor from '../assets/snake-color.svg'
import OuterWhite from '../assets/outer-white.svg'
import { useAuthStore } from '../store/auth'

const MIN_ENTROPY_LENGTH = 20000

const EntropyInputPage = () => {
  const navigate = useNavigate()
  const [entropy, setEntropy] = useState('')
  const [mouseEntropy, setMouseEntropy] = useState('')
  const [percentage, setPercentage] = useState(0)
  const { provider } = useAuthStore()

  const updateEntropy = useContributionStore(
    (state: Store) => state.updateEntropy
  )
  const handleSubmit = () => {
    if (percentage !== 100) return
    updateEntropy(0, entropy)
    if (provider === 'eth') {
      navigate(ROUTES.DOUBLE_SIGN)
    } else {
      navigate(ROUTES.LOBBY)
    }
  }

  const handleCaptureMouseEntropy: MouseEventHandler<HTMLDivElement> = (e) => {
    const d = new Date()
    setMouseEntropy(
      `${mouseEntropy}${e.movementX}${e.movementY}${e.screenX}${
        e.screenY
      }${d.getTime()}`
    )
  }

  useEffect(() => {
    setPercentage(
      Math.min(
        Math.floor(
          ((entropy + mouseEntropy).length / MIN_ENTROPY_LENGTH) * 100
        ),
        100
      )
    )
  }, [entropy, mouseEntropy])

  return (
    <Container onMouseMove={handleCaptureMouseEntropy}>
      <Bg src={BgImg} />
      <Img src={InnerColor} />
      <Img src={SnakeWhite} />
      <Img src={SnakeColor} />
      <Img src={OuterWhite} />
      <Wrap>
        <PageTitle>
          Entropy <br /> Entry
        </PageTitle>
        <TextSection>
          <Desc>
            The Ceremony requires randomness & will be used to craft the final
            summoning spell.
          </Desc>
          <Desc>
            <Bold>Memory:</Bold> a piece of you in text form, with random
            characters added. A hope for the future, or the name of someone
            dear. <Bold>Motion:</Bold> Trace some elements of the guide with
            your cursor - the interface will capture your unique path.{' '}
            <Bold>Machine:</Bold> Your browser will generate its own randomness
            in the background.
          </Desc>
        </TextSection>
        <Input type="password" onChange={(e) => setEntropy(e.target.value)} />

        <ButtonSection>
          <PrimaryButton disabled={percentage !== 100} onClick={handleSubmit}>
            Submit
          </PrimaryButton>
        </ButtonSection>
      </Wrap>
    </Container>
  )
}

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

const Desc = styled(Description)`
  margin: 0 0 20px;
  font-size: 18px;
`

const TextSection = styled.div`
  width: 360px;
`

const Bold = styled.span`
  font-weight: 700;
`

const Input = styled.input`
  font-size: 16px;
  padding: 4px 8px;
  border: solid 1px ${({ theme }) => theme.text};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.surface};
  width: 300px;
`

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
`

export default EntropyInputPage
