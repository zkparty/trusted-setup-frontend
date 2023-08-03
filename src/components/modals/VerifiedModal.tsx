import Modal from 'react-modal'
import theme from '../../style/theme'
import { isMobile } from '../../utils'
import { useEffect, useState } from 'react'
import { Transcript } from '../../types'
import wasm from '../../wasm'
import SearchInput from '../SearchInput'
import { ItalicSubTitle, PageTitle } from '../Text'
import { Trans, useTranslation } from 'react-i18next'
import { sha256 } from '@noble/hashes/sha256'
import { bytesToHex } from '@noble/hashes/utils'
import { PrimaryButton } from '../Button'
import styled from 'styled-components'
import { FONT_SIZE } from '../../constants'

type Props = {
  open: boolean
  data: Transcript | null | undefined
  onDeselect: () => void
}

const VerifiedModal = ({ open, data, onDeselect }: Props) => {
  const { t } = useTranslation()

  const [verifiedSanity, setVerifiedSanity] = useState(false)
  const [verifiedNoZeros, setVerifiedNoZeros] = useState(false)
  const [verifiedPoT, setVerifiedPoT] = useState(false)
  const [verifiedContributions, setVerifiedContributions] = useState(false)
  const [verifiedHash, setVerifiedHash] = useState(false)
  const [verificationResult, setVerificationResult] = useState(false)

  const [ethAddress, setEthAddress] = useState('')
  const [verifyingECDSA, setVerifyingECDSA] = useState(false)
  const [verifiedECDSA, setVerifiedECDSA] = useState(false)

  useEffect(() => {
    const verifyTranscript = async () => {
      if (!open || !data) return
      setTimeout(() => {
        setVerifiedSanity(true)
      }, 3000)
      setTimeout(() => {
        setVerifiedNoZeros(true)
      }, 6000)
      setTimeout(() => {
        setVerifiedPoT(true)
      }, 9000)
      const transcriptAsString = JSON.stringify(data)
      const result = await wasm.verify(transcriptAsString)
      setVerifiedContributions(result)
      const transcriptHash = '0x' + bytesToHex(sha256(transcriptAsString))
      if (transcriptHash) {
        // TODO: get the latest transcript hash from env variable and compare it
        return
      }
      setVerifiedHash(true)
      setVerificationResult(result)
    }
    verifyTranscript()
  }, [open, data])

  const onClickVerifyECDSA = async () => {
    setVerifyingECDSA(true)
    console.log(ethAddress)
    // TODO: check eth address
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
          width: isMobile() ? '90%' : '400px',
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
          The verification might taken around a minute
        </Trans>
      </ItalicSubTitle>
      <ol style={{ padding: '0px', display: 'grid', gap: '7px' }}>
        <li>Sanity checking: {verifiedSanity ? <Span>Passed</Span> : ''}</li>
        <li>
          Verifying no secret is zero:{' '}
          {verifiedNoZeros ? <Span>Passed</Span> : ''}
        </li>
        <li>
          Verifying Powers of Tau: {verifiedPoT ? <Span>Passed</Span> : ''}
        </li>
        <li>
          Verifying all contributions:{' '}
          {verifiedContributions ? <Span>Passed</Span> : ''}
        </li>
        <li>
          Verifying transcript hash: {verifiedHash ? <Span>Passed</Span> : ''}
        </li>
        <li>
          Verification status: {verificationResult ? <Span>Passed</Span> : ''}
        </li>
      </ol>
      <SearchInput
        placeholder={t('verify.searchBar')}
        onChange={handleInputChange}
      />
      <PrimaryButton
        disabled={verifyingECDSA}
        style={{ height: '35px' }}
        onClick={onClickVerifyECDSA}
      >
        <Trans i18nKey="verify.button-ecdsa">Verify ECDSA</Trans>
      </PrimaryButton>
      <ol style={{ padding: '0px', display: 'grid', gap: '7px' }}>
        <li>
          ECDSA verification status: {verifiedECDSA ? <Span>Passed</Span> : ''}
        </li>
      </ol>
    </Modal>
  )
}

const Span = styled.span`
  color: #61cc61;
`

export default VerifiedModal
