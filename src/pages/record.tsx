import styled from 'styled-components'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { SingleContainer as Container } from '../components/Layout'
import RecordTable from '../components/RecordTable'
import { FONT_SIZE } from '../constants'
import useRecord from '../hooks/useRecord'
import SearchIcon from '../assets/search.svg'
import { PageTitle } from '../components/Text'

const RecordPage = () => {
  // add search param
  const recordQuery = useRecord()

  return (
    <>
      <Header />
      <Container>
        <PageTitle>
          Record
        </PageTitle>
        <SearchInput placeholder="Search address, github handle..." />
        <RecordTable
          data={recordQuery.data || []}
          isLoading={recordQuery.isLoading}
        />
      </Container>
      <Footer />
    </>
  )
}

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
