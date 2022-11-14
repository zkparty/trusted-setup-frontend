import wasm from '../wasm'
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
import {
  useContributionStore,
  useEntropyStore,
  EntropyStore,
  Store,
} from '../store/contribute'
import {
  INFURA_ID,
} from '../constants'
import ROUTES from '../routes'
import { useState } from 'react'
import { providers } from "ethers";
import { useAuthStore } from '../store/auth'
import ErrorMessage from '../components/Error'
import { Trans, useTranslation } from 'react-i18next'
import LoadingSpinner from '../components/LoadingSpinner'
import HeaderJustGoingBack from '../components/HeaderJustGoingBack'
import { TypedDataDomain, TypedDataField } from "@ethersproject/abstract-signer";
import WalletConnectProvider from '@walletconnect/web3-provider'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import { Client } from '@spruceid/siwe-web3modal'

const DoubleSignPage = () => {
  const [error, setError] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { nickname } = useAuthStore()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const entropy = useEntropyStore(
    (state: EntropyStore) => state.entropy
  )
  const updateECDSASignature = useContributionStore(
    (state: Store) => state.updateECDSASignature
  )

  const handleClickSign = async () => {
    setError(null)
    setIsLoading(true)
    await signPotPubkeysWithECDSA()
  }

  const buildEIP712Message = async (): Promise<[
    TypedDataDomain,
    Record<string, TypedDataField[]>,
    Record<string, any>
  ]> => {
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
    return [domain, types, message]
  }

  const isSameWallet = async (provider: providers.JsonRpcProvider, _nickname: string): Promise<boolean> => {
    const signer = provider.getSigner()
    const signingAddress = (await signer.getAddress()).toLowerCase()
    const nickname = _nickname.toLowerCase()
    if (signingAddress === nickname){
      return true;
    }
    const ens = await provider.lookupAddress(signingAddress)
    if (ens === nickname){
      return true;
    }
    return false;
  }

  const signPotPubkeysWithECDSA = async () => {
    const client = new Client({
      modal: {
        theme: 'dark',
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              infuraId: INFURA_ID,
              pollingInterval: 100000,
            },
          },
          walletlink: {
            package: CoinbaseWalletSDK,
            options: {
              appName: "Ethereum KZG Ceremony",
              infuraId: INFURA_ID,
            }
          },
        },
      },
      session: {
        domain: window.location.host,
        uri: window.location.origin,
        useENS: true,
        version: '1',
      },
    })
    client.web3Modal.clearCachedProvider()
    const provider = await client.initializeProvider()
    if ( !(await isSameWallet(provider, nickname!)) ){
      setError(t('error.notSameWallet'))
      setIsLoading(false)
      return
    }
    const [domain, types, message] = await buildEIP712Message()
    // TODO: method name might change in the future (no underscore)
    // https://docs.ethers.io/v5/api/signer/
    const signer = provider.getSigner()
    const signature = await signer._signTypedData(domain, types, message)
    // save signature for later
    updateECDSASignature(signature)
    navigate(ROUTES.LOBBY)
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
                {error && <ErrorMessage>{error}</ErrorMessage>}
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
                  <PrimaryButton onClick={handleClickSign} disabled={isLoading}>
                    <Trans i18nKey="doubleSign.button">
                      Sign
                    </Trans>
                  </PrimaryButton>
                }
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
