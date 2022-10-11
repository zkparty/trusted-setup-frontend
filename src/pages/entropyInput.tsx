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
import SnakeProgress from '../components/SnakeProgress'
import { useAuthStore } from '../store/auth'
import HeaderJustGoingBack from '../components/HeaderJustGoingBack'
import { CURVE } from '@noble/bls12-381'
import { hkdf } from '@noble/hashes/hkdf'
import { sha256 } from '@noble/hashes/sha256'
import { randomBytes } from '@noble/hashes/utils'

const MIN_ENTROPY_LENGTH = 2000

type Player = {
  play: () => void
  pause: () => void
  seek: (percent: number) => void
}

const EntropyInputPage = () => {
  const navigate = useNavigate()
  const [keyEntropy, setKeyEntropy] = useState('')
  const [mouseEntropy, setMouseEntropy] = useState('')
  const [percentage, setPercentage] = useState(0)
  const [player, setPlayer] = useState<Player | null>(null)
  const { provider } = useAuthStore()

  const updateEntropy = useContributionStore(
    (state: Store) => state.updateEntropy
  )
  const handleSubmit = () => {
    if (percentage !== 100) return
    saveGeneratedEntropy()
    if (provider === 'Ethereum') {
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

  const saveGeneratedEntropy = async () => {
    const entropy = mouseEntropy + keyEntropy;
    const entropyAsArray = Uint8Array.from(entropy.split("").map(x => x.charCodeAt(0)))
    const salt = randomBytes(32)
    const hk1 = hkdf(sha256, entropyAsArray, salt, '', 48);

    const hex64 = hk1.reduce((str, byte) => str + byte.toString(16).padStart(2,'0'),'')
    const big64 = BigInt('0x' + hex64)
    const hex32 = (big64 % CURVE.r).toString(16).padStart(64, '0')
    updateEntropy('0x' + hex32)
  }

  useEffect(() => {
    const percentage = Math.min(
      Math.floor((mouseEntropy.length / MIN_ENTROPY_LENGTH) * 1000) / 10,
      100
    )

    setPercentage(percentage)
    if (player) player.seek(percentage)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseEntropy])

  return (
    <>
      <HeaderJustGoingBack />
      <Container onMouseMove={handleCaptureMouseEntropy}>
        <Bg src={BgImg} />
        <SnakeProgress onSetPlayer={setPlayer} />
        <Wrap>
          <PageTitle>
            Entropy <br /> Entry
          </PageTitle>
          <TextSection>
            <Desc>
            The Ceremony requires three random inputs from each Summoner.
            </Desc>
            <SubDesc>
              <Bold>Secret:</Bold> A piece of you in text form, with random
              characters added. A hope for the future, or the name of someone
              dear.
            </SubDesc>
            <SubDesc>
              <Bold>Sigil:</Bold> Trace some elements of the guide with
              your cursor - the interface will capture your unique path.
            </SubDesc>
            <SubDesc>
              <Bold>Sample:</Bold> Your browser will generate its own
              randomness in the background.
            </SubDesc>
          </TextSection>
          <Input
            placeholder="Secret"
            onChange={(e) => setKeyEntropy(e.target.value)}
          />

          <ButtonSection>
            <PrimaryButton disabled={percentage !== 100} onClick={handleSubmit}>
              Submit
            </PrimaryButton>
          </ButtonSection>
        </Wrap>
      </Container>
    </>
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

const Desc = styled(Description)`
  margin: 0 0 20px;
  font-size: 18px;
`

const SubDesc = styled(Description)`
  margin: 0 0 15px;
  font-size: 18px;
`

const TextSection = styled.div`
  width: 360px;
`

const Bold = styled.span`
  font-weight: 700;
`

const Input = styled.input`
  text-align: center;
  text-security: disc;
  -moz-text-security: disc;
  -webkit-text-security: disc;
  font-size: 16px;
  margin-top: 5px;
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
