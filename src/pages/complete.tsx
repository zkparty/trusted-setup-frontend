import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ErrorMessage from '../components/Error'
import { PrimaryButtonLarge } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import { useContributionStore, Store } from '../store/contribute'
import HeaderJustGoingBack from '../components/HeaderJustGoingBack'
import wasm from '../wasm'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  SingleButtonSection,
  TextSection,
  InnerWrap,
  Over,
} from '../components/Layout'
import { Trans, useTranslation } from 'react-i18next'
import ContributionModal from '../components/modals/ContributionModal'

const CompletePage = () => {
  const { t } = useTranslation()
  const [error, setError] = useState<null | string>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { contribution, newContribution, receipt } = useContributionStore(
    (state: Store) => ({
      contribution: state.contribution,
      newContribution: state.newContribution,
      receipt: state.receipt,
    })
  )

  const handleClickViewContribution = async () => {
    setIsModalOpen(true);
  }

  useEffect(() => {
    ;(async () => {
      // TODO: should user have a start checking button?
      const checks = await wasm.checkContributions(
        contribution!,
        newContribution!
      )
      if (!checks.checkContribution){
        setError( t('error.pastSubgroupChecksFailed') )
      }
      if (!checks.checkNewContribution){
        setError( t('error.newSubgroupChecksFailed'))
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <HeaderJustGoingBack />
      <Over>
        <Container>
          <Wrap>
            <InnerWrap>
              <PageTitle>
                <Trans i18nKey="complete.title">
                  Dankshard <br /> draws near
                </Trans>
              </PageTitle>

              <TextSection>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Trans i18nKey="complete.description">
                  <Description>
                    Success! Echoes of you are permanently fused with the others
                    in this Summoning Ceremony.
                  </Description>
                </Trans>
              </TextSection>

              <ButtonSection>
                <PrimaryButtonLarge onClick={handleClickViewContribution}>
                  <Trans i18nKey="complete.button">
                    View your contribution
                  </Trans>
                </PrimaryButtonLarge>
              </ButtonSection>
            </InnerWrap>
          </Wrap>
          <ContributionModal
            contribution={contribution}
            receipt={receipt}
            open={isModalOpen}
            onDeselect={() => setIsModalOpen(false)}
          />
        </Container>
      </Over>
    </>
  )
}

export const ButtonSection = styled(SingleButtonSection)`
  margin-top: 12px;
  height: 120px;
`

export default CompletePage
