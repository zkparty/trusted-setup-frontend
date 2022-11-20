import Modal from 'react-modal'
import { Record } from '../types'
import styled from 'styled-components'
import { Bold, Description } from './Text'
import { textSerif } from '../style/utils'
import { useEffect } from 'react'


type Props = {
  record: Record | null
  onDeselect: () => void
}

const TranscriptModal = ({ record, onDeselect }: Props) => {
  const open = !!record
  useEffect(() => {
    if (open)  document.body.style.overflow = 'hidden';
    else  document.body.style.overflow = 'unset';
  }, [open])

  return (
    <Modal
      isOpen={!!record}
      shouldCloseOnOverlayClick
      onRequestClose={onDeselect}
      style={{
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(6px)',
          cursor: 'pointer',
          overflowY: 'scroll'
        },
        content: {
          cursor: 'auto',
          border: 'none',
          blockSize: 'fit-content',
          width: 'clamp(90%, 75%, 70%)',
          inset: '15% 0 0 0',
          marginInline: 'auto',
          paddingBlock: '20px',
          paddingInline: '5%',
          boxShadow: '5px 10px 8px 10px #b4b2b2',
        }
      }}
    >
      <Title>Contribution details</Title>

      <SubTitle>Participant ID:</SubTitle>
      <Desc>{record?.participantId}</Desc>

      <SubTitle>Pot Pubkeys:</SubTitle>
      <ol>
        <li><Desc>{record?.transcripts[0].potPubkeys}</Desc></li>
        <li><Desc>{record?.transcripts[1].potPubkeys}</Desc></li>
        <li><Desc>{record?.transcripts[2].potPubkeys}</Desc></li>
        <li><Desc>{record?.transcripts[3].potPubkeys}</Desc></li>
      </ol>

      <SubTitle>BLS Signatures:</SubTitle>
      <ol>
        <li><Desc>{record?.transcripts[0].blsSignature}</Desc></li>
        <li><Desc>{record?.transcripts[1].blsSignature}</Desc></li>
        <li><Desc>{record?.transcripts[2].blsSignature}</Desc></li>
        <li><Desc>{record?.transcripts[3].blsSignature}</Desc></li>
      </ol>
      {record?.participantEcdsaSignature ?
        <>
        <SubTitle>ECDSA Signature (optional):</SubTitle>
        <Desc>{record?.participantEcdsaSignature}</Desc>
        </>
        :
        null
      }
    </Modal>
  )
}

export const Title = styled.h2`
  ${textSerif}
`

export const SubTitle = styled(Bold)`
  ${textSerif}
`

export const Desc = styled(Description)`
  word-break: break-word;
`

export default TranscriptModal
