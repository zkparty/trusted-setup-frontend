// Library imports
import { Trans, useTranslation } from 'react-i18next'
import { useState, useMemo, useEffect } from 'react'
import { providers } from 'ethers'
import styled from 'styled-components'
// Component imports
import Footer from '../components/Footer'
import { PageTitle } from '../components/Text'
import Header from '../components/headers/Header'
import Pagination from '../components/Pagination'
import RecordTable from '../components/RecordTable'
import ExternalLink from '../components/ExternalLink'
// Constant imports
import {
  API_ROOT,
  BREAKPOINT,
  FONT_SIZE,
  INFURA_ID,
  PAGE_SIZE,
  TRANSCRIPT_HASH
} from '../constants'
import { Transcript, Record, SequencerStatus } from '../types'
// Hook imports
import useRecord, { useRecordAsString } from '../hooks/useRecord'
import useSequencerStatus from '../hooks/useSequencerStatus'
import { BgColoredContainer } from '../components/Background'
import SearchInput from '../components/SearchInput'
import { useNavigate } from 'react-router-dom'
import VerificationSection from '../components/VerificationSection'
import { Hex, recoverTypedDataAddress } from 'viem'
import { buildEIP712Message } from '../utils'
import { PrimaryButton } from '../components/Button'
import LoadingSpinner from '../components/LoadingSpinner'

type VerifyECDSA = {
  showSection: boolean
  verified: boolean
  error: string | null
}

// RecordPage component
const RecordPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [pageData, setPageData] = useState<Record[]>([])
  const [formattedData, setFormattedData] = useState<Record[]>([])

  const [clickedOnVerify, setClickedOnVerify] = useState(false)
  const [isPOAPActive, setIsPOAPActive] = useState(false)
  const [verifyECDSA, setVerifyECDSA] = useState<VerifyECDSA>({
    showSection: false,
    verified: false,
    error: null
  })
  // load data from API
  const { data } = useRecord()
  const { data: dataAsString } = useRecordAsString()
  const sequencerStatus = useSequencerStatus()

  // Helper function
  const isSearchQueryInRecords = async (
    record: Record,
    query: string
  ): Promise<boolean> => {
    const queryLowercase = query.toLowerCase()
    let string = ''
    string = string + '#' + record.position
    string = string + ' ' + record.participantId
    string = string + ' '
    string = string.toLowerCase()
    return string.includes(queryLowercase)
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    ;(async () => {
      await navigator.serviceWorker.ready
      // eslint-disable-next-line no-restricted-globals
      if (!self.crossOriginIsolated) {
        console.log('refreshing...')
        navigate(0)
      } else {
        console.log(
          `${window.crossOriginIsolated ? '' : 'not'} x-origin isolated`
        )
      }
    })()
  }, [navigate])

  useEffect(() => {
    let active = true
    const formatDataFromRecord = async () => {
      if (!data) {
        return
      }
      const { transcripts, participantIds, participantEcdsaSignatures } =
        data! as Transcript
      const records: Record[] = []

      let queryLowercase = searchQuery.toLowerCase()
      if (queryLowercase.includes('.eth')) {
        setIsLoading(true)
        const provider = new providers.InfuraProvider('homestead', INFURA_ID)
        const ensAddress = await provider.resolveName(queryLowercase)
        queryLowercase = ensAddress ? ensAddress?.toLowerCase() : 'NOTFOUND'
        setIsLoading(false)
      }

      for (let i = 0, ni = participantIds.length; i < ni; i++) {
        const participantId = participantIds[i].replace('eth|', '')
        const participantEcdsaSignature = participantEcdsaSignatures[i]
        const record: Record = {
          position: i,
          participantId,
          participantEcdsaSignature,
          transcripts: [
            {
              potPubkeys: transcripts[0].witness.potPubkeys[i],
              blsSignature: transcripts[0].witness.blsSignatures[i]
            },
            {
              potPubkeys: transcripts[1].witness.potPubkeys[i],
              blsSignature: transcripts[1].witness.blsSignatures[i]
            },
            {
              potPubkeys: transcripts[2].witness.potPubkeys[i],
              blsSignature: transcripts[2].witness.blsSignatures[i]
            },
            {
              potPubkeys: transcripts[3].witness.potPubkeys[i],
              blsSignature: transcripts[3].witness.blsSignatures[i]
            }
          ]
        }
        if (await isSearchQueryInRecords(record, queryLowercase)) {
          records.push(record)
        }
      }
      if (!active) {
        return
      }
      setFormattedData(records)
      setTotalPages(records ? Math.ceil(records.length / PAGE_SIZE) : 0)
      setIsLoading(false)
    }
    formatDataFromRecord()
    return () => {
      active = false
    }
  }, [data, searchQuery])

  useEffect(() => {
    // Slice by page
    const sliceStart = (page - 1) * PAGE_SIZE
    const sliceEnd =
      sliceStart + PAGE_SIZE > formattedData.length
        ? formattedData.length
        : sliceStart + PAGE_SIZE
    setPageData(formattedData.slice(sliceStart, sliceEnd))
  }, [formattedData, page])

  // Memoized data
  const stats = useMemo<SequencerStatus>(() => {
    const status = sequencerStatus.data!
    return status
  }, [sequencerStatus])

  const handleClickVerify = async () => {
    setClickedOnVerify(true)
  }

  // Handler functions
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchQuery(value)
    setPage(1)

    // claim POAP
    setIsPOAPActive(false)
    setVerifyECDSA({
      showSection: false,
      verified: false,
      error: null
    })
    if (!data) {
      setVerifyECDSA((verifyECDSA) => ({
        ...verifyECDSA,
        ...{ error: 'Transcript is not loaded yet' }
      }))
      return
    }
    if (value.length === 42 && value.substring(0, 2) === '0x') {
      setVerifyECDSA((verifyECDSA) => ({
        ...verifyECDSA,
        ...{ showSection: true }
      }))
      const ethAddressInLowerCase = value.trim().toLowerCase()
      // get participant index
      const index = data.participantIds.indexOf(`eth|${ethAddressInLowerCase}`)
      if (index < 0) {
        setVerifyECDSA((verifyECDSA) => ({
          ...verifyECDSA,
          ...{ error: 'No participant found', showSection: false }
        }))
        return
      }
      verifySignature(index, ethAddressInLowerCase)
      setIsPOAPActive(true)
    } else {
      setVerifyECDSA((verifyECDSA) => ({
        ...verifyECDSA,
        ...{ error: 'Check format', showSection: false }
      }))
    }
  }

  const verifySignature = async (
    index: number,
    ethAddressInLowerCase: string
  ) => {
    // get participant ecdsa signature
    const ecdsa = data?.participantEcdsaSignatures[index]
    if (!ecdsa) {
      setVerifyECDSA((verifyECDSA) => ({
        ...verifyECDSA,
        ...{ error: 'No ECDSA signature found', verified: true }
      }))
      return
    }
    // get participant potPubkeys
    const potPubkeys: string[] = []
    data.transcripts.forEach((transcript) => {
      potPubkeys.push(transcript.witness.potPubkeys[index])
    })
    if (potPubkeys.length !== 4) {
      setVerifyECDSA((verifyECDSA) => ({
        ...verifyECDSA,
        ...{ error: 'Not enough potPubkeys', verified: true }
      }))
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
      setVerifyECDSA((verifyECDSA) => ({
        ...verifyECDSA,
        ...{ error: 'Mismatch', verified: true }
      }))
      return
    }
    setVerifyECDSA((verifyECDSA) => ({
      ...verifyECDSA,
      ...{ verified: true }
    }))
  }

  const onClickClaimPOAP = async () => {
    // TODO: add eth address to poap button
    window.open(`https://inno-maps.com/claim?address=${searchQuery}`, '_blank')
    setIsPOAPActive(false)
  }

  const reOrderFormattedData = () => {
    setIsLoading(true)
    const records: Record[] = []
    for (let i = formattedData.length - 1, ni = 0; i >= ni; i--) {
      const record = formattedData[i]
      records.push(record)
    }
    setFormattedData(records)
    setIsLoading(false)
  }

  return (
    <BgColoredContainer>
      <Header />
      <Container>
        <PageTitle>
          <Trans i18nKey="record.transcriptInformation">
            Verify the Ceremony
          </Trans>
        </PageTitle>
        <StatsContainer>
          <Stat>
            <StatsTitle>
              <Trans i18nKey="record.stats.contributions">Contributions:</Trans>
            </StatsTitle>
            <StatsText> {stats?.num_contributions}</StatsText>
          </Stat>
          <Stat>
            <StatsTitle>
              <Trans i18nKey="record.stats.address">Sequencer address:</Trans>
            </StatsTitle>
            <StatsText style={{ marginRight: '0px' }}>
              {' '}
              {stats?.sequencer_address}
            </StatsText>
          </Stat>
          <Stat>
            <StatsTitle>
              <Trans i18nKey="record.stats.transcriptHash">
                Transcript hash:
              </Trans>
            </StatsTitle>
          </Stat>
          <StatsText style={{ marginRight: '0px' }}>
            {' '}
            {TRANSCRIPT_HASH}
          </StatsText>
          <LinkContainer>
            <Link href={`${API_ROOT}/info/current_state`}>
              <Trans i18nKey="record.download">Download full transcript</Trans>
            </Link>
            {clickedOnVerify ? (
              <LoadingSpinner style={{ height: 'auto' }}></LoadingSpinner>
            ) : (
              <PrimaryButton
                style={{ width: 'auto', height: 'auto' }}
                disabled={clickedOnVerify}
                onClick={handleClickVerify}
              >
                <Trans i18nKey="record.verifyButton">Verify</Trans>
              </PrimaryButton>
            )}
          </LinkContainer>
        </StatsContainer>
        <VerificationSection
          clickedOnVerify={clickedOnVerify}
          setClickedOnVerify={setClickedOnVerify}
          ethAddress={searchQuery}
          dataAsString={dataAsString}
          data={data}
        />
        <SearchInput
          placeholder={t('record.searchBar')}
          onChange={handleInput}
        />
        <RedSpan>{verifyECDSA.error}</RedSpan>
        <ButtonContainer>
          <VerificationButton
            disabled={!isPOAPActive}
            onClick={onClickClaimPOAP}
          >
            Claim POAP
          </VerificationButton>
        </ButtonContainer>
        <RecordTable
          data={pageData}
          isLoading={isLoading}
          reOrderFormattedData={reOrderFormattedData}
        />
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </Container>
      <Footer />
    </BgColoredContainer>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.text};
  width: 100ch;
  max-width: 100%;
  margin: 8rem auto;
  padding-inline: 5vw;
`

const StatsContainer = styled.div`
  display: flex;
  font-size: ${FONT_SIZE.S};
  justify-content: space-between;

  flex-direction: column;
  align-items: start;
  word-break: break-word;
  width: 70%;

  @media (max-width: ${BREAKPOINT.M}) {
    width: 100%;
  }
`

const Stat = styled.div`
  display: flex;
  margin-bottom: 7px;

  @media (max-width: ${BREAKPOINT.M}) {
    flex-direction: column;
    align-items: start;
  }
`

const StatsTitle = styled.p`
  margin: 0px;
  margin-right: 4px;
  font-weight: 800;

  @media (max-width: ${BREAKPOINT.M}) {
    margin-bottom: 2px;
  }
`

const StatsText = styled.p`
  margin: 0px;
`

const Link = styled(ExternalLink)`
  width: 100%;
  text-align: start;
  font-size: ${FONT_SIZE.M};
`

const ButtonContainer = styled.div`
  margin-block: 15px;
`

const LinkContainer = styled(ButtonContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const VerificationButton = styled(PrimaryButton)`
  width: auto;
  height: auto;
  padding-block: 8px;
`

const RedSpan = styled.span`
  color: ${({ theme }) => theme.error};
`

export default RecordPage
