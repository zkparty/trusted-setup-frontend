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
  PAGE_SIZE
} from '../constants'
import { Transcript, Record, SequencerStatus } from '../types'
// Asset imports
import SearchIcon from '../assets/search.svg'
// Hook imports
import useRecord from '../hooks/useRecord'
import useSequencerStatus from '../hooks/useSequencerStatus'
import { BgColoredContainer } from '../components/Background'
import LoadingSpinner from '../components/LoadingSpinner'
import { PrimaryButton } from '../components/Button'
import wasm from '../wasm'
import VerifiedModal from '../components/modals/VerifiedModal'

// RecordPage component
const RecordPage = () => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [verifiedStatus, setVerifiedStatus] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [pageData, setPageData] = useState<Record[]>([])
  const [formattedData, setFormattedData] = useState<Record[]>([])

  // load data from API
  const { data } = useRecord()
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
  }, [])

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

  // Handler functions
  const handleInput = (e: any) => {
    setSearchQuery(e.target.value)
    setPage(1)
  }

  const handleClickVerify = async () => {
    setIsVerifying(true)
    const result = await wasm.verify(JSON.stringify(data))
    setVerifiedStatus(result)
    setIsVerifying(false)
    setIsVerified(true)
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
          <Trans i18nKey="record.title">Contributions Transcript</Trans>
        </PageTitle>
        <StatsContainer>
          <Stat>
            <StatsTitle>
              <Trans i18nKey="record.stats.lobby">Lobby size:</Trans>
            </StatsTitle>
            <StatsText> {stats?.lobby_size}</StatsText>
          </Stat>
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
          <ButtonContainer>
            <Link href={`${API_ROOT}/info/current_state`}>
              <Trans i18nKey="record.download">Download full transcript</Trans>
            </Link>

            {isVerifying ? (
              <LoadingSpinner style={{ height: '48px' }}></LoadingSpinner>
            ) : (
              <PrimaryButton
                style={{ width: '180px', height: '40px' }}
                disabled={isVerifying}
                onClick={handleClickVerify}
              >
                <Trans i18nKey="record.verify">Verify Transcript</Trans>
              </PrimaryButton>
            )}
          </ButtonContainer>
        </StatsContainer>
        <SearchInput
          placeholder={t('record.searchBar')}
          onChange={handleInput}
        />
        <RecordTable
          data={pageData}
          isLoading={isLoading}
          reOrderFormattedData={reOrderFormattedData}
        />
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </Container>
      <Footer />
      <VerifiedModal
        open={isVerified}
        verificationResult={verifiedStatus}
        onDeselect={() => setIsVerified(false)}
      />
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

const SearchInput = styled.input`
  font-size: ${FONT_SIZE.M};
  font-weight: 400;
  padding: 8px 40px 8px 16px;
  border: solid 1px ${({ theme }) => theme.text};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  background: url(${SearchIcon}) no-repeat scroll right 12px bottom 50%;
  width: 70%;

  @media (max-width: ${BREAKPOINT.M}) {
    width: 100%;
  }
`

const StatsContainer = styled.div`
  display: flex;
  font-size: ${FONT_SIZE.S};
  margin-bottom: 20px;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export default RecordPage
