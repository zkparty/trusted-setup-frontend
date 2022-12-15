import {
  useState,
  MouseEventHandler,
  useEffect,
  forwardRef,
  ChangeEventHandler
} from 'react'
import wasm from '../wasm'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../components/Button'
import { Description, PageTitle, Bold } from '../components/Text'
import { useEntropyStore } from '../store/contribute'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  SingleButtonSection,
  TextSection,
  Over
} from '../components/Layout'
import ROUTES from '../routes'
import SnakeProgress from '../components/SnakeProgress'
import HeaderJustGoingBack from '../components/HeaderJustGoingBack'
import { CURVE } from '@noble/bls12-381'
import { hkdf } from '@noble/hashes/hkdf'
import { sha256 } from '@noble/hashes/sha256'
import { randomBytes } from '@noble/hashes/utils'
import { Trans, useTranslation } from 'react-i18next'
import { MIN_MOUSE_ENTROPY_SAMPLES, FONT_SIZE } from '../constants'
import 'text-security'
import LoadingSpinner from '../components/LoadingSpinner'
import AnimatedCursor from '../components/AnimatedCursor'

type Player = {
  play: () => void
  pause: () => void
  seek: (percent: number) => void
}

const EntropyInputPage = forwardRef((_, bgRef: any) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [keyEntropy, setKeyEntropy] = useState('')
  const [mouseEntropy, setMouseEntropy] = useState('')
  const [lastMouseEntropyUpdate, setLastMouseEntropyUpdate] = useState(0)
  const [mouseEntropyRandomOffset, setMouseEntropyRandomOffset] = useState(0)
  const [mouseEntropySamples, setMouseEntropySamples] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [player, setPlayer] = useState<Player | null>(null)

  const { updateEntropy, updatePotPubkeys } = useEntropyStore()
  const handleSubmit = () => {
    if (percentage !== 100) return
    setIsLoading(true)
    processGeneratedEntropy()
    navigate(ROUTES.SIGNIN)
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
    const entropyGenerated = mouseEntropy + keyEntropy
    const entropyGeneratedAsBytes = Uint8Array.from( entropyGenerated.split('').map((x) => x.charCodeAt(0)) )
    const entropyRandomAsBytes = randomBytes(32)
    const entropyAsBytes = new Uint8Array(entropyGeneratedAsBytes.length + entropyRandomAsBytes.length)
    entropyAsBytes.set(entropyGeneratedAsBytes)
    entropyAsBytes.set(entropyRandomAsBytes, entropyGeneratedAsBytes.length)
    /*
    In order to reduce modulo-bias in the entropy (w.r.t. the curve order):
    it is expanded out (and mixed) to at least 48 bytes before being reduced mod curve order.
    This exact technique is the RECOMMENDED means of obtaining a ~uniformly random F_r element according to
    the IRTF BLS signature specs: https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-bls-signature-05#section-2.3
    */
    const salt = randomBytes(32)
    const expandedEntropy = hkdf(sha256, entropyAsBytes, salt, '', 48)

    const hex96 = expandedEntropy.reduce(
      (str, byte) => str + byte.toString(16).padStart(2, '0'),
      ''
    )
    const expandedEntropyInt = BigInt('0x' + hex96)
    const secretInt = expandedEntropyInt % CURVE.r
    const secretHex = secretInt.toString(16).padStart(64, '0')
    const potPubkeys = await wasm.getPotPubkeys(secretHex)

    updateEntropy(secretHex)
    updatePotPubkeys(potPubkeys)
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
      <Over style={{ cursor: 'none' }}>
        <Container onMouseMove={handleCaptureMouseEntropy}>
          <AnimatedCursor ref={bgRef}/>
          <SnakeProgress onSetPlayer={setPlayer} />
          <Wrap style={{ cursor: 'auto' }}>
            <PageTitle>
              <Trans i18nKey="entropyInput.title">
                Entropy <br /> Entry
              </Trans>
            </PageTitle>
            <TextSection>
              <Trans i18nKey="entropyInput.description">
                <Description>
                  The Ceremony requires three random inputs from each Summoner.
                </Description>
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
              placeholder={t("entropyInput.placeholder")}
              onChange={handleCaptureKeyEntropy}
            />

            <ButtonSection>
              {isLoading ?
              <LoadingSpinner></LoadingSpinner>
              :
              <PrimaryButton
                disabled={percentage !== 100 || keyEntropy === ''}
                onClick={handleSubmit}
              >
                <Trans i18nKey="entropyInput.button">Submit</Trans>
              </PrimaryButton>
              }
            </ButtonSection>
          </Wrap>
        </Container>
      </Over>
    </>
  )
})

const SubDesc = styled(Description)`
  margin: 0 0 15px;
`

const Input = styled.input<{ keyEntropy: string }>`
  font-family: ${({ keyEntropy }) =>
    keyEntropy === '' ? 'inherit' : 'text-security-disc'};
  text-align: center;
  text-security: disc;
  -moz-text-security: disc;
  -webkit-text-security: disc;
  font-size: ${FONT_SIZE.M};
  margin-top: 3px;
  padding: 4px 8px;
  border: solid 1px ${({ theme }) => theme.text};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.surface};
  min-height: 29px;
  width: 300px;
`

const ButtonSection = styled(SingleButtonSection)`
  margin-top: 12px;
  height: auto;
`

export default EntropyInputPage
