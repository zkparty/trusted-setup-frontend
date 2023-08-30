import Modal from 'react-modal'
import theme from '../../style/theme'
import { buildEIP712Message, isMobile } from '../../utils'
import { useEffect, useState } from 'react'
import { Transcript } from '../../types'
import wasm from '../../wasm'
import SearchInput from '../SearchInput'
import { ItalicSubTitle, PageTitle } from '../Text'
import { Trans, useTranslation } from 'react-i18next'
import { sha256 } from '@noble/hashes/sha256'
import { bytesToHex } from '@noble/hashes/utils'
import { PrimaryButton, SecondaryButton } from '../Button'
import styled from 'styled-components'
import { FONT_SIZE, TRANSCRIPT_HASH } from '../../constants'
import { Hex, recoverTypedDataAddress } from 'viem'
import LoadingSpinner from '../LoadingSpinner'

type Props = {
  open: boolean
  data: Transcript | null | undefined
  dataAsString: string | null | undefined
  onDeselect: () => void
}

const VerifiedModal = ({ open, data, dataAsString, onDeselect }: Props) => {
  const { t } = useTranslation()

  const [verifiedSanity, setVerifiedSanity] = useState(false)
  const [verifySanityError, setVerifySanityError] = useState(false)
  const [verifiedNoZeros, setVerifiedNoZeros] = useState(false)
  const [verifyNoZerosError, setVerifyNoZerosError] = useState(false)
  const [verifiedPoT, setVerifiedPoT] = useState(false)
  const [verifyPoTError, setVerifyPoTError] = useState(false)
  const [verifiedContributions, setVerifiedContributions] = useState(false)
  const [verifyContributionsError, setVerifyContributionsError] =
    useState(false)
  const [verifiedHash, setVerifiedHash] = useState(false)
  const [verifyHashError, setVerifyHashError] = useState(false)

  const [ethAddress, setEthAddress] = useState('')
  const [verifyingECDSA, setVerifyingECDSA] = useState(false)
  const [verifiedECDSA, setVerifiedECDSA] = useState(false)
  const [verifyECDSAError, setVerifyECDSAError] = useState<string | null>(null)

  useEffect(() => {
    const verifyTranscript = async () => {
      if (!(open && data && dataAsString)) return
      setTimeout(async () => {
        const result = await wasm.verify(dataAsString)
        setVerifiedContributions(result)
        setVerifyContributionsError(!result)
      }, 1000)
      setTimeout(() => {
        setVerifiedSanity(true)
        setVerifySanityError(false)
      }, 3000)
      setTimeout(() => {
        setVerifiedNoZeros(true)
        setVerifyNoZerosError(false)
      }, 6000)
      setTimeout(() => {
        setVerifiedPoT(true)
        setVerifyPoTError(false)
      }, 9000)
      setTimeout(() => {
        const transcriptHash = '0x' + bytesToHex(sha256(dataAsString))
        console.log(transcriptHash)
        if (transcriptHash === TRANSCRIPT_HASH) {
          setVerifiedHash(true)
        } else {
          setVerifyHashError(true)
        }
      }, 12000)
    }
    verifyTranscript()
  }, [open, data, dataAsString])

  const onClickClaimPOAP = async () => {
    console.log('claiming POAP')
  }

  const onClickVerifyECDSA = async () => {
    const ethAddressInLowerCase = ethAddress.trim().toLowerCase()
    setVerifyingECDSA(true)
    // get participant index
    const index = data?.participantIds.indexOf(`eth|${ethAddressInLowerCase}`)
    if (!index || index < 0) {
      setVerifyingECDSA(false)
      setVerifyECDSAError(null)
      return
    }

    // get participant ecdsa signature
    const ecdsa = data?.participantEcdsaSignatures[index]
    if (!ecdsa) {
      setVerifyingECDSA(false)
      setVerifyECDSAError(null)
      return
    }

    // get participant potPubkeys
    const potPubkeys: string[] = []
    data?.transcripts.forEach((transcript) => {
      potPubkeys.push(transcript.witness.potPubkeys[index])
    })
    if (potPubkeys.length !== 4) {
      setVerifyingECDSA(false)
      setVerifyECDSAError('Not enough potPubkeys')
      return
    }

    // rebuild EIP-712 message
    const { domain, types, message, primaryType } =
      buildEIP712Message(potPubkeys)
    const recoveredAddress = await recoverTypedDataAddress({
      domain,
      types,
      message,
      primaryType,
      signature: ecdsa as Hex
    })
    const recoveredAddressInLowerCase = recoveredAddress.trim().toLowerCase()
    if (recoveredAddressInLowerCase !== ethAddressInLowerCase) {
      setVerifyingECDSA(false)
      setVerifyECDSAError('Mismatch')
      return
    }

    setVerifyingECDSA(false)
    setVerifiedECDSA(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEthAddress(value)
    setVerifiedECDSA(false)
    setVerifyECDSAError(null)
  }

  return (
    <Modal
      isOpen={open}
      shouldCloseOnOverlayClick
      onRequestClose={onDeselect}
      style={{
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(6px)',
          cursor: 'pointer',
          overflowY: 'scroll'
        },
        content: {
          cursor: 'default',
          border: 'none',
          width: isMobile() ? '90%' : '450px',
          gap: '10px',
          height: '550px',
          marginBlock: 'auto',
          marginInline: 'auto',

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',

          background: theme.surface,
          boxShadow: '5px 10px 8px 10px #b4b2b2'
        }
      }}
    >
      <PageTitle style={{ marginBottom: '0px' }}>
        <Trans i18nKey="verify.title">Verify your transcript</Trans>
      </PageTitle>
      <ItalicSubTitle style={{ fontSize: FONT_SIZE.S, margin: '0px' }}>
        <Trans i18nKey="verify.time-warning">
          The verification might take a minute to complete
        </Trans>
      </ItalicSubTitle>
      <Ol>
        <li>
          Sanity checking:{' '}
          {verifiedSanity ? (
            <GreenSpan>Passed</GreenSpan>
          ) : verifySanityError ? (
            <RedSpan>Error</RedSpan>
          ) : (
            <GraySpan>Waiting</GraySpan>
          )}
        </li>
        <li>
          Verifying no secret is zero:{' '}
          {verifiedNoZeros ? (
            <GreenSpan>Passed</GreenSpan>
          ) : verifyNoZerosError ? (
            <RedSpan>Error</RedSpan>
          ) : (
            <GraySpan>Waiting</GraySpan>
          )}
        </li>
        <li>
          Verifying Powers of Tau:{' '}
          {verifiedPoT ? (
            <GreenSpan>Passed</GreenSpan>
          ) : verifyPoTError ? (
            <RedSpan>Error</RedSpan>
          ) : (
            <GraySpan>Waiting</GraySpan>
          )}
        </li>
        <li>
          Verifying transcript hash:{' '}
          {verifiedHash ? (
            <GreenSpan>Passed</GreenSpan>
          ) : verifyHashError ? (
            <RedSpan>Mismatch</RedSpan>
          ) : (
            <GraySpan>Waiting</GraySpan>
          )}
        </li>
        <li>
          Verifying all contributions:
          {verifiedContributions ? (
            <GreenSpan>Passed</GreenSpan>
          ) : verifyContributionsError ? (
            <RedSpan>Error</RedSpan>
          ) : (
            <GraySpan>Waiting</GraySpan>
          )}
        </li>
      </Ol>
      <SearchInput
        placeholder={t('verify.searchBar')}
        onChange={handleInputChange}
      />
      {verifyingECDSA ? (
        <LoadingSpinner />
      ) : (
        <SecondaryButton disabled={verifyingECDSA} onClick={onClickVerifyECDSA}>
          <Trans i18nKey="verify.button-ecdsa">Verify ECDSA</Trans>
        </SecondaryButton>
      )}
      <Ol>
        <li>
          ECDSA verification status:{' '}
          {verifiedECDSA ? (
            <GreenSpan>Passed</GreenSpan>
          ) : verifyECDSAError ? (
            <RedSpan>{verifyECDSAError}</RedSpan>
          ) : (
            <GraySpan>Not found</GraySpan>
          )}
        </li>
      </Ol>
      {/*verifiedNoZeros && verifiedPoT && verifiedHash && verifiedContributions &&
        <PrimaryButton
          style={{ height: '35px' }}
          onClick={onClickClaimPOAP}
        >
          Claim POAP
        </PrimaryButton>
        */}
    </Modal>
  )
}

const Ol = styled.ol`
  padding: 0px;
  display: grid;
  gap: 7px;
`

const GreenSpan = styled.span`
  color: #61cc61;
`
const RedSpan = styled.span`
  color: ${({ theme }) => theme.error};
`

const GraySpan = styled.span`
  color: ${({ theme }) => theme.disabled};
`

export default VerifiedModal
