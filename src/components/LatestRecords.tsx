import ROUTES from '../routes'
import styled from 'styled-components'
import useRecord from '../hooks/useRecord'
import { useState, useEffect } from 'react'
import { Record, Transcript } from '../types'
import { useNavigate } from 'react-router-dom'
import { PageTitle } from '../components/Text'
import RecordTable from '../components/RecordTable'
import { PrimaryButton } from '../components/Button'
import { Trans, useTranslation } from 'react-i18next'

const LatestRecords = () => {
    useTranslation()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [formattedData, setFormattedData] = useState<Record[]>([])
    // load data from API
    const { data } = useRecord()


    const onClickViewContributions = () => {
      navigate(ROUTES.RECORD)
    }

    useEffect(() => {
        let active = true
        const formatDataFromRecord = async () => {
          if (!data) { return }
          const { transcripts, participantIds, participantEcdsaSignatures } = data! as Transcript;
          const records: Record[] = []
          const ni = participantIds.length
          for (let i = ni-1; i >= ni-4; i--) {
            const participantId = participantIds[i].replace('eth|','')
            const participantEcdsaSignature = participantEcdsaSignatures[i]
            const record: Record = {
              position: i,
              participantId,
              participantEcdsaSignature,
              transcripts: [
                {
                  potPubkeys: transcripts[0].witness.potPubkeys[i],
                  blsSignature: transcripts[0].witness.blsSignatures[i],
                },
                {
                  potPubkeys: transcripts[1].witness.potPubkeys[i],
                  blsSignature: transcripts[1].witness.blsSignatures[i],
                },
                {
                  potPubkeys: transcripts[2].witness.potPubkeys[i],
                  blsSignature: transcripts[2].witness.blsSignatures[i],
                },
                {
                  potPubkeys: transcripts[3].witness.potPubkeys[i],
                  blsSignature: transcripts[3].witness.blsSignatures[i],
                }
              ],
            }
            records.push(record)
          }
          if (!active) { return }
          setFormattedData( records )
          setIsLoading(false)
        }
        formatDataFromRecord();
        return () => { active = false }
      }, [data])

      return (
        <Container>
          <PageTitle>
            <Trans i18nKey="latestRecords.title">
              LATEST CONTRIBUTIONS
            </Trans>
          </PageTitle>
          <RecordTable
              data={formattedData}
              isLoading={isLoading}
              showChevron={false}
              reOrderFormattedData={ () => {}}
          />
          <ButtonSection>
            <PrimaryButton onClick={onClickViewContributions}>
              <Trans i18nKey="latestRecords.button">View all contributions</Trans>
            </PrimaryButton>
          </ButtonSection>
        </Container>
    )
}

export default LatestRecords


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70ch;
  max-width: 100%;
  margin: 0 auto;
  padding-inline: 5vw;
`

const ButtonSection = styled.div`
  margin-block: 40px;
`