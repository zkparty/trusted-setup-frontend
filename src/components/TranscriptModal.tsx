import Modal from 'react-modal'
import styled from 'styled-components'
import { Record } from '../hooks/useRecord'
import { textSerif } from '../style/utils'

type Props = {
  record: Record | null
  onDeselect: () => void
}

const TranscriptModal = ({ record, onDeselect }: Props) => {
  return (
    <Modal
      isOpen={!!record}
      shouldCloseOnOverlayClick
      onRequestClose={onDeselect}
      style={{
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(6px)'
        },
        content: {
          border: 'none',
          height: '320px',
          width: '800px',
          margin: 'auto'
        }
      }}
    >
      <Title>Transcript</Title>
      <Content>{JSON.stringify(record?.transcript)}</Content>
    </Modal>
  )
}

const Title = styled.h2`
  ${textSerif}
`

const Content = styled.p`
  color: ${({ theme }) => theme.textBlack};
`

export default TranscriptModal
