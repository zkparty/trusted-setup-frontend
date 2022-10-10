import { useEffect } from 'react'
import styled from 'styled-components'
import { PrimaryButtonLarge } from '../components/Button'
import Header from '../components/Header'
import { Description, PageTitle } from '../components/Text'
import { useContributionStore, Store } from '../store/contribute'
import wasm from '../wasm'

const CompletePage = () => {
  const { contribution, newContribution } = useContributionStore((state: Store) => ({
    contribution: state.contribution,
    newContribution: state.newContribution,
  }))

  useEffect(() => {
    (async () => {
      // TODO: check is done automatically or user start checking?
      const checks = await wasm.checkContributions(contribution!, newContribution!)
      console.log(checks)
    })()
  })

  return (
    <>
      <Header />
      <Container>
        <PageTitle>Dankshard draws near</PageTitle>
        <Description>
        Success! Echoes of you are permanently fused with the others in this Summoning Ceremony.
        </Description>
        <Description>
        <Bold>Remember:</Bold> this is only a testnet Ceremony - make sure to return for the full Dankshard summoning.
        </Description>
        <PrimaryButtonLarge>View your contribution</PrimaryButtonLarge>
      </Container>
    </>
  )
}

const Container = styled.section`
  display: flex;
  align-items: center;
  padding: 0 24px 24px;
  flex-direction: column;
`
const Bold = styled.span`
  font-weight: 700;
`

export default CompletePage
