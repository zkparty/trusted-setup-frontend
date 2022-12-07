import { useState } from 'react'
import styled from 'styled-components'
import { FONT_SIZE } from '../constants'
import { Record } from '../types'
import BlockiesIdenticon from './Blockies'
import TranscriptModal from './modals/TranscriptModal'
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

  if (isLoading) {
    return (
      <div style={{ marginTop: '30px' }}>
        <Trans i18nKey="record.loading">Loading transcript...</Trans>
        <LoadingSpinner></LoadingSpinner>
      </div>
    )
  }

  return (
    <Container>
      <TableHead>
        <Trans i18nKey="record.headers">
          <Col>#</Col>
          <Col flex={4} width="0">Participant ID</Col>
          <Col center>Signatures</Col>
        </Trans>
      </TableHead>
      {data.map((record) => (
        <Row key={record.position} onClick={() => setSelectedTranscriptItem(record)}>
          <Col>{record.position}</Col>
          <Col flex={4} width="0">
            <Address>{record.participantId}</Address>
          </Col>
          <Col center>
            {record.transcripts.map((transcript, i) => (
              <BlockiesIdenticon
                key={transcript.potPubkeys + i}
                onClick={() => {}}
                opts={{
                  seed: transcript.potPubkeys,
                  size: 8,
                  scale: 5
                }}
              />
            ))}
          </Col>
        </Row>
      ))}
      <TranscriptModal
        record={selectedTranscriptItem}
        onDeselect={() => setSelectedTranscriptItem(null)}
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
  height: 70px;
  padding-inline: 15px;
  border-bottom: solid 1px ${({ theme }) => theme.text};
  gap: 1rem;
  cursor: pointer;

  :hover:not([disabled]) {
    box-shadow: 1px 2px 6px 6px #b4b2b2;

    border-bottom: none;
    border-right: none;
    border-left: none;
  }
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

export default RecordTable
