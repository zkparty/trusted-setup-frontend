import styled from 'styled-components'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { SingleContainer } from '../components/Layout'
import RecordTable from '../components/RecordTable'
import { FONT_SIZE } from '../constants'
import { textSerif } from '../style/utils'
import useRecord from '../hooks/useRecord'
import SearchIcon from '../assets/search.svg'

const RecordPage = () => {
  // add search param
  const recordQuery = useRecord()

  return (
    <>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <Container>
        <Title>
          Summon
          <br />
          trace
        </Title>
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

const HeaderWrapper = styled.div`
  padding: 0 24px;
`

const Container = styled(SingleContainer)`
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h2`
  font-size: 96px;
  line-height: 1;
  text-transform: uppercase;
  margin: 0 0 24px;
  text-align: center;
  ${textSerif}
`

const SearchInput = styled.input`
  font-size: ${FONT_SIZE.M};
  font-weight: 400;
  padding: 8px 40px 8px 16px;
  border: solid 1px ${({ theme }) => theme.onPrimary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.onPrimary};
  width: 320px;
  background: url(${SearchIcon}) no-repeat scroll right 12px bottom 50%;
`

export default RecordPage
