import { useEffect } from 'react'
import styled from 'styled-components'
import { PrimaryButtonLarge } from '../components/Button'
import Header from '../components/Header'
import { Description, PageTitle } from '../components/Text'
import { useContributionStore, Store } from '../store/contribute'
import wasm from '../wasm'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  Over
} from '../components/Layout'
import { Trans, useTranslation } from 'react-i18next'

const CompletePage = () => {
  useTranslation()
  const { contribution, newContribution } = useContributionStore(
    (state: Store) => ({
      contribution: state.contribution,
      newContribution: state.newContribution
    })
  )

  useEffect(() => {
    ;(async () => {
      // TODO: check is done automatically or user start checking?
      const checks = await wasm.checkContributions(
        contribution!,
        newContribution!
      )
      console.log(checks)
    })()
  })

  return (
    <>
      <Header />
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
                <Trans i18nKey="complete.description">
                  <Desc>
                    Success! Echoes of you are permanently fused with the others
                    in this Summoning Ceremony.
                  </Desc>
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

const InnerWrap = styled.div`
  margin-top: 50px;
`

const TextSection = styled.div`
  width: 360px;
`

const Desc = styled(Description)`
  margin: 0 0 20px;
  font-size: 18px;
`

export const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 120px;
  align-items: center;
  justify-content: space-around;
  margin-top: 12px;
`

export default CompletePage
