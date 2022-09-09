import styled from 'styled-components'
import Header from '../components/Header'
import { Description, PageTitle } from '../components/Text'

const ContributingPage = () => {
  return (
    <Container>
      <Header />
      <PageTitle>Magic math & you.</PageTitle>
      <Description>Contribution active...</Description>
      <Description>Do not close browser</Description>
      <Description>Downloading...</Description>
    </Container>
  )
}

const Container = styled.section`
  padding: 0 24px 24px;
`

export default ContributingPage
