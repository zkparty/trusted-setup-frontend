import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { PrimaryButtonLarge, BorderedButtonLarge } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  SingleButtonSection as ButtonSection
} from '../components/Layout'
import Logo from '../components/Logo'
import useQueueNumber from '../hooks/useQueueNumber'
import { FONT_SIZE, SPACE } from '../constants'
import ROUTES from '../routes'

const OnboardingPage = () => {
  const queueNumQuery = useQueueNumber()

  // TODO: implement
  const navigate = useNavigate()
  const onClick = () => {
    navigate(ROUTES.ENTROPY_INPUT)
  }

  return (
    <Container>
      <Wrap>
        <Logo inverse />
        <Title>Excellent.</Title>
        <Desc>
          Now you have step forward, would you like to be added into the queue?
        </Desc>
        <div>Total citizen in queue 2 approve. wait time: 5 mins</div>
        <QueueInfo>
          <QueueInfoTitle>Total citizen in queue</QueueInfoTitle>
          <QueueNumber>
            {!queueNumQuery.isLoading && queueNumQuery.data
              ? queueNumQuery.data
              : 'Loading...'}
          </QueueNumber>
          <QueueFootnote>Approx. wait time: 5 mins </QueueFootnote>
        </QueueInfo>
        <ButtonSection>
          <PrimaryButtonLarge inverse onClick={onClick}>
            Ready to go
          </PrimaryButtonLarge>
          <BorderedButtonLarge inverse onClick={() => navigate(ROUTES.ROOT)}>
            Come back later
          </BorderedButtonLarge>
        </ButtonSection>
      </Wrap>
    </Container>
  )
}

const Title = styled(PageTitle)`
  color: ${({ theme }) => theme.onPrimary};
  margin-top: 0;
`

const Desc = styled(Description)`
  color: ${({ theme }) => theme.onPrimary};
`

const QueueInfo = styled.div`
  margin: 20px 0;
  padding: 12px 24px;
  border: solid 1px ${({ theme }) => theme.onPrimary};
  border-radius: 4px;
  width: 320px;
`

const QueueInfoTitle = styled.h2`
  color: ${({ theme }) => theme.onPrimary};
  font-size: ${FONT_SIZE.S};
  font-weight: 600;
  display: inline-block;
  margin: 0;
`

const QueueNumber = styled.p`
  color: ${({ theme }) => theme.onPrimary};
  font-size: ${FONT_SIZE.XXL};
  font-weight: 700;
  margin: ${SPACE.M} 0;
`

const QueueFootnote = styled.p`
  color: ${({ theme }) => theme.onPrimary};
  margin: 0;
`

export default OnboardingPage
