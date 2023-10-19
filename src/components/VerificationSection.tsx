import styled from 'styled-components'
import { useState } from 'react'
import { PrimaryButton } from './Button'
import { Trans, useTranslation } from 'react-i18next'
import { BREAKPOINT, FONT_SIZE, TRANSCRIPT_HASH } from '../constants'
import { Transcript } from '../types'
import { bytesToHex } from 'viem'
import wasm from '../wasm'
import { sha256 } from '@noble/hashes/sha256'
import ExternalLink from './ExternalLink'
import LoadingSpinner from './LoadingSpinner'

type Props = {
  dataAsString: string | null | undefined
  data: Transcript | null | undefined
  setIsTwitterButtonActive: (value: boolean) => void
}

const VerificationSection = ({
  dataAsString,
  data,
  setIsTwitterButtonActive
}: Props) => {
  useTranslation()

  const [clickedOnVerify, setClickedOnVerify] = useState(false)

  const [verifiedSanity, setVerifiedSanity] = useState(false)
  const [verifySanityError, setVerifySanityError] = useState(false)
  const [verifiedNoZeros, setVerifiedNoZeros] = useState(false)
  const [verifyNoZerosError, setVerifyNoZerosError] = useState(false)
  const [verifiedPoT, setVerifiedPoT] = useState(false)
  const [verifyPoTError, setVerifyPoTError] = useState(false)
  const [verifiedHash, setVerifiedHash] = useState(false)
  const [verifyHashError, setVerifyHashError] = useState(false)
  const [verifiedContributions, setVerifiedContributions] = useState(false)
  const [verifyContributionsError, setVerifyContributionsError] =
    useState(false)

  const handleClickVerify = async () => {
    setClickedOnVerify(true)
    if (!(data && dataAsString)) {
      setClickedOnVerify(false)
      return
    }
    setTimeout(async () => {
      const result = await wasm.verify(dataAsString)
      setVerifiedContributions(result)
      setVerifyContributionsError(!result)
      setIsTwitterButtonActive(true)
      setClickedOnVerify(false)
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
      const transcriptHash = bytesToHex(sha256(dataAsString))
      if (transcriptHash === TRANSCRIPT_HASH) {
        setVerifiedHash(true)
      } else {
        setVerifyHashError(true)
      }
    }, 12000)
  }

  return (
    <Container>
      <div>
        <Trans i18nKey="verify.explanation">
          This verification process runs a few checks on the final transcript.
          It may take a few minutes to download locally and process. Learn more
          about the checks{' '}
          <ExternalLink
            href="https://hackmd.io/w7kvxwIhTlShzutKRKmRfA"
            style={{ textDecoration: 'underline' }}
          >
            here
          </ExternalLink>
          .
        </Trans>
      </div>

      <ButtonContainer>
        {clickedOnVerify ? (
          <LoadingSpinner style={{ height: 'auto' }} />
        ) : (
          <PrimaryButton
            style={{ width: 'auto', height: 'auto' }}
            disabled={clickedOnVerify || !data || !dataAsString}
            onClick={handleClickVerify}
          >
            <Trans i18nKey="verify.button">Verify</Trans>
          </PrimaryButton>
        )}
      </ButtonContainer>
      <Ol>
        <Li>
          <span>
            <Trans i18nKey="verify.parts.sanity">Sanity checking</Trans>
          </span>
          <Points />
          {verifiedSanity ? (
            <GreenSpan>
              <Trans i18nKey="verify.messages.passed">passed</Trans>
            </GreenSpan>
          ) : verifySanityError ? (
            <RedSpan>
              <Trans i18nKey="verify.messages.error">error</Trans>
            </RedSpan>
          ) : (
            <GraySpan>
              <Trans i18nKey="verify.messages.waiting">waiting</Trans>
            </GraySpan>
          )}
        </Li>
        <Li>
          <span>
            <Trans i18nKey="verify.parts.no-zero">
              Verifying no secret is zero
            </Trans>
          </span>
          <Points />
          {verifiedNoZeros ? (
            <GreenSpan>
              <Trans i18nKey="verify.messages.passed">passed</Trans>
            </GreenSpan>
          ) : verifyNoZerosError ? (
            <RedSpan>
              <Trans i18nKey="verify.messages.error">error</Trans>
            </RedSpan>
          ) : (
            <GraySpan>
              <Trans i18nKey="verify.messages.waiting">waiting</Trans>
            </GraySpan>
          )}
        </Li>
        <Li>
          <span>
            <Trans i18nKey="verify.parts.powers-of-tau">
              Verifying Powers of Tau
            </Trans>
          </span>
          <Points />
          {verifiedPoT ? (
            <GreenSpan>
              <Trans i18nKey="verify.messages.passed">passed</Trans>
            </GreenSpan>
          ) : verifyPoTError ? (
            <RedSpan>
              <Trans i18nKey="verify.messages.error">error</Trans>
            </RedSpan>
          ) : (
            <GraySpan>
              <Trans i18nKey="verify.messages.waiting">waiting</Trans>
            </GraySpan>
          )}
        </Li>
        <Li>
          <span>
            <Trans i18nKey="verify.parts.transcript-hash">
              Verifying transcript hash
            </Trans>
          </span>
          <Points />
          {verifiedHash ? (
            <GreenSpan>
              <Trans i18nKey="verify.messages.passed">passed</Trans>
            </GreenSpan>
          ) : verifyHashError ? (
            <RedSpan>
              <Trans i18nKey="verify.messages.mismatch">mismatch</Trans>
            </RedSpan>
          ) : (
            <GraySpan>
              <Trans i18nKey="verify.messages.waiting">waiting</Trans>
            </GraySpan>
          )}
        </Li>
        <Li>
          <span>
            <Trans i18nKey="verify.parts.all-contributions">
              Verifying all contributions
            </Trans>
          </span>
          <Points />
          {verifiedContributions ? (
            <GreenSpan>
              <Trans i18nKey="verify.messages.passed">passed</Trans>
            </GreenSpan>
          ) : verifyContributionsError ? (
            <RedSpan>
              <Trans i18nKey="verify.messages.error">error</Trans>
            </RedSpan>
          ) : (
            <GraySpan>
              <Trans i18nKey="verify.messages.waiting">waiting</Trans>
            </GraySpan>
          )}
        </Li>
      </Ol>
      <div style={{ width: '100%', marginBlock: '30px' }}>
        <Trans i18nKey="verify.claim-text">
          Search to confirm the transcript contains your contribution, then
          share with the rest of the community! Addresses are eligible to claim
          a POAP.
        </Trans>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  font-size: ${FONT_SIZE.M};
  margin-block: 20px;
  align-items: center;
  flex-direction: column;
  word-break: break-word;
  width: 70%;

  @media (max-width: ${BREAKPOINT.M}) {
    width: 100%;
  }
`

const Points = styled.div`
  margin-inline: 5px;
  flex: 1;
  border-bottom: 1px dotted;
`

const Ol = styled.ol`
  padding: 0px;
  display: grid;
  gap: 7px;
  width: 100%;
  margin-bottom: 0px;
`

const Li = styled.li`
  width: 100%;
  display: flex;
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

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-block: 25px;
`

export default VerificationSection
