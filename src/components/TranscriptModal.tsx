import Modal from 'react-modal'
import { Record } from '../types'
import { TextSection } from './Layout'
import styled from 'styled-components'
import { FONT_SIZE } from '../constants'
import { Bold, Description } from './Text'
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
          height: '800px',
          width: 'clamp(90%, 75%, 70%)',
          inset: '15% 0 0 0',
          marginInline: 'auto',
        }
      }}
    >
      <Title>Contribution details</Title>
      <TextSection>
        <Bold>Participant ID:</Bold>
        <Desc>{record?.participantId}</Desc>
      </TextSection>
      <TextSection>
        <Bold>Pot Pubkeys:</Bold>
        <ol>
          <li><Desc>{record?.transcripts[0].potPubkeys}</Desc></li>
          <li><Desc>{record?.transcripts[1].potPubkeys}</Desc></li>
          <li><Desc>{record?.transcripts[2].potPubkeys}</Desc></li>
          <li><Desc>{record?.transcripts[3].potPubkeys}</Desc></li>
        </ol>
      </TextSection>
      <TextSection>
        <Bold>BLS Signatures:</Bold>
        <ol>
          <li><Desc>{record?.transcripts[0].blsSignature}</Desc></li>
          <li><Desc>{record?.transcripts[1].blsSignature}</Desc></li>
          <li><Desc>{record?.transcripts[2].blsSignature}</Desc></li>
          <li><Desc>{record?.transcripts[3].blsSignature}</Desc></li>
        </ol>
      </TextSection>
      <TextSection>
        <Bold>ECDSA Signature (optional):</Bold>
        <Desc>{record?.participantEcdsaSignature}</Desc>
      </TextSection>
    </Modal>
  )
}

const Title = styled.h2`
  ${textSerif}
`

const Desc = styled(Description)`
  word-break: break-word;
  width: 100vh;
  font-size: ${FONT_SIZE.M};
`

export default TranscriptModal
