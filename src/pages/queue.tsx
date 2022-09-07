import styled from 'styled-components'
import Header from '../components/Header'
import { Description, PageTitle } from '../components/Text'
import QueueProgressBar from '../components/QueueProgressBar'

// authorized page
const QueuePage = () => {
  // TODO: get data from API
  const currentPosition = 3
  const totalInQueue = 5

  // useEffect and check the queue position on every data loading
  // const onComplete = () => {
  //   // do things
  //   console.log('time has come! lets start calculating')
  // }

  // TODO: checkin every checkin period

  return (
    <Container>
      <Header />
      <PageTitle>The rising. Human#{currentPosition}</PageTitle>
      <Description>
        While the magic is on the hand of your predecessor, we expect you to
        stay online here while the math is doing it’s magic.
      </Description>
      <QueueProgressBar total={totalInQueue} current={currentPosition} />
    </Container>
  )
}

const Container = styled.section`
  padding: 0 24px;
`

export default QueuePage
