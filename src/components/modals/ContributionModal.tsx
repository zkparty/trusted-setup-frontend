import { utils } from 'ethers'
import Modal from 'react-modal'
import styled from 'styled-components'
import { PrimaryButton } from '../Button'
import BlockiesIdenticon from '../Blockies'
import { useEffect, useState } from 'react'
import { ENVIRONMENT } from '../../constants'
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
  const [selectedIndex, setSelectedIndex] = useState<number|null>(null)
  const [selectedSignatureItem, setSelectedSignatureItem] = useState<string|null>(null)
  const [contributions, setContributions] = useState<any>(null)
  const [checksColor, setChecksColor] = useState<string>('')
  useEffect(() => {
    if (open)  document.body.style.overflowY = 'hidden';
    else  document.body.style.overflowY = 'unset';

    if (!signature || !contribution || !receipt ){
      return;
    }

    const receiptObj = JSON.parse(receipt)
    const _witnesses = receiptObj['witness']
    const _contributions = JSON.parse(contribution)['contributions']
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
      const hash = utils.hashMessage(receipt)
      const signer = utils.recoverAddress(hash, '0x' + signature)
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
    let tweet = t('complete.modal.tweet', {identity})
    if ( ENVIRONMENT === 'testnet' ){
      tweet = '**TEST**: ' + tweet
    }
    const encoded = encodeURIComponent( tweet )
    const link = `https://twitter.com/intent/tweet?text=${encoded}`
    window.open(link, '_blank');
  }

  const handleClickShareLenster = () => {
    let post = t('complete.modal.post', {identity})
    if ( ENVIRONMENT === 'testnet' ){
      post = '**TEST**: ' + post
    }
    const encoded = encodeURIComponent( post )
    const link = `https://lenster.xyz/?text=${encoded}`
    window.open(link, '_blank');
  }

  const handleClickDownloadReceipt = () => {
    const encodedReceipt = encodeURIComponent(receipt!)
    const jsonString = `data:text/json;chatset=utf-8,${encodedReceipt}`
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";
    link.click();
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
          <Desc>
            <b>
              <Trans i18nKey="complete.modal.identity">
                Participant identity:
              </Trans>
            </b>
            <br/>
            { identity }
          </Desc>
          <Desc>
            <b>
              <Trans i18nKey="complete.modal.potPubkeys">
                Powers of Tau Pubkeys:
              </Trans>
            </b>
          </Desc>
          <BlockieRow>
            <BlockiesIdenticon
              onClick={ () => {
                setSelectedSignatureItem(contributions[0]['potPubkey'])
                setSelectedIndex(0)
              } }
              clickable={true}
              opts={{
                seed: contributions ? contributions[0]['potPubkey'] : null,
                size: 8,
                scale: 5
              }}
            />
            <BlockiesIdenticon
              onClick={ () => {
                setSelectedSignatureItem(contributions[1]['potPubkey'])
                setSelectedIndex(1)
              } }
              clickable={true}
              opts={{
                seed: contributions ? contributions[1]['potPubkey'] : null,
                size: 8,
                scale: 5
              }}
            />
            <BlockiesIdenticon
              onClick={ () => {
                setSelectedSignatureItem(contributions[2]['potPubkey'])
                setSelectedIndex(2)
              } }
              clickable={true}
              opts={{
                seed: contributions ? contributions[2]['potPubkey'] : null,
                size: 8,
                scale: 5
              }}
            />
            <BlockiesIdenticon
              onClick={ () => {
                setSelectedSignatureItem(contributions[3]['potPubkey'])
                setSelectedIndex(3)
              } }
              clickable={true}
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
        <b><Trans i18nKey="complete.modal.signedBy">Signed by </Trans></b>
        { ' ' + data?.sequencer_address }
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
        <PrimaryButton onClick={handleClickShareLenster} style={{ width: '300px' }}>
          <Trans i18nKey="complete.modal.shareLenster">
            Share on Lenster
          </Trans>
        </PrimaryButton>
        <PrimaryButton onClick={handleClickDownloadReceipt} style={{ width: '300px' }}>
          <Trans i18nKey="complete.modal.downloadReceipt">
            Download Receipt
          </Trans>
        </PrimaryButton>
      </BottomSection>
    </Modal>
    <SignatureModal
      index={selectedIndex}
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
