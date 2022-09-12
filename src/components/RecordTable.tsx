import styled from 'styled-components'
import { FONT_SIZE } from '../constants'
import type { Record } from '../hooks/useRecord'
import BlockiesIdenticon from './Blockies'

type Props = {
  data: Record[]
  isLoading: boolean
}

const RecordTable = ({ data, isLoading }: Props) => {
  const showTranscriptModal = (record: Record) => {
    console.log(record)
  }

  if (isLoading) {
    return <div>Loading records...</div>
  }

  return (
    <Container>
      <TableHead>
        <Col>Seq. #</Col>
        <Col flex={3}>Identifier spec</Col>
        <Col center>Signature</Col>
        <Col width="80px" center>
          Transcript
        </Col>
      </TableHead>
      {data.map((record) => (
        <Raw key={record.id}>
          <Col>{record.sequenceNumber}</Col>
          <Col flex={3}>{record.id}</Col>
          <Col center>
            <BlockiesIdenticon
              opts={{
                seed: record.publicKey,
                size: 8,
                scale: 5
              }}
            />
          </Col>
          <Col width="80px" center>
            <ViewButton onClick={() => showTranscriptModal(record)}>
              View
            </ViewButton>
          </Col>
        </Raw>
      ))}
    </Container>
  )
}

const Container = styled.div`
  margin-top: 40px;
  min-width: 800px;
  width: 80%;
`

const TableHead = styled.div`
  display: flex;
  height: 60px;
`

const Raw = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  border-bottom: solid 1px ${({ theme }) => theme.onPrimary};
`

type ColProps = {
  flex?: number
  width?: string
  center?: boolean
}

const Col = styled.div<ColProps>`
  ${({ width }) => width && `width: ${width};`}
  ${({ flex, width }) => !width && `flex: ${flex || '1'}`};
  font-size: ${FONT_SIZE.M};
  display: flex;
  ${({ center }) => center && 'justify-content: center'}
`

const ViewButton = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.onPrimary};
  border: none;
  background-color: transparent;
  font-weight: 600;

  transition: all 0.1s ease;
  :hover {
    border-bottom: solid 1px ${({ theme }) => theme.onPrimary};
  }
`

export default RecordTable
