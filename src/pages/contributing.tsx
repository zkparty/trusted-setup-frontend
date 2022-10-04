import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useAuthStore } from '../store/auth'
import { useContributionStore } from '../store/contribute'
import { Description, PageTitle } from '../components/Text'
import api from '../api'
import ROUTES from '../routes'
import { isSuccessRes } from '../utils'
import { ErrorRes } from '../types'

const ContributingPage = () => {
  const { sessionId } = useAuthStore()
  const { entropy, contribution } = useContributionStore((state) => ({
    entropy: state.entropy,
    contribution: state.contribution
  }))

  const [step, setStep] = useState('downloading')
  const [error, setError] = useState<null | string>(null)
  const navigate = useNavigate()
  // downloading, contributing, completed, error

  useEffect(() => {
    (async () => {
      try {
        if (!sessionId || !contribution) {
          throw new Error('invalid sessionId or contribution')
        }

        setStep('contributing')
        const res = await api.contribute(sessionId!, contribution!, entropy)
        if (isSuccessRes(res)) {
          setStep('completed')
          navigate(ROUTES.COMPLETE)
        } else {
          setError((res as ErrorRes).error)
          setStep('error')
        }
      } catch (error) {
        console.log(error)
        setStep('error')
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <Header />
      <PageTitle>Magic math & you.</PageTitle>
      <Description>
        The integration of your power grows the magic math. It’s overwhelming,
        but do not fear. Remain with the chosen few who have made it this far.
        It isn’t much longer now.
      </Description>
      <Description>Do not close browser</Description>
      {step === 'downloading' ? <Description>Downloading...</Description> : ''}
      {step === 'contributing' ? (
        <Description>Contributing...</Description>
      ) : (
        ''
      )}
      {step === 'completed' ? (
        <Description>Contribution completed</Description>
      ) : (
        ''
      )}
      {step === 'error' ? (
        <Description>
          There was an error {error}. Reload and try again
        </Description>
      ) : (
        ''
      )}
    </Container>
  )
}

const Container = styled.section`
  padding: 0 24px 24px;
`

export default ContributingPage
