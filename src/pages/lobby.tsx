import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import { Description, PageTitle } from '../components/Text'
import { LOBBY_CHECKIN_FREQUENCY } from '../constants'
import useTryContribute from '../hooks/useTryContribute'
import ROUTES from '../routes'
import { isSuccessRes, sleep } from '../utils'

const LobbyPage = () => {
  const tryContribute = useTryContribute()
  const navigate = useNavigate()

  useEffect(() => {
    async function poll(): Promise<void> {
      // periodically post /slot/join
      const res = await tryContribute.mutateAsync()
      if (isSuccessRes(res)) {
        navigate(ROUTES.CONTRIBUTING)
      } else {
        //  try again after LOBBY_CHECKIN_FREUQUENCY
        await sleep(LOBBY_CHECKIN_FREQUENCY)
        return await poll()
      }
    }

    poll()
  }, [])

  return (
    <Container>
      <Header />
      <PageTitle>KZG, up The rising</PageTitle>
      <Description>
      The spell is in progress, in the sequencer’s capable hands. Patience, the magic will be lost, unless you remain in the hallway with the others.
      </Description>
    </Container>
  )
}

const Container = styled.section`
  padding: 0 24px 24px;
`

export default LobbyPage
