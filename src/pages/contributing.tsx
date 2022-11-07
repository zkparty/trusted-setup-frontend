import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  useContributionStore,
  useEntropyStore,
  EntropyStore,
  Store,
} from '../store/contribute'
import { useAuthStore } from '../store/auth'
import { Description, PageTitle } from '../components/Text'
import { PrimaryButton } from '../components/Button'
import { isSuccessRes, parseErrorMessage, processIdentity } from '../utils'
import ROUTES from '../routes'
import api from '../api'
import HeaderJustGoingBack from '../components/HeaderJustGoingBack'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  Over,
  OverRelative,
  TextSection,
  InnerWrap
} from '../components/Layout'

type Steps = 'contributing' | 'completed' | 'error'

const ContributingPage = () => {
  const { sessionId, provider, nickname } = useAuthStore()
  const entropy = useEntropyStore(
    (state: EntropyStore) => state.entropy
  )
  const {
    ECDSASignature,
    contribution,
    updateReceipt,
    updateNewContribution
  } = useContributionStore((state: Store) => ({
    ECDSASignature: state.ECDSASignature,
    contribution: state.contribution,
    updateReceipt: state.updateReceipt,
    updateNewContribution: state.updateNewContribution
  }))

  const [step, setStep] = useState<Steps>('contributing')
  const [error, setError] = useState<null | string>(null)
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      try {
        if (!sessionId || !contribution) {
          throw new Error('invalid sessionId or contribution')
        }
        const identity = await processIdentity(provider!, nickname!)
        const res = await api.contribute(
          sessionId!,
          contribution!,
          entropy!,
          identity!,
          ECDSASignature
        )
        if (isSuccessRes(res)) {
          setStep('completed')
          updateReceipt(res.receipt)
          updateNewContribution(res.contribution)
          navigate(ROUTES.COMPLETE)
        } else {
          setError(parseErrorMessage(res))
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
    <>
      <HeaderJustGoingBack />
      <OverRelative>
        <Over>
          <ContainerR complete={step === 'completed'}>
            <Wrap>
              <InnerWrap>
                {step === 'contributing' ? (
                  <PageTitle>
                    You have been
                    <br />
                    called upon
                    <br />
                    Now
                  </PageTitle>
                ) : step === 'completed' ? (
                  <PageTitle>
                    Contribution
                    <br />
                    Complete
                  </PageTitle>
                ) : (
                  <PageTitle>
                    Something
                    <br />
                    Went
                    <br />
                    Wrong
                  </PageTitle>
                )}
                <TextSection>
                  {step === 'contributing' ? (
                    <>
                      <Description>
                        You are now entrusted with the Powers of Tau. Your
                        Secret, Sigil, and Sample are being fused with those
                        that came before.
                      </Description>
                      <Description>
                        Rituals cannot be hastened - time given here creates
                        timeless artifacts.
                      </Description>
                    </>
                  ) : step === 'completed' ? (
                    <Description>
                      You have just succesfully complete the contribution. Don’t
                      forget to return for the summoning ending & spread the
                      words.
                    </Description>
                  ) : (
                    <Description>
                      There was an error {error}. Reload and try again
                    </Description>
                  )}
                </TextSection>
                {step === 'completed' && (
                  <PrimaryButton>View my contribution</PrimaryButton>
                )}
              </InnerWrap>
            </Wrap>
          </ContainerR>
        </Over>
      </OverRelative>
    </>
  )
}

const ContainerR = styled(Container)<{ complete: boolean }>`
  transition: all 2s linear;
  ${({ complete, theme }) =>
    complete ? `background-color: ${theme.surface};` : ''}
`

export default ContributingPage
