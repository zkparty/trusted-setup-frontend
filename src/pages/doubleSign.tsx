import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import {
  SingleContainer as Container,
  Over,
  SingleWrap as Wrap,
  TextSection
} from '../components/Layout'
import ROUTES from '../routes'
import { blsSignId } from '../utils'
import { useAuthStore } from '../store/auth'
import { providers } from 'ethers'
import { Trans, useTranslation } from 'react-i18next'
import { useContributionStore, Store } from '../store/contribute'
import HeaderJustGoingBack from '../components/HeaderJustGoingBack'

declare global {
  interface Window {
    ethereum: any
  }
}

const DoubleSignPage = () => {
  useTranslation()
  const { updateECDSASignature } = useContributionStore((state: Store) => ({
    entropy: state.entropy,
    updateECDSASignature: state.updateECDSASignature,
    updateBLSSignatures: state.updateBLSSignatures
  }))
  const navigate = useNavigate()
  const handleClickSign = async () => {
    /*
     TODO: this should be implemented in Rust
    // do double sign
    for (let i = 0; i < entropy.length; i++) {
      const signed = await blsSignId(entropy, provider!, nickname!);
      updateBLSSignatures(i, signed);
    }
    */
    await signPotPubkeysWithECDSA()
    navigate(ROUTES.LOBBY)
  }

  const signPotPubkeysWithECDSA = async () => {
    const potPubkeys = [
      '0x93e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8',
      '0x93e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8',
      '0x93e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8',
      '0x93e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8'
    ]
    // built the message to be signed
    const numG1Powers = [4096, 8192, 16384, 32768]
    const potPubkeysObj = []
    for (let i = 0; i < 4; i++) {
      const element = {
        numG1Powers: numG1Powers[i],
        numG2Powers: 65,
        potPubkey: potPubkeys[i]
      }
      potPubkeysObj.push(element)
    }
    const types = {
      PoTPubkeys: [{ name: 'potPubkeys', type: 'contributionPubkey[]' }],
      contributionPubkey: [
        { name: 'numG1Powers', type: 'uint256' },
        { name: 'numG2Powers', type: 'uint256' },
        { name: 'potPubkey', type: 'bytes' }
      ]
    }
    const domain = {
      name: 'Ethereum KZG Ceremony',
      version: '1.0',
      chainId: 1
    }
    const message = {
      potPubkeys: potPubkeysObj
    }
    const provider = new providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    // sign with ether js
    // TODO: method name might change in the futue (no underscore)
    // https://docs.ethers.io/v5/api/signer/
    const signature = await signer._signTypedData(domain, types, message)
    // save signature for later
    updateECDSASignature(signature)
  }

  return (
    <>
      <HeaderJustGoingBack />
      <Over>
        <Container>
          <Wrap>
            <InnerWrap>
              <PageTitle>
                <Trans i18nKey="doubleSign.title">
                  Bind your <br /> Contribution
                </Trans>
              </PageTitle>
              <TextSection>
                <Trans i18nKey="doubleSign.description">
                  <Description>
                    This signature binds each Summoner’s entropy contribution to
                    their Ethereum address.
                  </Description>
                </Trans>
              </TextSection>
              <ButtonSection>
                <Trans i18nKey="doubleSign.button">
                  <PrimaryButton onClick={handleClickSign}>Sign</PrimaryButton>
                </Trans>
              </ButtonSection>
            </InnerWrap>
          </Wrap>
        </Container>
      </Over>
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
