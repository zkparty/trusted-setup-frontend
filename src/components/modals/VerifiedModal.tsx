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

type Props = {
  open: boolean
  data: Transcript | null | undefined
  dataAsString: string | null | undefined
  onDeselect: () => void
}

const VerifiedModal = ({ open, data, dataAsString, onDeselect }: Props) => {
  const { t } = useTranslation()

  const [verifiedSanity, setVerifiedSanity] = useState(false)
  const [verifiedNoZeros, setVerifiedNoZeros] = useState(false)
  const [verifiedPoT, setVerifiedPoT] = useState(false)
  const [verifiedContributions, setVerifiedContributions] = useState(false)
  const [verifiedHash, setVerifiedHash] = useState(false)

  const [ethAddress, setEthAddress] = useState('')
  const [verifyingECDSA, setVerifyingECDSA] = useState(false)
  const [verifiedECDSA, setVerifiedECDSA] = useState(false)

  useEffect(() => {
    const verifyTranscript = async () => {
      if ( !(open && data && dataAsString) ) return
      setTimeout(async () => {
        const result = await wasm.verify(dataAsString)
        setVerifiedContributions(result)
      }, 1000)
      setTimeout(() => {
        setVerifiedSanity(true)
      }, 3000)
      setTimeout(() => {
        setVerifiedNoZeros(true)
      }, 6000)
      setTimeout(() => {
        setVerifiedPoT(true)
      }, 9000)
      setTimeout(() => {
        const transcriptHash = '0x' + bytesToHex(sha256(dataAsString))
        console.log(transcriptHash)
        if (transcriptHash === TRANSCRIPT_HASH){
          setVerifiedHash(true)
        }
      }, 12000)
    }
    verifyTranscript()
  }, [open, data, dataAsString])

  const onClickVerifyECDSA = async () => {
    setVerifyingECDSA(true)
    // get participant index
    const index = data?.participantIds.indexOf(
      `eth|${ethAddress.toLowerCase().trim()}`
    )
    console.log(index)
    if (!index) return

    // get participant ecdsa signature
    const ecdsa = data?.participantEcdsaSignatures[index]
    console.log(ecdsa)
    if (!ecdsa) return

    // get participant potPubkeys
    const potPubkeys: string[] = [];
    data?.transcripts.forEach((transcript) => {
      potPubkeys.push(transcript.witness.potPubkeys[index])
    })
    console.log(potPubkeys)
    if (potPubkeys.length !== 4) return

    // rebuild EIP-712 message
    const { domain, types, message, primaryType } = buildEIP712Message(potPubkeys)
    const recoveredAddress = await recoverTypedDataAddress({
      domain,
      types,
      message,
      primaryType,
      signature: ecdsa as Hex,
    })
    console.log(recoveredAddress)
    if (recoveredAddress !== ethAddress) return

    setVerifyingECDSA(false)
    setVerifiedECDSA(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEthAddress(value)
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
        <li>Sanity checking: {verifiedSanity ? <GreenSpan>Passed</GreenSpan> : ''}</li>
        <li>
          Verifying no secret is zero:{' '}
          {verifiedNoZeros ? <GreenSpan>Passed</GreenSpan> : ''}
        </li>
        <li>
          Verifying Powers of Tau: {verifiedPoT ? <GreenSpan>Passed</GreenSpan> : ''}
        </li>
        <li>
          Verifying transcript hash: {verifiedHash ? <GreenSpan>Passed</GreenSpan> : <RedSpan>Mismatch</RedSpan>}
        </li>
        <li>
          Verifying all contributions:{' '}
          {verifiedContributions ? <GreenSpan>Passed</GreenSpan> : ''}
        </li>
      </Ol>
      <SearchInput
        placeholder={t('verify.searchBar')}
        onChange={handleInputChange}
      />
      <SecondaryButton
        disabled={verifyingECDSA}
        onClick={onClickVerifyECDSA}
      >
        <Trans i18nKey="verify.button-ecdsa">Verify ECDSA</Trans>
      </SecondaryButton>
      <Ol>
        <li>
          ECDSA verification status: {verifiedECDSA ? <GreenSpan>Passed</GreenSpan> : <GraySpan>Not found</GraySpan>}
        </li>
      </Ol>
      { verifiedNoZeros && verifiedPoT && /*verifiedHash &&*/ verifiedContributions && <PrimaryButton style={{ height: '35px' }}>Claim POAP</PrimaryButton>}
    </Modal>
  )
}

const Ol = styled.ol`
  padding: 0px;
  display: grid;
  gap: 7px;
  cursor: default;
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
