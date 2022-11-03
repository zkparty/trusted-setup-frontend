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

const CompletePage = () => {
  useTranslation()
  const [error, setError] = useState<null | string>(null)
  const { contribution, newContribution } = useContributionStore(
    (state: Store) => ({
      contribution: state.contribution,
      newContribution: state.newContribution
    })
  )

  useEffect(() => {
    ;(async () => {
      // TODO: should user have a start checking button?
      const checks = await wasm.checkContributions(
        contribution!,
        newContribution!
      )
      if (!checks.checkContribution){
        setError('Subgroup check failed in the contribution you received. Please report it inmmediately')
      }
      if (!checks.checkNewContribution){
        setError('Subgroup check failed in your computed contribution. Please check your setup and try again')
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
                <PrimaryButtonLarge>
                  <Trans i18nKey="complete.button">
                    View your contribution
                  </Trans>
                </PrimaryButtonLarge>
              </ButtonSection>
            </InnerWrap>
          </Wrap>
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
