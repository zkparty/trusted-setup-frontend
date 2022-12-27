import ROUTES from '../routes'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/Error'
import { Trans, useTranslation } from 'react-i18next'
import { PrimaryButtonLarge } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import { useContributionStore, Store } from '../store/contribute'
import HeaderJustGoingBack from '../components/headers/HeaderJustGoingBack'
import ContributionModal from '../components/modals/ContributionModal'
import wasm from '../wasm'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  SingleButtonSection,
  TextSection,
  InnerWrap,
  Over,
} from '../components/Layout'

const CompletePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [error, setError] = useState<null | string>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { receipt, contribution, newContribution, sequencerSignature } = useContributionStore(
    (state: Store) => ({
      receipt: state.receipt,
      contribution: state.contribution,
      newContribution: state.newContribution,
      sequencerSignature: state.sequencerSignature,
    })
  )

  const handleClickViewContribution = async () => {
    setIsModalOpen(true);
  }

  useEffect(() => {
    (async () => {
      if (!contribution || !newContribution){
        navigate(ROUTES.ROOT)
        return
      }
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
            signature={sequencerSignature}
            contribution={newContribution}
            receipt={receipt}
            open={isModalOpen}
            onDeselect={() => setIsModalOpen(false)}
          />
        </Container>
        <TannedBackground/>
      </Over>
    </>
  )
}

const TannedBackground = styled.div`
  top: 0px;
  z-index: -3;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: #FFF8E7;
`

export const ButtonSection = styled(SingleButtonSection)`
  margin-top: 12px;
  height: 120px;
`

export default CompletePage
