import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { css, keyframes } from 'styled-components'
import { useContributionStore, Store } from '../store/contribute'
import { useAuthStore } from '../store/auth'
import { Description, PageTitle } from '../components/Text'
import { PrimaryButton } from '../components/Button'
import { isSuccessRes, parseErrorMessage, sleep } from '../utils'
import ROUTES from '../routes'
import api from '../api'
import Explanation from '../components/Explanation'
import Footer from '../components/Footer'
import HeaderJustGoingBack from '../components/HeaderJustGoingBack'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
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
  | 'downloading'
  | 'calculating'
  | 'contributing'
  | 'completed'
  | 'error'

const ContributingPage = () => {
  const { sessionId } = useAuthStore()
  const {
    entropy,
    contribution,
    updateProofs,
    updateReceipt,
    updateSignature,
    updateNewContribution
  } = useContributionStore((state: Store) => ({
    entropy: state.entropy,
    contribution: state.contribution,
    updateProofs: state.updateProofs,
    updateReceipt: state.updateReceipt,
    updateSignature: state.updateSignature,
    updateNewContribution: state.updateNewContribution
  }))

  const [step, setStep] = useState<Steps>('downloading')
  const [error, setError] = useState<null | string>(null)
  const navigate = useNavigate()
  // downloading, calculating, contributing, completed, error

  useEffect(() => {
    ;(async () => {
      try {
        if (!sessionId || !contribution) {
          throw new Error('invalid sessionId or contribution')
        }

        setStep('calculating')

        const res = await api.contribute(
          sessionId!,
          contribution!,
          entropy,
          () => {
            setStep('contributing')
          }
        )
        if (isSuccessRes(res)) {
          setStep('completed')
          updateProofs(res.proofs)
          updateReceipt(res.receipt)
          updateSignature(res.signature)
          updateNewContribution(res.contribution)

          // TODO: check is done automatically or user start checking?
          await sleep(3000)
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
            {step === 'downloading' ? (
              <PageTitle>
                Spell
                <br />
                Preparation
              </PageTitle>
            ) : step === 'calculating' ? (
              <PageTitle>
                Spell
                <br />
                Activation
              </PageTitle>
            ) : step === 'contributing' ? (
              <PageTitle>
                Big
                <br />
                Calculation
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
              {step === 'downloading' ? (
                <>
                  <Description>
                    Your contribution has been accepted by the Sequencer. It
                    will be cast, and then combined with the others.
                  </Description>
                  <Description>
                    Getting the original contribution...
                  </Description>
                </>
              ) : step === 'calculating' ? (
                <>
                  <Description>
                    The Sequencer is using your random inputs to calculate
                    something.
                  </Description>
                  <Description>
                    Updating & producing the new contribution...
                  </Description>
                </>
              ) : step === 'contributing' ? (
                <>
                  <Description>Your spell is now part of ceremony.</Description>
                  <Description>
                    Returning the contribution to the sequencer & pass along to
                    the next summoners.
                  </Description>
                </>
              ) : step === 'completed' ? (
                <Description>
                  You have just succesfully complete the contribution. Don’t
                  forget to return for the summoning ending & spread the words.
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
