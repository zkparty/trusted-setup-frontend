import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { PrimaryButton } from './Button'
import { useTranslation } from 'react-i18next'
import { BREAKPOINT, FONT_SIZE, TRANSCRIPT_HASH } from '../constants'
import { Transcript } from '../types'
import { bytesToHex } from 'viem'
import wasm from '../wasm'
import { sha256 } from '@noble/hashes/sha256'

type Props = {
  ethAddress: string
  dataAsString: string | null | undefined
  data: Transcript | null | undefined
}

const VerificationSection = ({ ethAddress, dataAsString, data }: Props) => {
  const { t } = useTranslation()

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

  const [isTwitterButtonDisabled, setIsTwitterButtonDisabled] = useState(true)

  useEffect(() => {
    const verifyTranscript = async () => {
      if (!(data && dataAsString)) {
        return
      }
      setTimeout(async () => {
        const result = await wasm.verify(dataAsString)
        setVerifiedContributions(result)
        setVerifyContributionsError(!result)
        setIsTwitterButtonDisabled(false)
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
        console.log(transcriptHash)
        if (transcriptHash === TRANSCRIPT_HASH) {
          setVerifiedHash(true)
        } else {
          setVerifyHashError(true)
        }
      }, 12000)
    }
    verifyTranscript()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dataAsString])

  const onClickTweet = async () => {
    let tweet
    if (ethAddress === '') {
      tweet = t('verify.tweetAll')
    } else {
      tweet = t('verify.tweetWithAddress', {
        ethAddress: ethAddress
      })
    }
    const encoded = encodeURIComponent(tweet)
    const link = `https://twitter.com/intent/tweet?text=${encoded}`
    window.open(link, '_blank')
  }

  return (
    <Container>
      <div>
        This process automatically runs the Ceremony output through a number of
        checks - learn more. It may take a minute to load and process.
      </div>
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
      <ButtonContainer>
        <VerificationButton
          disabled={isTwitterButtonDisabled}
          onClick={onClickTweet}
        >
          Tweet
        </VerificationButton>
      </ButtonContainer>
      <div style={{ width: '100%', marginBottom: '10px' }}>
        If you used an Ethereum address to contribute, enter it below to claim
        your POAP:
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
  margin-block: 10px;
`

const VerificationButton = styled(PrimaryButton)`
  width: auto;
  height: auto;
  padding-block: 8px;
`

export default VerificationSection
