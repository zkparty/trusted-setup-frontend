import Modal from 'react-modal'
import { Record } from '../../types'
import styled from 'styled-components'
import { FONT_SIZE } from '../../constants'
import { Bold, Description } from '../Text'
import { textSerif } from '../../style/utils'
import { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import BlockiesIdenticon from '../../components/Blockies'


type Props = {
  record: Record | null
  onDeselect: () => void
  onChange: (i: number) => void
}

const TranscriptModal = ({ record, onDeselect, onChange }: Props) => {
  const open = !!record
  useTranslation()
  useEffect(() => {
    if (open)  document.body.style.overflowY = 'hidden';
    else  document.body.style.overflowY = 'unset';
  }, [open])

  const powers = [12, 13, 14, 15]

  const onArrowClick = (i: number) => {
    onChange(record?.position! + i)
  }

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

      <ArrowSection>
      <SubTitle style={{ paddingRight: '10px' }}>
        # {record?.position}
      </SubTitle>
      <Arrow onClick={() => onArrowClick(-1)}>{'<-'}</Arrow>
      <Arrow onClick={() => onArrowClick(+1)}>{'->'}</Arrow>
      </ArrowSection>
      <br/>

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
          <div style={{ display: 'flex', paddingBottom: '3px' }} key={transcript.potPubkeys + index}>
            <BlockiesIdenticon
              opts={{
                seed: transcript.potPubkeys,
                size: 8,
                scale: 5
              }}
            />
            <Desc><Bold>{`(2^${powers[index]}): `}</Bold>{transcript.potPubkeys}</Desc>
          </div>
        ))}
      </ol>
      {record?.position === 0 ?
        <>
          <SubTitle>
            <Trans i18nKey="record.transcriptModal.zero.title">
              What is this is contribution?
            </Trans>
          </SubTitle>
          <Desc>
            <Trans i18nKey="record.transcriptModal.zero.description">
            The genesis contribution helps out as an starting point for the coming ones. It does not contain a participant ID, BLS signatures or ECDSA signatures.
            </Trans>
          </Desc>
        </>
        :
        <>
          <SubTitle>
            <Trans i18nKey="record.transcriptModal.bls">
              BLS Signatures:
            </Trans>
          </SubTitle>
          <ol style={{ paddingInlineStart: '20px' }}>
          {record?.transcripts.map((transcript, index) => (
            <li key={transcript.potPubkeys + index}><Desc>{transcript.blsSignature}</Desc></li>
          ))}
          </ol>
        </>
      }
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
    </>
  )
}

export const Title = styled.h2`
  ${textSerif}
`

export const SubTitle = styled(Bold)`
  ${textSerif}
`

export const Arrow = styled.div`
  cursor: pointer;
  padding-right: 4px;

  :hover {
    color: #7dbcff;
  }
`

export const ArrowSection = styled.div`
  display: inline-flex;
  align-items: center;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
`

export const Desc = styled(Description)`
  word-break: break-all;
  font-size: ${FONT_SIZE.S};
  margin: 0 0 10px;
`

export default TranscriptModal
