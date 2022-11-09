// Library imports
import { useState, useMemo } from 'react'
import styled from 'styled-components'
// Component imports
import Footer from '../components/Footer'
import Header from '../components/Header'
import Pagination from '../components/Pagination'
import RecordTable from '../components/RecordTable'
import { PageTitle } from '../components/Text'
// Constant imports
import { FONT_SIZE } from '../constants'
// Asset imports
import SearchIcon from '../assets/search.svg'
// Hook imports
import useRecord, { Record } from '../hooks/useRecord'

// Constants
const PAGE_SIZE = 20

// RecordPage component
const RecordPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  // add search param
  const recordQuery = useRecord()

  // Helper function
  const recordString = ({ id, sequenceNumber, publicKey, transcript }: Record): string => 
    (id + sequenceNumber.toString() + publicKey + transcript).toLowerCase()

  // Memoized data
  const data = useMemo<Record[]>(() => {
    if (!recordQuery.data) return []
    // Sort data by sequence number, descending
    const sortedData = recordQuery.data.sort((a, b) => b.sequenceNumber - a.sequenceNumber)
    // Filter by search query
    const filteredData = sortedData.filter((record) => recordString(record).includes(searchQuery.toLowerCase()))
    return filteredData
  }, [recordQuery, searchQuery])

  const pageData = useMemo<Record[]>(() => {
    // Slice by page
    const sliceStart = (page - 1) * PAGE_SIZE
    const sliceEnd = sliceStart + PAGE_SIZE > data.length ? data.length : sliceStart + PAGE_SIZE
    const slicedData = data.slice(sliceStart, sliceEnd)
    return slicedData
  }, [data, page])

  const totalPages = useMemo<number>(() => data ? Math.ceil(data.length / PAGE_SIZE) : 0, [data])

  // Handler functions
  const handleInput = (e: any) => {
    setSearchQuery(e.target.value)
  }
  
  return (
    <>
      <Header />
      <Container>
        <PageTitle>
          Record
        </PageTitle>
        <SearchInput placeholder="Search address, github handle..." onChange={handleInput} />
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

export default RecordPage
