import { useState } from 'react'
import styled from 'styled-components'

import { FONT_SIZE } from '../constants'
import { Record } from '../types'
import BlockiesIdenticon from './Blockies'
import SignatureModal from './SignatureModal'
import TranscriptModal from './TranscriptModal'
import { Trans, useTranslation } from 'react-i18next'
import LoadingSpinner from './LoadingSpinner'

type Props = {
  data: Record[]
  isLoading: boolean
}

const RecordTable = ({ data, isLoading }: Props) => {
  useTranslation()
  const [selectedTranscriptItem, setSelectedTranscriptItem] =
    useState<null | Record>(null)
  const [selectedSignatureItem, setSelectedSignatureItem] =
    useState<null | Record>(null)

  if (isLoading) {
    return (
      <div style={{ marginTop: '30px' }}>
        <Trans i18nKey="record.loading">Loading records...</Trans>
        <LoadingSpinner></LoadingSpinner>
      </div>
    )
  }

  return (
    <Container>
      <TableHead>
        <Trans i18nKey="record.headers">
          <Col>Seq. #</Col>
          <Col flex={4} width="0">Identifier specification</Col>
          <Col center>Signatures</Col>
          <Col width="80px" center>Details</Col>
        </Trans>
      </TableHead>
      {data.map((record) => (
        <Row key={record.position}>
          <Col>{record.position}</Col>
          <Col flex={4} width="0">
            <Address>{record.participantId}</Address>
          </Col>
          <Col center>
            <BlockieColumn>
              <BlockiesIdenticon
                onClick={() => setSelectedSignatureItem(record)}
                opts={{
                  seed: record.transcripts[0].potPubkeys,
                  size: 8,
                  scale: 5
                }}
              />
              <BlockiesIdenticon
                onClick={() => setSelectedSignatureItem(record)}
                opts={{
                  seed: record.transcripts[1].potPubkeys,
                  size: 8,
                  scale: 5
                }}
              />
            </BlockieColumn>
            <BlockieColumn>
              <BlockiesIdenticon
                onClick={() => setSelectedSignatureItem(record)}
                opts={{
                  seed: record.transcripts[2].potPubkeys,
                  size: 8,
                  scale: 5
                }}
              />
              <BlockiesIdenticon
                onClick={() => setSelectedSignatureItem(record)}
                opts={{
                  seed: record.transcripts[3].potPubkeys,
                  size: 8,
                  scale: 5
                }}
              />
            </BlockieColumn>
          </Col>
          <Col width="80px" center>
            <ViewButton onClick={() => setSelectedTranscriptItem(record)}>
              <Trans i18nKey="record.button">View</Trans>
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
  height: 80px;
  border-bottom: solid 1px ${({ theme }) => theme.text};
  gap: 1rem;
`

const BlockieColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 5px;
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
