import { utils } from 'ethers'
import Modal from 'react-modal'
import styled from 'styled-components'
import { PrimaryButton } from '../Button'
import BlockiesIdenticon from '../Blockies'
import { useEffect, useState } from 'react'
import SignatureModal from './SignatureModal'
import {Title, Desc } from './TranscriptModal'
import { Trans, useTranslation } from 'react-i18next'
import useSequencerStatus from '../../hooks/useSequencerStatus'

type Props = {
  signature: string | null
  contribution: string | null
  receipt: string | null
  open: boolean
  onDeselect: () => void
}

const ContributionModal = ({ signature, contribution, receipt, open, onDeselect }: Props) => {
  const { t } = useTranslation()
  const { data } = useSequencerStatus()
  const [now, setNow] = useState<string>('')
  const [checks, setChecks] = useState<string>('')
  const [identity, setIdentity] = useState<string>('')
  const [witnesses, setWitnesses] = useState<string[]>(['','','',''])
  const [selectedSignatureItem, setSelectedSignatureItem] = useState<string|null>(null)
  const [contributions, setContributions] = useState<any>(null)
  const [checksColor, setChecksColor] = useState<string>('')
  useEffect(() => {
    if (open)  document.body.style.overflow = 'hidden';
    else  document.body.style.overflow = 'unset';

    const receiptObj = JSON.parse(receipt!)
    const _witnesses = receiptObj['witness']
    const _contributions = JSON.parse(contribution!)['contributions']
    setNow( new Date().toUTCString() )
    setWitnesses(_witnesses)
    setIdentity(receiptObj['identity'])
    setContributions(_contributions)

    // witnesses should be potPubkeys
    for (let i = 0, ni=witnesses.length; i < ni; i++) {
      const witness = _witnesses[i]
      const potPubkey = _contributions[i]['potPubkey']
      if (witness !==  potPubkey){
        setChecks( t('complete.modal.checks.failedWitness') )
        setChecksColor('red')
        return
      }
    }
    // signature check
    try {
      const hash = utils.hashMessage(receipt!)
      const signer = utils.recoverAddress(hash, '0x' + signature!)
      if (signer !== data?.sequencer_address){
        setChecks( t('complete.modal.checks.failedSignature') )
        setChecksColor('red')
        return
      }
    } catch (error) {
      setChecks( t('complete.modal.checks.failedComputeSignature') )
      setChecksColor('red')
      return
    }
    // everything is ok
    setChecks( t('complete.modal.checks.success') )
    setChecksColor('#61cc61')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, contribution, receipt, open])

  const handleClickShareTwitter = () => {
    const tweet = t('complete.modal.tweet', {identity})
    const encoded = encodeURIComponent( tweet )
    const link = `https://twitter.com/intent/tweet?text=${encoded}`
    window.open(link, '_blank');
  }

  return (
    <>
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
            <b>
              <Trans i18nKey="complete.modal.timestamp">
                Contribution completed at:
              </Trans>
            </b>
            <br/>
            { now }
          </Desc>
          <BlockieRow>
            <BlockiesIdenticon
              onClick={() => setSelectedSignatureItem(contributions[0]['potPubkey'])}
              opts={{
                seed: contributions ? contributions[0]['potPubkey'] : null,
                size: 8,
                scale: 5
              }}
            />
            <BlockiesIdenticon
              onClick={() => setSelectedSignatureItem(contributions[1]['potPubkey'])}
              opts={{
                seed: contributions ? contributions[1]['potPubkey'] : null,
                size: 8,
                scale: 5
              }}
            />
            <BlockiesIdenticon
              onClick={() => setSelectedSignatureItem(contributions[2]['potPubkey'])}
              opts={{
                seed: contributions ? contributions[2]['potPubkey'] : null,
                size: 8,
                scale: 5
              }}
            />
            <BlockiesIdenticon
              onClick={() => setSelectedSignatureItem(contributions[3]['potPubkey'])}
              opts={{
                seed: contributions ? contributions[3]['potPubkey'] : null,
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
            <b>
              <Trans i18nKey="complete.modal.receipt">
                Contribution receipt:
              </Trans>
            </b>
          </Desc>
          <ol>
            <li><Desc style={{marginBottom: '6px'}}>{witnesses[0]}</Desc></li>
            <li><Desc style={{marginBottom: '6px'}}>{witnesses[1]}</Desc></li>
            <li><Desc style={{marginBottom: '6px'}}>{witnesses[2]}</Desc></li>
            <li><Desc style={{marginBottom: '6px'}}>{witnesses[3]}</Desc></li>
          </ol>
        </LeftSection>
      </TopSection>
      <Desc style={{ textAlign: 'center'}}>
        <b><Trans i18nKey="complete.modal.SignedBy">Signed by </Trans></b>
        { identity }
      </Desc>
      <Desc style={{ textAlign: 'center', marginBottom: '45px'}}>
        <b><Trans i18nKey="complete.modal.integrityChecks">Integrity checks </Trans></b>
        <span style={{color: checksColor}}> {checks} </span>
      </Desc>
      <BottomSection>
        <PrimaryButton onClick={handleClickShareTwitter} style={{ width: '300px' }}>
          <Trans i18nKey="complete.modal.shareTwitter">
            Share on Twitter
          </Trans>
        </PrimaryButton>
      </BottomSection>
    </Modal>
    <SignatureModal
      signature={selectedSignatureItem}
      onDeselect={() => setSelectedSignatureItem(null)}
    />
    </>
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
