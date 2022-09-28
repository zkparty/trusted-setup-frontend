import api from '../api'
import styled from 'styled-components'
import Header from '../components/Header'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/auth'
import { useContributionStore, Store } from '../store/contribute'
import { Description, PageTitle } from '../components/Text'

const ContributingPage = () => {
  const { sessionId } = useAuthStore()
  const entropy = useContributionStore((state: Store) => state.entropy)
  const contribution = useContributionStore((state: Store) => state.contribution)
  const [step, setStep] = useState('downloading');
  // downloading, contributing, completed, error

  useEffect(() => {
    (async () => {
      try {
        setStep('contributing')
        api.contribute(sessionId!, contribution!, entropy, () => {
          setStep('completed')
        })
      } catch (error) {
        console.log(error);
        setStep('error');
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Header />
      <PageTitle>Magic math & you.</PageTitle>
      <Description>The integration of your power grows the magic math. It’s overwhelming, but do not fear. Remain with the chosen few who have made it this far. It isn’t much longer now.</Description>
      <Description>Do not close browser</Description>
      {step === 'downloading' ? <Description>Downloading...</Description> : ''}
      {step === 'contributing' ? <Description>Contributing...</Description> : ''}
      {step === 'completed' ? <Description>Contribution completed</Description> : ''}
      {step === 'error' ? <Description>There was an error. Reload and try again</Description> : ''}
    </Container>
  )
}

const Container = styled.section`
  padding: 0 24px 24px;
`

export default ContributingPage
