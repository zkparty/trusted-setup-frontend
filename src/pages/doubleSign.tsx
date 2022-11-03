import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  SingleButtonSection,
  TextSection,
  InnerWrap,
  Over,
} from '../components/Layout'
import ROUTES from '../routes'
import { useState } from 'react'
import { providers } from 'ethers'
import { Trans, useTranslation } from 'react-i18next'
import LoadingSpinner from '../components/LoadingSpinner'
import { useContributionStore, Store } from '../store/contribute'
import HeaderJustGoingBack from '../components/HeaderJustGoingBack'
import wasm from '../wasm'

declare global {
  interface Window {
    ethereum: any
  }
}

const DoubleSignPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  useTranslation()
  const { entropy, updateECDSASignature } = useContributionStore((state: Store) => ({
    entropy: state.entropy,
    updateECDSASignature: state.updateECDSASignature,
  }))
  const navigate = useNavigate()
  const handleClickSign = async () => {
    setIsLoading(true)
    await signPotPubkeysWithECDSA()
    navigate(ROUTES.LOBBY)
  }

  const signPotPubkeysWithECDSA = async () => {
    const potPubkeys = await wasm.getPotPubkeys(entropy!)
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
                {isLoading ?
                  <LoadingSpinner></LoadingSpinner>
                  :
                  <Trans i18nKey="doubleSign.button">
                    <PrimaryButton onClick={handleClickSign} disabled={isLoading}>Sign</PrimaryButton>
                  </Trans>}
              </ButtonSection>
            </InnerWrap>
          </Wrap>
        </Container>
      </Over>
    </>
  )
}

const ButtonSection = styled(SingleButtonSection)`
  margin-top: 12px;
  height: auto;
`

export default DoubleSignPage
