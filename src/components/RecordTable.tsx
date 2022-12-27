import { useState } from 'react'
import { Record } from '../types'
import styled, { css }  from 'styled-components'
import { FONT_SIZE } from '../constants'
import BlockiesIdenticon from './Blockies'
import LoadingSpinner from './LoadingSpinner'
import { Trans, useTranslation } from 'react-i18next'
import TranscriptModal from './modals/TranscriptModal'

type Props = {
  data: Record[]
  isLoading: boolean
  showChevron?: boolean
  reOrderFormattedData: () => void
}

const RecordTable = ({
  data,
  isLoading,
  showChevron = true,
  reOrderFormattedData
}: Props) => {
  useTranslation()
  const [increaseOrder, setIncreaseOrder] = useState(true);
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

  const handleOnClickChevron = () => {
    reOrderFormattedData()
    setIncreaseOrder(!increaseOrder)
  }

  return (
    <Container>
      <TableHead>
          <Col># { showChevron ?
          <Chevron onClick={handleOnClickChevron} increaseOrder={increaseOrder}>{'>'}</Chevron>
          :
          ''
          }</Col>
        <Trans i18nKey="record.headers">
          <Col flex={4} width="0">Participant ID</Col>
          <Col atEnd>Signatures</Col>
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
        onChange={(i: number) => setSelectedTranscriptItem(data[i])}
      />
    </Container>
  )
}

const Container = styled.div`
  margin-top: 40px;
  width: 100ch;
  max-width: 100%;
`

const TableHead = styled.div`
  padding-inline: 5px;
  display: flex;
  height: 60px;
`

const Chevron = styled.span<{increaseOrder: boolean}>`
  cursor: pointer;
  user-select: none;
  margin-left: 12px;
  ${({ increaseOrder }) => increaseOrder ?
    css`
      transform: rotate(90deg);
      height: 18px;
      width: 12px;
    `
    :
    css`
      transform: rotate(270deg);
      height: 20px;
      width: 10px;
    `
  }
`

const Row = styled.div`
  display: flex;
  padding-inline: 5px;
  align-items: center;
  height: 70px;
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
  atEnd?: boolean
  center?: boolean
}

const Col = styled.div<ColProps>`
  ${({ width }) => width && `width: ${width};`}
  ${({ flex }) => `flex: ${flex || '1'}`};
  font-size: ${FONT_SIZE.M};
  display: flex;
  ${({ atEnd }) => atEnd && 'justify-content: end'}
  ${({ center }) => center && 'justify-content: center'}
`

const Address = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export default RecordTable
