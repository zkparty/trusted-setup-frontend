import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  SingleButtonSection,
  TextSection,
  InnerWrap,
  Over,
} from '../components/Layout'
import ROUTES from '../routes'
import { useState } from 'react'
import ErrorMessage from '../components/Error'
import { Trans, useTranslation } from 'react-i18next'
import LoadingSpinner from '../components/LoadingSpinner'
import HeaderJustGoingBack from '../components/HeaderJustGoingBack'


const DoubleSignPage = () => {
  const [error, setError] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleClickSign = async () => {
    setError(null)
    setIsLoading(true)
    // eslint-disable-next-line no-restricted-globals
    navigate(ROUTES.DOUBLE_SIGN_IFRAME)
    //await signPotPubkeysWithECDSA()
  }

  return (
    <>
      <HeaderJustGoingBack />
      <Over>
        <Container>
          <Wrap>
            <InnerWrap>
              <PageTitle>
                <Trans i18nKey="doubleSign.title">
                  Bind your <br /> Contribution
                </Trans>
              </PageTitle>
              <TextSection>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Trans i18nKey="doubleSign.description">
                  <Description>
                    This signature binds each Summoner’s entropy contribution to
                    their Ethereum address.
                  </Description>
                </Trans>
              </TextSection>
              <ButtonSection>
                {isLoading ?
                  <LoadingSpinner></LoadingSpinner>
                  :
                  <PrimaryButton onClick={handleClickSign} disabled={isLoading}>
                    <Trans i18nKey="doubleSign.button">
                      Sign
                    </Trans>
                  </PrimaryButton>
                }
              </ButtonSection>
            </InnerWrap>
          </Wrap>
        </Container>
      </Over>
    </>
  )
}

const ButtonSection = styled(SingleButtonSection)`
  margin-top: 12px;
  height: auto;
`

export default DoubleSignPage
