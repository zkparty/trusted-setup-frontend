import { useContributionStore, Store } from '../store/contribute'
import { Description, PageTitle } from '../components/Text'
import { isSuccessRes, parseErrorMessage } from '../utils'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import styled from 'styled-components'
import ROUTES from '../routes'
import api from '../api'

const ContributingPage = () => {
  const { sessionId } = useAuthStore()
  const {
    entropy,
    contribution,
    updateProofs,
    updateReceipt,
    updateSignature,
    updateNewContribution,
  } = useContributionStore(
    (state: Store) => ({
      entropy: state.entropy,
      contribution: state.contribution,
      updateProofs: state.updateProofs,
      updateReceipt: state.updateReceipt,
      updateSignature: state.updateSignature,
      updateNewContribution: state.updateNewContribution,
    })
  )

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
          updateProofs(res.proofs)
          updateReceipt(res.receipt)
          updateSignature(res.signature)
          updateNewContribution(res.contribution)

          navigate(ROUTES.COMPLETE)
        } else {
          setError( parseErrorMessage(res) )
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
