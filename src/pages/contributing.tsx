import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { css, keyframes } from 'styled-components'
import { useContributionStore, Store } from '../store/contribute'
import { useAuthStore } from '../store/auth'
import { Description, PageTitle } from '../components/Text'
import { PrimaryButton } from '../components/Button'
import { isSuccessRes, parseErrorMessage } from '../utils'
import ROUTES from '../routes'
import api from '../api'
import Explanation from '../components/Explanation'
import Footer from '../components/Footer'
import HeaderJustGoingBack from '../components/HeaderJustGoingBack'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  Over,
  OverRelative,
  TextSection,
  Bg,
  Img
} from '../components/Layout'

import BgImg from '../assets/img-graphic-base.svg'
import BgImgPulse from '../assets/img-graphic-pulse.svg'
import BgImgColor from '../assets/img-base-color.svg'
import InnerColor from '../assets/inner-color.svg'
import SnakeColor from '../assets/snake-color.svg'
import OuterColor from '../assets/outer-color.svg'
import PizzaInner from '../assets/crust.svg'
import PizzaOuter from '../assets/fig.svg'

type Steps =
  | 'contributing'
  | 'completed'
  | 'error'

const ContributingPage = () => {
  const { sessionId } = useAuthStore()
  const {
    entropy,
    ECDSASignature,
    contribution,
    updateReceipt,
    updateNewContribution
  } = useContributionStore((state: Store) => ({
    entropy: state.entropy,
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
        const res = await api.contribute(
          sessionId!,
          contribution!,
          entropy!,
          ECDSASignature,
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
            <Bg src={BgImg} />
            <BgPulse src={BgImgPulse} />
            <BgC src={BgImgColor} visible={step === 'completed'} />
            <PizzaImg visible rounding={false} src={PizzaInner} />
            <PizzaImg visible rounding={false} src={PizzaOuter} />
            <Img src={InnerColor} />
            <Img src={OuterColor} />
            <Img src={SnakeColor} />

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
      <Explanation />
      <Footer />
    </>
  )
}

const ContainerR = styled(Container)<{ complete: boolean }>`
  transition: all 2s linear;
  ${({ complete, theme }) =>
    complete ? `background-color: ${theme.surface};` : ''}
`

const BgC = styled(Bg)<{ visible: boolean }>`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 2s linear;
`

const p = keyframes`
  0%   { opacity: 0; }
  50% {opacity: 1;}
  100% { opacity: 0; }
`

const BgPulse = styled(Bg)`
  animation: ${p} 10s ease-in-out infinite;
`

const InnerWrap = styled.div`
  margin-top: 100px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const r = keyframes`
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const PizzaImg = styled(Img)<{ visible: boolean; rounding: boolean }>`
  transition: all 3s ease;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  ${({ rounding }) =>
    rounding
      ? css`
          animation: ${r} 10s ease-in-out infinite;
        `
      : ''}
`

export default ContributingPage
