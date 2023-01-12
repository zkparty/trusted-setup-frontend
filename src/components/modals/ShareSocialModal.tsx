import Modal from 'react-modal'
import theme from '../../style/theme'
import { isMobile } from '../../utils'
import styled from 'styled-components'
import { PrimaryButton } from '../Button'
import { Title } from './TranscriptModal'
import { ENVIRONMENT } from '../../constants'
import { SingleButtonSection } from '../Layout'
import { useTranslation, Trans } from 'react-i18next'


type Props = {
    open: boolean
    identity: string
    onDeselect: () => void
}

const ShareSocialModal = ({ open, identity, onDeselect }: Props) => {
    const {t} = useTranslation()

    const handleClickShareTwitter = () => {
        let tweet = t('complete.shareModal.tweet', {identity})
        if ( ENVIRONMENT === 'testnet' ){
            tweet = '**TEST**: ' + tweet
        }
        const encoded = encodeURIComponent( tweet )
        const link = `https://twitter.com/intent/tweet?text=${encoded}`
        window.open(link, '_blank');
    }

    const handleClickShareLenster = () => {
        let post = t('complete.shareModal.tweet', {identity})
        if ( ENVIRONMENT === 'testnet' ){
        post = '**TEST**: ' + post
        }
        const encoded = encodeURIComponent( post )
        const link = `https://lenster.xyz/?text=${encoded}`
        window.open(link, '_blank');
    }

    return(
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
            <Title>
                <Trans i18nKey="complete.shareModal.title">
                    SHARE ON SOCIAL
                </Trans>
            </Title>
            <ButtonSection>
                <PrimaryButton onClick={handleClickShareTwitter}>
                    <Trans i18nKey="complete.shareModal.shareTwitter">
                        Twitter
                    </Trans>
                </PrimaryButton>
                <PrimaryButton onClick={handleClickShareLenster}>
                    <Trans i18nKey="complete.shareModal.shareLenster">
                        Lenster
                    </Trans>
                </PrimaryButton>
            </ButtonSection>
        </Modal>
    )
}

const ButtonSection = styled(SingleButtonSection)`
    height: auto;
    margin: 0px;
    gap: 10px;
`

export default ShareSocialModal