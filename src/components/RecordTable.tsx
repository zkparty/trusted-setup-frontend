import { useState } from 'react'
import styled from 'styled-components'

import { FONT_SIZE } from '../constants'
import type { Record } from '../hooks/useRecord'
import BlockiesIdenticon from './Blockies'
import SignatureModal from './SignatureModal'
import TranscriptModal from './TranscriptModal'

type Props = {
  data: Record[]
  isLoading: boolean
}

const RecordTable = ({ data, isLoading }: Props) => {
  const [selectedTranscriptItem, setSelectedTranscriptItem] =
    useState<null | Record>(null)
  const [selectedSignatureItem, setSelectedSignatureItem] =
    useState<null | Record>(null)

  if (isLoading) {
    return <div>Loading records...</div>
  }

  return (
    <Container>
      <TableHead>
        <Col>Seq. #</Col>
        <Col flex={4} width="0">Identifier spec</Col>
        <Col center>Signature</Col>
        <Col width="80px" center>Transcript</Col>
      </TableHead>
      {data.map((record) => (
        <Row key={record.sequenceNumber}>
          <Col>{record.sequenceNumber}</Col>
          <Col flex={4} width="0">
            <Address>{record.id}</Address>
          </Col>
          <Col center>
            <BlockiesIdenticon
              onClick={() => setSelectedSignatureItem(record)}
              opts={{
                seed: record.publicKey,
                size: 8,
                scale: 5
              }}
            />
          </Col>
          <Col width="80px" center>
            <ViewButton onClick={() => setSelectedTranscriptItem(record)}>
              View
            </ViewButton>
          </Col>
        </Row>
      ))}
      <TranscriptModal
        record={selectedTranscriptItem}
        onDeselect={() => setSelectedTranscriptItem(null)}
      />
      <SignatureModal
        record={selectedSignatureItem}
        onDeselect={() => setSelectedSignatureItem(null)}
      />
    </Container>
  )
}

const Container = styled.div`
  margin-top: 40px;
  width: 90ch;
  max-width: 100%;
`

const TableHead = styled.div`
  display: flex;
  height: 60px;
  gap: 1rem;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  border-bottom: solid 1px ${({ theme }) => theme.text};
  gap: 1rem;
`

type ColProps = {
  flex?: number
  width?: string
  center?: boolean
}

const Col = styled.div<ColProps>`
  ${({ width }) => width && `width: ${width};`}
  ${({ flex }) => `flex: ${flex || '1'}`};
  font-size: ${FONT_SIZE.M};
  display: flex;
  ${({ center }) => center && 'justify-content: center'}
`

const Address = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;  
`

const ViewButton = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  border: none;
  background-color: transparent;
  font-weight: 600;

  transition: all 0.1s ease;
  :hover {
    border-bottom: solid 1px ${({ theme }) => theme.text};
  }
`

export default RecordTable
