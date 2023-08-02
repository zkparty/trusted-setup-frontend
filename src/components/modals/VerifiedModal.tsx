import Modal from 'react-modal'
import theme from '../../style/theme'
import { isMobile } from '../../utils'

type Props = {
    open: boolean
    verificationResult: boolean
    onDeselect: () => void
}

const VerifiedModal = ({ open, verificationResult, onDeselect }: Props) => {
    return (
        <Modal
            isOpen={open}
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
                    border: 'none',
                    width: isMobile() ? '90%' : '350px',
                    height: '240px',
                    marginBlock: 'auto',
                    marginInline: 'auto',

                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',

                    background: theme.surface,
                    boxShadow: '5px 10px 8px 10px #b4b2b2',
                }
            }}
        >
            {`The transcript is ${verificationResult ? 'correct' : 'incorrect'}`}
        </Modal>
    )
}

export default VerifiedModal