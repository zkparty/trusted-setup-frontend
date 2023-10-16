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
  const { t } = useTranslation()

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
        This verification process runs a few checks on the final transcript. It
        may take a few minutes to download locally and process. Learn more about
        the checks{' '}
        <ExternalLink href="https://hackmd.io/w7kvxwIhTlShzutKRKmRfA">
          here
        </ExternalLink>
        .
      </div>
      <LinkContainer>
        {clickedOnVerify ? (
          <LoadingSpinner style={{ height: 'auto' }} />
        ) : (
          <PrimaryButton
            style={{ width: 'auto', height: 'auto' }}
            disabled={clickedOnVerify || !data || !dataAsString}
            onClick={handleClickVerify}
          >
            <Trans i18nKey="record.verifyButton">Verify</Trans>
          </PrimaryButton>
        )}
      </LinkContainer>
      <Ol>
        <Li>
          <span>Sanity checking</span>
          <Points />
          {verifiedSanity ? (
            <GreenSpan>passed</GreenSpan>
          ) : verifySanityError ? (
            <RedSpan>error</RedSpan>
          ) : (
            <GraySpan>waiting</GraySpan>
          )}
        </Li>
        <Li>
          <span>Verifying no secret is zero</span>
          <Points />
          {verifiedNoZeros ? (
            <GreenSpan>passed</GreenSpan>
          ) : verifyNoZerosError ? (
            <RedSpan>error</RedSpan>
          ) : (
            <GraySpan>waiting</GraySpan>
          )}
        </Li>
        <Li>
          <span>Verifying Powers of Tau</span>
          <Points />
          {verifiedPoT ? (
            <GreenSpan>passed</GreenSpan>
          ) : verifyPoTError ? (
            <RedSpan>error</RedSpan>
          ) : (
            <GraySpan>waiting</GraySpan>
          )}
        </Li>
        <Li>
          <span>Verifying transcript hash</span>
          <Points />
          {verifiedHash ? (
            <GreenSpan>passed</GreenSpan>
          ) : verifyHashError ? (
            <RedSpan>mismatch</RedSpan>
          ) : (
            <GraySpan>waiting</GraySpan>
          )}
        </Li>
        <Li>
          <span>Verifying all contributions</span>
          <Points />
          {verifiedContributions ? (
            <GreenSpan>passed</GreenSpan>
          ) : verifyContributionsError ? (
            <RedSpan>error</RedSpan>
          ) : (
            <GraySpan>waiting</GraySpan>
          )}
        </Li>
      </Ol>
      <div style={{ width: '100%', marginBlock: '30px' }}>
        Search to confirm the transcript contains your contribution, then share
        with the rest of the community! Addresses are eligible to claim a POAP.
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
  margin-block: 20px;
`

const LinkContainer = styled(ButtonContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-block: 8px;
`

export default VerificationSection
