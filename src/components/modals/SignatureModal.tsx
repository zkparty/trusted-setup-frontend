import Modal from 'react-modal'
import { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Title, Desc } from './TranscriptModal'

type Props = {
  signature: string | null
  index: number | null
  onDeselect: () => void
}

const SignatureModal = ({ signature, index, onDeselect }: Props) => {
  const open = !!signature
  useTranslation()
  useEffect(() => {
    if (open)  document.body.style.overflowY = 'hidden';
    else  document.body.style.overflowY = 'unset';
  }, [open])

  const powers = [12, 13, 14, 15]

  return (
    <Modal
      isOpen={!!signature}
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
          background: '#FFF8E7',
        }
      }}
    >
      <Title>
        <Trans i18nKey="record.signatureModal.title">PoT Pubkey:</Trans>
      </Title>
      <Desc><b>{`(2^${powers[index!]}): `}</b>{signature}</Desc>
    </Modal>
  )
}

export default SignatureModal
