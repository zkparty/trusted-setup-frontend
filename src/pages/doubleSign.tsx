import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  Bg,
  Img,
  TextSection
} from '../components/Layout'
import wasm from '../wasm'
import ROUTES from '../routes'
import { useAuthStore } from '../store/auth'
import BgImg from '../assets/img-graphic-base.svg'
import InnerColor from '../assets/inner-color.svg'
import SnakeColor from '../assets/snake-color.svg'
import OuterWhite from '../assets/outer-white.svg'
import { providers } from 'ethers'
import { useContributionStore, Store } from '../store/contribute'
import HeaderJustGoingBack from '../components/HeaderJustGoingBack'

declare global {
  interface Window {
       ethereum: any
  }
}

const DoubleSignPage = () => {
  /*
  // TODO: BLS signing should happen in Rust. Waiting implementation
  import { blsSignId } from '../utils'
  const { provider, nickname } = useAuthStore()
  const signed = await blsSignId(entropy[0], provider!, nickname!);
  */

  const { entropy, updateSignature } = useContributionStore((state: Store) => ({
    entropy: state.entropy,
    updateSignature: state.updateSignature,
  }))
  const navigate = useNavigate()
  const handleClickSign = async () => {
    // do double sign
    await signPotPubkeysWithECDSA();
    navigate(ROUTES.LOBBY)
  }

  const signPotPubkeysWithECDSA = async () => {
    const potPubkeys = await wasm.getPotPubkeys(entropy)
    // built the message to be signed
    const numG1Powers = [4096, 8192, 16384, 32768]
    const potPubkeysObj = []
    for (let i = 0; i < 4; i++) {
      const element = {
        "numG1Powers": numG1Powers[i],
        "numG2Powers": 65,
        "potPubkey": potPubkeys[i]
      };
      potPubkeysObj.push(element)
    }
    const types = {
      "PoTPubkeys": [
        { "name": "potPubkeys", "type": "contributionPubkey[]"}
      ],
      "contributionPubkey": [
        {"name": "numG1Powers", "type": "uint256"},
        {"name": "numG2Powers", "type": "uint256"},
        {"name": "potPubkey", "type": "bytes"}
      ],
    }
    const domain = {
      "name": "Ethereum KZG Ceremony",
      "version": "1.0",
      "chainId": 1
    }
    const message = {
      "potPubkeys": potPubkeysObj
    }
    const provider = new providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    // sign with ether js
    // TODO: method name might change in the futue (no underscore)
    // https://docs.ethers.io/v5/api/signer/
    const signature = await signer._signTypedData(domain, types, message)
    // save signature for later
    updateSignature(signature);
  }

  return (
    <>
      <HeaderJustGoingBack />
      <Container>
        <Bg src={BgImg} />
        <Img src={InnerColor} />
        <Img src={OuterWhite} />
        <Img src={SnakeColor} />
        <Wrap>
          <InnerWrap>
            <PageTitle>
              Seal your <br /> memory
            </PageTitle>
            <TextSection>
              <Description>
                Rember the neverending flight to birth new tools which we use to
                build towards brighter worlds. We are part of this story, every
                day a new page.
              </Description>
            </TextSection>
            <ButtonSection>
              <PrimaryButton onClick={handleClickSign}>Seal it</PrimaryButton>
            </ButtonSection>
          </InnerWrap>
        </Wrap>
      </Container>
    </>
  )
}

const InnerWrap = styled.div`
  margin-top: 100px;
`

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
`

export default DoubleSignPage
