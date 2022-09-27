import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import { Description, PageTitle } from '../components/Text'
import { LOBBY_CHECKIN_FREQUENCY } from '../constants'
import useTryContribute from '../hooks/useTryContribute'
import ROUTES from '../routes'
import { useContributionStore, Store } from '../store/contribute'
import { isSuccessRes, sleep } from '../utils'

const LobbyPage = () => {
  const tryContribute = useTryContribute()
  const updateContribution = useContributionStore((state: Store) => state.updateContribution)
  const navigate = useNavigate()

  useEffect(() => {
    async function poll(): Promise<void> {
      // periodically post /slot/join
      const res = await tryContribute.mutateAsync()
      if (isSuccessRes(res)) {
        updateContribution(JSON.stringify(res))
        navigate(ROUTES.CONTRIBUTING)
      } else {
        //  try again after LOBBY_CHECKIN_FREUQUENCY
        await sleep(LOBBY_CHECKIN_FREQUENCY)
        return await poll()
      }
    }

    poll()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
