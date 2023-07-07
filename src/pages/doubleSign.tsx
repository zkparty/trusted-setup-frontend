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
  Over
} from '../components/Layout'
import { useEntropyStore } from '../store/contribute'
import ROUTES from '../routes'
import { useState, useEffect } from 'react'
import ErrorMessage from '../components/Error'
import { ErrorRes, RequestLinkRes } from '../types'
import { Trans, useTranslation } from 'react-i18next'
import LoadingSpinner from '../components/LoadingSpinner'
import HeaderJustGoingBack from '../components/headers/HeaderJustGoingBack'
import api from '../api'
import { useWeb3Modal } from '@web3modal/react'
import {
  useAccount,
  useNetwork,
  useDisconnect,
  useSignTypedData,
  useSwitchNetwork
} from 'wagmi'
import { buildEIP712Message } from '../utils'

const DoubleSignPage = () => {
  const [error, setError] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { potPubkeys } = useEntropyStore()
  const { updateECDSASigner, updateECDSASignature } = useEntropyStore()
  const { open, close } = useWeb3Modal()
  const { chain } = useNetwork()
  const { disconnect } = useDisconnect()
  const { switchNetwork } = useSwitchNetwork()
  const { domain, types, message, primaryType } = buildEIP712Message(potPubkeys)
  const { data, signTypedData, reset } = useSignTypedData({
    domain,
    message,
    primaryType,
    types
  })
  const { address, isConnected } = useAccount()

  useEffect(() => {
    disconnect()
    // eslint-disable-next-line no-restricted-globals
    if (self.crossOriginIsolated) {
      console.log('refreshing...')
      navigate(0)
    } else {
      console.log(
        `${window.crossOriginIsolated ? '' : 'not'} x-origin isolated`
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    ;(async () => {
      if (!data || !address) return
      // save signature for later
      updateECDSASigner(address)
      updateECDSASignature(data)
      await onSigninSIWE()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (address && isConnected) {
      if (switchNetwork) {
        switchNetwork(1)
      }
      signTypedData()
    } else {
      disconnect()
      close()
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnected])

  const signPotPubkeysWithECDSA = async () => {
    //TODO: repeat using different addresses here and in SIWE
    disconnect()
    await open()
  }

  const onSigninSIWE = async () => {
    const requestLinks = await api.getRequestLink()
    const code = (requestLinks as ErrorRes).code
    switch (code) {
      case undefined:
        window.location.replace((requestLinks as RequestLinkRes).eth_auth_url)
        break
      case 'AuthErrorPayload::LobbyIsFull':
        navigate(ROUTES.LOBBY_FULL)
        return
      default:
        setError(JSON.stringify(requestLinks))
        break
    }
  }

  const handleClickSign = async () => {
    setError(null)
    setIsLoading(true)
    try {
      await signPotPubkeysWithECDSA()
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
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
                {chain && chain.name !== 'Ethereum' && (
                  <ErrorMessage>{t('error.incorrectChainId')}</ErrorMessage>
                )}
                <Trans i18nKey="doubleSign.description">
                  <Description>
                    Signing below will bind each Summoner’s entropy contribution
                    to their Ethereum address. Participants will be redirected
                    to a "Sign-in with Ethereum" page, and then back to this
                    interface to complete the final steps of the process.
                  </Description>
                </Trans>
              </TextSection>
              <ButtonSection>
                {isLoading ? (
                  <>
                    <CheckWalletDesc>
                      <Trans i18nKey="doubleSign.checkWallet">
                        Check your wallet to sign the contribution
                      </Trans>
                    </CheckWalletDesc>
                    <LoadingSpinner></LoadingSpinner>
                  </>
                ) : (
                  <PrimaryButton onClick={handleClickSign} disabled={isLoading}>
                    <Trans i18nKey="doubleSign.button">Sign</Trans>
                  </PrimaryButton>
                )}
              </ButtonSection>
            </InnerWrap>
          </Wrap>
        </Container>
      </Over>
    </>
  )
}

const CheckWalletDesc = styled(Description)`
  margin-bottom: 0px;
  font-weight: 700;
`

const ButtonSection = styled(SingleButtonSection)`
  margin-top: 5px;
  height: auto;
`

export default DoubleSignPage
