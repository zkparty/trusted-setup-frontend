import Modal from 'react-modal'
import { Record } from '../types'
import styled from 'styled-components'
import { FONT_SIZE } from '../constants'
import { Bold, Description } from './Text'
import { textSerif } from '../style/utils'
import { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'


type Props = {
  record: Record | null
  onDeselect: () => void
}

const TranscriptModal = ({ record, onDeselect }: Props) => {
  const open = !!record
  useTranslation()
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
      <Title>
        <Trans i18nKey="record.transcriptModal.title">
          Contribution details
        </Trans>
      </Title>

      <SubTitle>
        <Trans i18nKey="record.transcriptModal.id">
          Participant ID:
        </Trans>
      </SubTitle>
      <Desc>{record?.participantId}</Desc>

      <SubTitle>
        <Trans i18nKey="record.transcriptModal.potpubkeys">
          Pot Pubkeys:
        </Trans>
      </SubTitle>
      <ol>
        <li><Desc>{record?.transcripts[0].potPubkeys}</Desc></li>
        <li><Desc>{record?.transcripts[1].potPubkeys}</Desc></li>
        <li><Desc>{record?.transcripts[2].potPubkeys}</Desc></li>
        <li><Desc>{record?.transcripts[3].potPubkeys}</Desc></li>
      </ol>

      <SubTitle>
        <Trans i18nKey="record.transcriptModal.bls">
          BLS Signatures:
        </Trans>
      </SubTitle>
      <ol>
        <li><Desc>{record?.transcripts[0].blsSignature}</Desc></li>
        <li><Desc>{record?.transcripts[1].blsSignature}</Desc></li>
        <li><Desc>{record?.transcripts[2].blsSignature}</Desc></li>
        <li><Desc>{record?.transcripts[3].blsSignature}</Desc></li>
      </ol>
      {record?.participantEcdsaSignature ?
        <>
        <SubTitle>
          <Trans i18nKey="record.transcriptModal.ecdsa">
            ECDSA Signature (optional):
          </Trans>
        </SubTitle>
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
  font-size: ${FONT_SIZE.S};
  margin: 0 0 10px;
`

export default TranscriptModal
