import ROUTES from '../routes'
import styled from 'styled-components'
import { ENVIRONMENT } from '../constants'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/Error'
import { Trans, useTranslation } from 'react-i18next'
import { Description, PageTitle } from '../components/Text'
import { useContributionStore, Store } from '../store/contribute'
import { ButtonWithLinkOut, PrimaryButton } from '../components/Button'
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

  const handleClickShareTwitter = () => {
    const receiptObj = JSON.parse(receipt!)
    const { identity } = receiptObj
    let tweet = t('complete.modal.tweet', {identity})
    if ( ENVIRONMENT === 'testnet' ){
      tweet = '**TEST**: ' + tweet
    }
    const encoded = encodeURIComponent( tweet )
    const link = `https://twitter.com/intent/tweet?text=${encoded}`
    window.open(link, '_blank');
  }

  const handleClickViewContribution = async () => {
    setIsModalOpen(true);
  }

  const handleClickGoToHome = () => {
    navigate(ROUTES.ROOT)
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
                    in this Summoning Ceremony. Ceremony credibility is highest
                    with broad community participation - make sure to share this
                    with others.
                  </Description>
                  <Description>
                    The final output of this Ceremony will be used in a future
                    Ethereum upgrade to enable Danksharding.
                  </Description>
                </Trans>
              </TextSection>

              <ButtonSection>
                <PrimaryButton onClick={handleClickShareTwitter} style={{ width: '230px' }}>
                  <Trans i18nKey="complete.shareTwitter">
                    Share on Twitter
                  </Trans>
                </PrimaryButton>
                <PrimaryButton onClick={handleClickViewContribution}>
                  <Trans i18nKey="complete.button">
                    View your contribution
                  </Trans>
                </PrimaryButton>
                <ButtonWithLinkOut onClick={handleClickGoToHome} style={{ width: '280px', marginTop: '5px' }}>
                <Trans i18nKey="complete.gobackhome">
                  Go back home
                </Trans>
              </ButtonWithLinkOut>
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
  width: 100%;
  height: 100vh;
  position: absolute;
  background: ${({ theme }) => theme.surface };
`

export const ButtonSection = styled(SingleButtonSection)`
  margin-top: 15px;
  height: 120px;
  gap: 10px;
`

export default CompletePage
