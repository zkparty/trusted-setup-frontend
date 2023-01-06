import { Bold } from '../Text'
import { utils } from 'ethers'
import Modal from 'react-modal'
import ROUTES from '../../routes'
import theme from '../../style/theme'
import styled from 'styled-components'
import { isMobile } from '../../utils'
import ReactTooltip from 'react-tooltip'
import { PrimaryButton } from '../Button'
import ExternalLink from '../ExternalLink'
import BlockiesIdenticon from '../Blockies'
import { useEffect, useState } from 'react'
import { FONT_SIZE } from '../../constants'
import { Trans, useTranslation } from 'react-i18next'
import {Title, Desc, SubTitle } from './TranscriptModal'
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
  const [contributions, setContributions] = useState<any>([])
  const [ecdsaSignature, setEcdsaSignature] = useState<any>(null)
  const [checksColor, setChecksColor] = useState<string>('')
  useEffect(() => {
    if (open)  document.body.style.overflowY = 'hidden'
    else  document.body.style.overflowY = 'unset'

    if (!signature || !contribution || !receipt ){
      return;
    }

    const receiptObj = JSON.parse(receipt)
    const _witnesses = receiptObj['witness']
    const contributionObj = JSON.parse(contribution)
    const _contributions = contributionObj['contributions']
    const _ecdsaSignature = contributionObj['ecdsaSignature']
    setNow( new Date().toUTCString() )
    setWitnesses(_witnesses)
    setIdentity(receiptObj['identity'])
    setContributions(_contributions)
    setEcdsaSignature(_ecdsaSignature)

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

  const powers = [12, 13, 14, 15]

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
          width: isMobile() ? '90%' : '40%',
          inset: '15% 0 0 0',
          marginInline: 'auto',
          paddingBlock: '40px',
          paddingInline: '5%',
          background: theme.surface,
          boxShadow: '5px 10px 8px 10px #b4b2b2',
        }
      }}
    >

        <Title>
          <Trans i18nKey="complete.modal.keys">
            CONTRIBUTION DETAILS
          </Trans>
          <Link href={`/#${ROUTES.RECORD}`}>
            <Trans i18nKey="complete.modal.transcript">
              full transcript
            </Trans>
          </Link>
        </Title>
        <SubTitle>
          <Trans i18nKey="complete.modal.timestamp">
            Contribution completed at:
          </Trans>
        </SubTitle>
        <Desc>
          { now }
        </Desc>
        <SubTitle>
          <Trans i18nKey="complete.modal.identity">
            Participant ID:
          </Trans>
        </SubTitle>
        <Desc>
          { identity.replace('eth|','') }
        </Desc>
        <SubTitle>
          <Trans i18nKey="complete.modal.potPubkeys">
            Powers of Tau Pubkeys:
          </Trans>
        </SubTitle>
        <ol style={{ paddingInlineStart: '20px', paddingLeft: '0px' }}>
          { contributions ?
            contributions.map((transcript: any, index: number) => (
              <div style={{ display: 'flex', paddingBottom: '3px' }} key={transcript.potPubkey + index}>
                <BlockiesIdenticon
                  opts={{
                    seed: transcript.potPubkey,
                    size: 8,
                    scale: 5
                  }}
                />
                <Desc><Bold>{`(2^${powers[index]}): `}</Bold>{transcript.potPubkey}</Desc>
              </div>
            ))
            :
            ''
          }
        </ol>
        <SubTitle>
          <Trans i18nKey="record.transcriptModal.bls">
            BLS Signatures:
          </Trans>
        </SubTitle>
        <ol style={{ paddingInlineStart: '20px', paddingBottom: '10px' }}>
        { contributions ?
          contributions.map((transcript: any, index: number) => (
            <li key={transcript.potPubkey + index}><Desc>{transcript.blsSignature}</Desc></li>
          ))
          :
          ''
        }
        </ol>
        {ecdsaSignature ?
          <>
          <SubTitle>
            <Trans i18nKey="record.transcriptModal.ecdsa">
              ECDSA Signature (optional):
            </Trans>
          </SubTitle>
          <Desc>{ecdsaSignature}</Desc>
          </>
          :
          null
        }
        <br/>
        <Title>
          <Trans i18nKey="complete.modal.acknowledgment">
            SEQUENCER ACKNOWLEDGEMENT
          </Trans>
        </Title>
        <BottomSection>
          <PrimaryButton onClick={handleClickDownloadReceipt} style={{ width: '300px' }}>
            <Trans i18nKey="complete.modal.downloadReceipt">
              Download Receipt
            </Trans>
          </PrimaryButton>
        </BottomSection>
        <SubTitle>
          <Trans i18nKey="complete.modal.receipt">
            Contribution receipt:
          </Trans>
        </SubTitle>
        <ol style={{ paddingInlineStart: '20px' }}>
          <li><Desc style={{marginBottom: '6px'}}>{witnesses[0]}</Desc></li>
          <li><Desc style={{marginBottom: '6px'}}>{witnesses[1]}</Desc></li>
          <li><Desc style={{marginBottom: '6px'}}>{witnesses[2]}</Desc></li>
          <li><Desc style={{marginBottom: '6px'}}>{witnesses[3]}</Desc></li>
        </ol>

      <Desc style={{ textAlign: 'center'}}>
        <b><Trans i18nKey="complete.modal.signedBy">Signed by </Trans></b>
        { ' ' + data?.sequencer_address }
      </Desc>
      <DescIntegrity
        data-for={"integrityChecks"}
        data-tip={"Integrity checks tooltip content in div below"}
      >
        <b><Trans i18nKey="complete.modal.integrityChecks">Integrity checks </Trans></b>
        <span style={{ color: checksColor }}>
          {checks}
        </span>
      </DescIntegrity>
      <ReactTooltip
        id={"integrityChecks"}
        place={"bottom"}
        overridePosition={(
          { left, top },
          _currentEvent, _currentTarget, _node) => {
            ReactTooltip.rebuild()
            return { top, left }
          }
        }
        backgroundColor="black"
        effect="solid"
        padding="12px"
      >
        <div style={{ width: '40ch', wordBreak: 'break-word' }}>
          { t("complete.modal.checks.tooltip") }
        </div>
      </ReactTooltip>
    </Modal>
    </>
  )
}

const Link = styled(ExternalLink)`
  text-decoration-line: underline;
  font-family: 'Inter', sans-serif;
  font-size: ${FONT_SIZE.S};
  font-weight: 100;
  margin-left: 9px;
`

const BottomSection = styled.div`
  display: flex;
  margin-bottom: 19px;
  justify-content: space-around;
`

const DescIntegrity = styled(Desc)`
  text-align: center;
  margin-bottom: 45px;
`

export default ContributionModal
