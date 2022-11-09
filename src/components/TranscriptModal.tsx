import Modal from 'react-modal'
import styled from 'styled-components'
import type { Record } from '../hooks/useRecord'
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
          backdropFilter: 'blur(6px)',
          padding: '2rem',
        },
        content: {
          border: 'none',
          height: '320px',
          width: 'clamp(200px, 75%, 800px)',
          inset: '25% 0 0 0',
          marginInline: 'auto',
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
  color: ${({ theme }) => theme.text};
`

export default TranscriptModal
