import styled from 'styled-components'
import Header from '../components/Header'
import { Description, PageTitle } from '../components/Text'

const LobbyPage = () => {
  return (
    <Container>
      <Header />
      <PageTitle>KZG, up The rising</PageTitle>
      <Description>
        You are now in the hallway, the only requirement is to stay online so
        the sqeuencer can process your spell.
      </Description>
    </Container>
  )
}

const Container = styled.section`
  padding: 0 24px 24px;
`

export default LobbyPage
