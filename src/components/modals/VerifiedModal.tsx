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

  const [verifyClicked, setVerifyClicked] = useState(false)
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
  const [verifiedECDSA, setVerifiedECDSA] = useState(false)
  const [verifyECDSAError, setVerifyECDSAError] = useState<string | null>(null)
  const [dataReady, setDataReady] = useState(false)
  const [validInput, setValidInput] = useState(true)

  useEffect(() => {
    if (open && data && dataAsString) setDataReady(true)
  }, [open, data, dataAsString])

  const onClickClaimPOAP = async () => {
    console.log('claiming POAP')
  }

  const verifyTranscript = async () => {
    const result = await wasm.verify(dataAsString || ' ')
    setVerifiedContributions(result)
    setVerifyContributionsError(!result)
    setVerifiedSanity(true)
    setVerifySanityError(!result)
    setVerifiedNoZeros(true)
    setVerifyNoZerosError(!result)
    setVerifiedPoT(true)
    setVerifyPoTError(!result)
    const transcriptHash = '0x' + bytesToHex(sha256(dataAsString || ''))
    //console.log(transcriptHash)
    if (transcriptHash === TRANSCRIPT_HASH) {
      setVerifiedHash(true)
    } else {
      setVerifyHashError(true)
    }

    // ECDSA sig verification
    setVerifyECDSAError(null)
    // get participant index
    const ethAddressInLowerCase = ethAddress.trim().toLowerCase()
    const index = data?.participantIds.indexOf(`eth|${ethAddressInLowerCase}`)
    if (!index || index < 0) {
      setVerifyClicked(false)
      return
    }

    // get participant ecdsa signature
    const ecdsa = data?.participantEcdsaSignatures[index]
    if (!ecdsa) {
      setVerifyClicked(false)
      return
    }

    // get participant potPubkeys
    const potPubkeys: string[] = []
    data?.transcripts.forEach((transcript) => {
      potPubkeys.push(transcript.witness.potPubkeys[index])
    })
    if (potPubkeys.length !== 4) {
      setVerifyClicked(false)
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
      setVerifyClicked(false)
      setVerifyECDSAError('Mismatch')
      return
    }

    setVerifyClicked(false)
    setVerifiedECDSA(true)
    return false
  }

  const validateEthAddress = (address: string): boolean => {
    // Empty input is valid
    if (address.trim().length === 0) return true

    // Validate for complete ETH address
    const ethAddressInLowerCase = address.trim().toLowerCase()
    return /^0x([0-9]|[a-f]){40}$/.test(ethAddressInLowerCase)
  }

  const onClickVerify = async () => {
    verifyTranscript()
    setVerifyClicked(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const valid = validateEthAddress(value)
    if (valid) setEthAddress(value)
    setValidInput(valid)
    setVerifiedECDSA(false)
    setVerifyECDSAError(null)
  }

  const testListItem = (title: String, isDone: boolean, isError: boolean, errText: string | null = 'Error' ) => {
    return (
    <div>
      {verifyClicked ? title : (<GraySpan>{title}</GraySpan>)}:{' '}
      {isDone ? 
        isError ? (
          <RedSpan>{errText}</RedSpan>

        ) : (
          <GreenSpan>Passed</GreenSpan>
      ) : (
        <GraySpan>Waiting</GraySpan>
      )}
    </div>
    )
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
        <Trans i18nKey="verify.title">Verify transcript</Trans>
      </PageTitle>
      <ItalicSubTitle style={{ fontSize: FONT_SIZE.S, margin: '0px' }}>
        <Trans i18nKey="verify.time-warning">
          The verification might take a minute to complete
        </Trans>
      </ItalicSubTitle>
      <SearchInput
        placeholder={t('verify.searchBar')}
        onChange={handleInputChange}
      />
      {verifyClicked ? (
        <LoadingSpinner />
      ) : (
        <SecondaryButton disabled={!dataReady || !validInput || verifyClicked} onClick={onClickVerify}>
          <Trans i18nKey="verify.button-ecdsa">Verify</Trans>
        </SecondaryButton>
      )}
      <Ol>
        <li>
          {testListItem('Sanity checking', verifiedSanity, verifySanityError)}
        </li>
        <li>
          {testListItem('Verifying no secret is zero', verifiedNoZeros, verifyNoZerosError)}
        </li>
        <li>
          {testListItem('Verifying Powers of Tau', verifiedPoT, verifyPoTError)}
        </li>
        <li>
          {testListItem('Verifying transcript hash', verifiedHash, verifyHashError, 'Mismatch')}
        </li>
        <li>
          {testListItem('Verifying all contributions', verifiedContributions, verifyContributionsError)}
        </li>
        <li>
          {testListItem('ECDSA verification status', verifiedECDSA, !!verifyECDSAError, verifyECDSAError)}
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
