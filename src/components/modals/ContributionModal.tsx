import Modal from 'react-modal'
import { useEffect } from 'react'
import styled from 'styled-components'
import BlockiesIdenticon from '../Blockies'
import { PrimaryButton } from '../Button'
import { Trans, useTranslation } from 'react-i18next'
import {Title, Desc } from './TranscriptModal'

type Props = {
  contribution: string | null
  receipt: string | null
  open: boolean
  onDeselect: () => void
}

const ContributionModal = ({ contribution, receipt, open, onDeselect }: Props) => {
  const { t } = useTranslation()
  useEffect(() => {
    if (open)  document.body.style.overflow = 'hidden';
    else  document.body.style.overflow = 'unset';
  }, [open])

  const now = new Date().toUTCString()
  const receiptObj = JSON.parse(receipt!)
  const witness = receiptObj['witness']
  const identity = receiptObj['identity']
  const contributionObj = JSON.parse(contribution!)['contributions']

  const handleClickShareTwitter = () => {
    const tweet = t('complete.modal.tweet', {identity})
    const encoded = encodeURIComponent( tweet )
    const link = `https://twitter.com/intent/tweet?text=${encoded}`
    window.open(link, '_blank');
  }

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
          cursor: 'auto',
          border: 'none',
          blockSize: 'fit-content',
          width: 'clamp(90%, 75%, 70%)',
          inset: '15% 0 0 0',
          marginInline: 'auto',
          paddingTop: '20px',
          paddingBottom: '70px',
          paddingInline: '6%',
          background: '#FFF8E7',
          boxShadow: '5px 10px 8px 10px #b4b2b2',
        }
      }}
    >
      <TopSection>
        <RightSection>
          <Title>
            <Trans i18nKey="complete.modal.keys">
              MY KEYS
            </Trans>
          </Title>
          <Desc>
            <Trans i18nKey="complete.modal.timestamp">
              Contribution completed at:
            </Trans>
            <br/>
            { now }
          </Desc>
          <BlockieRow>
            <BlockiesIdenticon
              onClick={() => {}}
              opts={{
                seed: contributionObj[0]['potPubkey'],
                size: 8,
                scale: 5
              }}
            />
            <BlockiesIdenticon
              onClick={() => {}}
              opts={{
                seed: contributionObj[1]['potPubkey'],
                size: 8,
                scale: 5
              }}
            />
            <BlockiesIdenticon
              onClick={() => {}}
              opts={{
                seed: contributionObj[2]['potPubkey'],
                size: 8,
                scale: 5
              }}
            />
            <BlockiesIdenticon
              onClick={() => {}}
              opts={{
                seed: contributionObj[3]['potPubkey'],
                size: 8,
                scale: 5
              }}
            />
          </BlockieRow>
        </RightSection>
        <LeftSection>
          <Title>
            <Trans i18nKey="complete.modal.acknowledgment">
              SEQUENCER ACKNOWLEDGEMENT
            </Trans>
          </Title>
          <Desc>
            <Trans i18nKey="complete.modal.receipt">
              Contribution receipt:
            </Trans>
            <br/>
            { witness }
          </Desc>
        </LeftSection>
      </TopSection>
      <Desc style={{ textAlign: 'center'}}>
        <b><Trans i18nKey="complete.modal.SignedBy">Signed by </Trans></b>
        { identity }
      </Desc>
      <Desc style={{ textAlign: 'center', marginBottom: '45px'}}>
        <b><Trans i18nKey="complete.modal.integrityChecks">Integrity checks </Trans></b>
        <span style={{color: '#61cc61'}}> {'Passed'} </span>
      </Desc>
      <BottomSection>
        <PrimaryButton onClick={handleClickShareTwitter} style={{ width: '300px' }}>
          <Trans i18nKey="complete.modal.shareTwitter">
            Share on Twitter
          </Trans>
        </PrimaryButton>
      </BottomSection>
    </Modal>
  )
}

const BlockieRow = styled.div`
  display: flex;
  gap: 7px;
`

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
`
const RightSection = styled.div``
const LeftSection = styled.div`
  width: 60%;
`

const BottomSection = styled.div`
  display: flex;
  justify-content: space-around;
`

export default ContributionModal
