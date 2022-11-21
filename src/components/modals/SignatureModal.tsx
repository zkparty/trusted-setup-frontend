import Modal from 'react-modal'
import { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Title, Desc } from './TranscriptModal'

type Props = {
  signature: string | null
  onDeselect: () => void
}

const SignatureModal = ({ signature, onDeselect }: Props) => {
  const open = !!signature
  useTranslation()
  useEffect(() => {
    if (open)  document.body.style.overflow = 'hidden';
    else  document.body.style.overflow = 'unset';
  }, [open])

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
        }
      }}
    >
      <Title>
        <Trans i18nKey="record.signatureModal.title">PoT Pubkey:</Trans>
      </Title>
      <Desc>{signature}</Desc>
    </Modal>
  )
}

export default SignatureModal
