import { useEffect } from 'react'
import styled from 'styled-components'
import { PrimaryButtonLarge } from '../components/Button'
import Header from '../components/Header'
import { Description, PageTitle } from '../components/Text'
import { useContributionStore, Store } from '../store/contribute'
import api from '../api'

const CompletePage = () => {
  const { contribution, newContribution } = useContributionStore((state: Store) => ({
    contribution: state.contribution,
    newContribution: state.newContribution,
  }))

  useEffect(() => {
    (async () => {
      // TODO: check is done automatically or user start checking?
      const checks = await api.checkContribution(contribution!, newContribution!)
      console.log(checks)
    })()
  })

  return (
    <>
      <Header />
      <Container>
        <PageTitle>The Collective power.</PageTitle>
        <Description>
          The contribution is now complete. You are one of very early summoner,
          keep your eyez out for further annoucement and come back to verify at
          end of ceremony.
        </Description>
        <PrimaryButtonLarge>View my record</PrimaryButtonLarge>
      </Container>
    </>
  )
}

const Container = styled.section`
  padding: 0 24px 24px;
`

export default CompletePage
