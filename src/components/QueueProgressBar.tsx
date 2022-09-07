import styled from 'styled-components'
import { FONT_SIZE } from '../constants'

type Props = {
  total: number
  current: number
}

const QueueProgressBar = ({ total, current }: Props) => {
  return (
    <Container>
      <QueueTitle>You are in the queue.</QueueTitle>
      <QueueDesc>
        Kindly stay online while the magic math is being processed.
      </QueueDesc>
    </Container>
  )
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.surface};
  width: 400px;
  padding: 16px 24px;
  border-radius: 4px;
`

const QueueTitle = styled.p`
  margin: 0 0 12px;
  font-weight: 600;
  font-size: ${FONT_SIZE.L};
`

const QueueDesc = styled.p`
  margin: 0;
  font-size: ${FONT_SIZE.XS};
`

export default QueueProgressBar
