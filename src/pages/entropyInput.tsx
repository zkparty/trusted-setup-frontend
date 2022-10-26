import {
  useState,
  MouseEventHandler,
  useEffect,
  ChangeEventHandler
} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import { useContributionStore, Store } from '../store/contribute'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  Over
} from '../components/Layout'
import ROUTES from '../routes'
import SnakeProgress from '../components/SnakeProgress'
import { useAuthStore } from '../store/auth'
import HeaderJustGoingBack from '../components/HeaderJustGoingBack'
import { CURVE } from '@noble/bls12-381'
import { hkdf } from '@noble/hashes/hkdf'
import { sha256 } from '@noble/hashes/sha256'
import { randomBytes } from '@noble/hashes/utils'
import { Trans, useTranslation } from 'react-i18next'
import { MIN_MOUSE_ENTROPY_SAMPLES } from '../constants'
import 'text-security'

type Player = {
  play: () => void
  pause: () => void
  seek: (percent: number) => void
}

const EntropyInputPage = () => {
  useTranslation()
  const navigate = useNavigate()
  const [keyEntropy, setKeyEntropy] = useState('')
  const [mouseEntropy, setMouseEntropy] = useState('')
  const [lastMouseEntropyUpdate, setLastMouseEntropyUpdate] = useState(0)
  const [mouseEntropyRandomOffset, setMouseEntropyRandomOffset] = useState(0)
  const [mouseEntropySamples, setMouseEntropySamples] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [player, setPlayer] = useState<Player | null>(null)
  const { provider } = useAuthStore()

  const updateEntropy = useContributionStore(
    (state: Store) => state.updateEntropy
  )
  const handleSubmit = () => {
    if (percentage !== 100) return
    processGeneratedEntropy()
    if (provider === 'Ethereum') {
      navigate(ROUTES.DOUBLE_SIGN)
    } else {
      navigate(ROUTES.LOBBY)
    }
  }

  const handleCaptureMouseEntropy: MouseEventHandler<HTMLDivElement> = (e) => {
    /*
    Mouse entropy is based off of recording the position and precise timing of mouse movements.
    Entropy is only collected every ~128 ms to help reduce correlated mouse locations. The precise period is sampled
    from ~ U[0, 255] to increase sample periodicity variance.
    performance.now() is used for timestamps due to its sub-millisecond resolution in some browsers.
    */
    if (performance.now() - lastMouseEntropyUpdate > mouseEntropyRandomOffset) {
      setLastMouseEntropyUpdate(performance.now())
      setMouseEntropyRandomOffset(randomBytes(1)[0])
      setMouseEntropySamples(mouseEntropySamples + 1)
      setMouseEntropy(
        `${mouseEntropy}${e.movementX}${e.movementY}${e.screenX}${
          e.screenY
        }${performance.now()}`
      )
    }
  }

  const handleCaptureKeyEntropy: ChangeEventHandler<HTMLInputElement> = (e) => {
    setKeyEntropy(`${keyEntropy}${e.target.value}${performance.now()}`)
  }

  const processGeneratedEntropy = async () => {
    const entropy = mouseEntropy + keyEntropy + randomBytes(32)
    const entropyAsArray = Uint8Array.from(
      entropy.split('').map((x) => x.charCodeAt(0))
    )
    /*
    In order to reduce modulo-bias in the entropy (w.r.t. the curve order):
    it is expanded out (and mixed) to at least 48 bytes before being reduced mod curve order.
    This exact technique is the RECOMMENDED means of obtaining a ~uniformly random F_r element according to
    the IRTF BLS signature specs: https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-bls-signature-05#section-2.3
    */
    const salt = randomBytes(32)
    const expandedEntropy = hkdf(sha256, entropyAsArray, salt, '', 48)

    const hex96 = expandedEntropy.reduce(
      (str, byte) => str + byte.toString(16).padStart(2, '0'),
      ''
    )
    const expandedEntropyInt = BigInt('0x' + hex96)
    const secretInt = expandedEntropyInt % CURVE.r
    const secretHex = '0x' + secretInt.toString(16).padStart(64, '0')
    updateEntropy(secretHex)
  }

  useEffect(() => {
    // MIN_MOUSE_ENTROPY_SAMPLES Chosen to target 128 bits of entropy, assuming 2 bits added per sample.
    const percentage = Math.min(
      Math.floor((mouseEntropySamples / MIN_MOUSE_ENTROPY_SAMPLES) * 100),
      100
    )
    setPercentage(percentage)
    if (player) player.seek(percentage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseEntropy])

  return (
    <>
      <HeaderJustGoingBack />
      <Over>
        <Container onMouseMove={handleCaptureMouseEntropy}>
          <SnakeProgress onSetPlayer={setPlayer} />
          <Wrap>
            <PageTitle>
              <Trans i18nKey="entropyInput.title">
                Entropy <br /> Entry
              </Trans>
            </PageTitle>
            <TextSection>
              <Trans i18nKey="entropyInput.description">
                <Desc>
                  The Ceremony requires three random inputs from each Summoner.
                </Desc>
                <SubDesc>
                  <Bold>Secret:</Bold> A piece of you in text form, with random
                  characters added. A hope for the future, or the name of
                  someone dear.
                </SubDesc>
                <SubDesc>
                  <Bold>Sigil:</Bold> Trace some elements of the guide with your
                  cursor - the interface will capture your unique path.
                </SubDesc>
                <SubDesc>
                  <Bold>Sample:</Bold> Your browser will generate its own
                  randomness in the background.
                </SubDesc>
              </Trans>
            </TextSection>
            <Input
              keyEntropy={keyEntropy}
              placeholder="Secret"
              onChange={handleCaptureKeyEntropy}
            />

            <ButtonSection>
              <PrimaryButton
                disabled={percentage !== 100}
                onClick={handleSubmit}
              >
                <Trans i18nKey="entropyInput.button">Submit</Trans>
              </PrimaryButton>
            </ButtonSection>
          </Wrap>
        </Container>
      </Over>
    </>
  )
}

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

const Input = styled.input<{ keyEntropy: string }>`
  font-family: ${({ keyEntropy }) =>
    keyEntropy === '' ? 'inherit' : 'text-security-disc'};
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
