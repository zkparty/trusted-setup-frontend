import Modal from 'react-modal'
import { Record } from '../../types'
import styled from 'styled-components'
import { FONT_SIZE } from '../../constants'
import { Bold, Description } from '../Text'
import SignatureModal from './SignatureModal'
import { textSerif } from '../../style/utils'
import { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import BlockiesIdenticon from '../../components/Blockies'


type Props = {
  record: Record | null
  onDeselect: () => void
}

const TranscriptModal = ({ record, onDeselect }: Props) => {
  const open = !!record
  useTranslation()
  const [selectedSignatureItem, setSelectedSignatureItem] = useState<string|null>(null)
  useEffect(() => {
    if (open)  document.body.style.overflowY = 'hidden';
    else  document.body.style.overflowY = 'unset';
  }, [open])

  return (
    <>
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
          Powers of Tau Pubkeys:
        </Trans>
      </SubTitle>
      <ol style={{ paddingInlineStart: '20px', paddingLeft: '0px' }}>
        {record?.transcripts.map((transcript, index) => (
          <div style={{ display: 'flex', paddingBottom: '3px' }} key={transcript.potPubkeys}>
            <BlockiesIdenticon
              onClick={() => {setSelectedSignatureItem(transcript.potPubkeys)}}
              hover={true}
              opts={{
                seed: transcript.potPubkeys,
                size: 8,
                scale: 5
              }}
            />
            <span style={{ paddingRight: '7px', paddingLeft: '5px' }}>{(index+1) + '.'}</span>
            <Desc>{transcript.potPubkeys}</Desc>
          </div>
        ))}
      </ol>

      <SubTitle>
        <Trans i18nKey="record.transcriptModal.bls">
          BLS Signatures:
        </Trans>
      </SubTitle>
      <ol style={{ paddingInlineStart: '20px' }}>
      {record?.transcripts.map((transcript) => (
         <li key={transcript.potPubkeys}><Desc>{transcript.blsSignature}</Desc></li>
      ))}
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
    <SignatureModal
      signature={selectedSignatureItem}
      onDeselect={() => setSelectedSignatureItem(null)}
    />
    </>
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
