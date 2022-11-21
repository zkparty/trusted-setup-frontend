// Library imports
import { Trans, useTranslation } from 'react-i18next'
import { useState, useMemo } from 'react'
import styled from 'styled-components'
// Component imports
import Footer from '../components/Footer'
import Header from '../components/Header'
import Pagination from '../components/Pagination'
import RecordTable from '../components/RecordTable'
import { PageTitle } from '../components/Text'
// Constant imports
import { BREAKPOINT, FONT_SIZE, PAGE_SIZE } from '../constants'
import { Transcript, Record, SequencerStatus } from '../types'
// Asset imports
import SearchIcon from '../assets/search.svg'
// Hook imports
import useRecord from '../hooks/useRecord'
import useSequencerStatus from '../hooks/useSequencerStatus'


// RecordPage component
const RecordPage = () => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  // load data from API
  const recordQuery = useRecord()
  const sequencerStatus = useSequencerStatus()

  // Helper function
  const isSearchQueryInRecords = (record: Record, query: string): boolean => {
    let string = '';
    string = string + '#' + record.position;
    string = string + ' ' + record.participantId;
    string = string + ' ' + record.participantEcdsaSignature;
    string = string + ' '
    string = string.toLowerCase()
    return string.includes( query.toLowerCase() )
  }

  // Memoized data
  const data = useMemo<Record[]>(() => {
    if (!recordQuery.data) return []
    const { transcripts, participantIds, participantEcdsaSignatures } = recordQuery.data as Transcript;

    const records: Record[] = [];
    for (let i = 0, ni=participantIds.length; i < ni; i++) {
      const participantId = participantIds[i].replace('eth|','')
      const participantEcdsaSignature = participantEcdsaSignatures[i]
      const record: Record = {
        position: i,
        participantId,
        participantEcdsaSignature,
        transcripts: [
          {
            potPubkeys: transcripts[0].witness.potPubkeys[i],
            blsSignature: transcripts[0].witness.blsSignatures[i],
          },
          {
            potPubkeys: transcripts[1].witness.potPubkeys[i],
            blsSignature: transcripts[1].witness.blsSignatures[i],
          },
          {
            potPubkeys: transcripts[2].witness.potPubkeys[i],
            blsSignature: transcripts[2].witness.blsSignatures[i],
          },
          {
            potPubkeys: transcripts[3].witness.potPubkeys[i],
            blsSignature: transcripts[3].witness.blsSignatures[i],
          }
        ],
      }
      if ( isSearchQueryInRecords(record, searchQuery) ){
        records.push(record)
      }
    }
    return records
  }, [recordQuery, searchQuery])

  const pageData = useMemo<Record[]>(() => {
    // Slice by page
    const sliceStart = (page - 1) * PAGE_SIZE
    const sliceEnd = sliceStart + PAGE_SIZE > data.length ? data.length : sliceStart + PAGE_SIZE
    const slicedData = data.slice(sliceStart, sliceEnd)
    return slicedData
  }, [data, page])

  const totalPages = useMemo<number>(() => data ? Math.ceil(data.length / PAGE_SIZE) : 0, [data])

  const stats = useMemo<SequencerStatus>(() => {
    const status = sequencerStatus.data!
    return status
  }, [sequencerStatus])

  // Handler functions
  const handleInput = (e: any) => {
    setSearchQuery(e.target.value)
  }

  return (
    <>
      <Header />
      <Container>
        <PageTitle>
          <Trans i18nKey="record.title">Record</Trans>
        </PageTitle>
        <StatsContainer>
          <StatsTitle>
            <Trans i18nKey="record.stats.lobby">Lobby size:</Trans>
          </StatsTitle>
          <StatsText> {stats?.lobby_size}</StatsText>
          <StatsTitle>
            <Trans i18nKey="record.stats.contributions">Contributions:</Trans>
          </StatsTitle>
          <StatsText> {stats?.num_contributions}</StatsText>
          <StatsTitle>
            <Trans i18nKey="record.stats.address">Sequencer address:</Trans>
          </StatsTitle>
          <StatsText> {stats?.sequencer_address}</StatsText>
        </StatsContainer>
        <SearchInput placeholder={t('record.searchBar')} onChange={handleInput} />
        <RecordTable
          data={pageData}
          isLoading={recordQuery.isLoading}
        />
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </Container>
      <Footer />
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.text};
  width: 90ch;
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
  width: 320px;
  background: url(${SearchIcon}) no-repeat scroll right 12px bottom 50%;
`

const StatsContainer = styled.div`
  width: 100%;
  display: flex;
  font-size: ${FONT_SIZE.S};
  margin-bottom: 20px;
  justify-content: space-between;

  @media (max-width: ${BREAKPOINT.M}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    word-break: break-word;
  }
`
const StatsTitle = styled.p`
  margin: 0px;
  font-weight: 800;
`

const StatsText = styled.p`
  margin: 0px;
  margin-bottom: 7px;
`

export default RecordPage
