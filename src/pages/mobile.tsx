import ROUTES from '../routes'
import { useEffect } from 'react'
import { isMobile } from '../utils'
import Logo from '../components/Logo'
import styled from 'styled-components'
import { FONT_SIZE } from '../constants'
import { useNavigate } from 'react-router-dom'
import { Description } from '../components/Text'
import { Trans, useTranslation } from 'react-i18next'
import EthLogoImg from '../assets/eth-logo-purple.svg'
import { SingleContainer, InnerWrap } from '../components/Layout'

const MobilePage = () => {
  useTranslation()
  const navigate = useNavigate()

  // check useragent and if user agent isn't mobile,
  // redirect to landing page
  useEffect(() => {
    const mobile = isMobile()
    if (!mobile) {
      navigate(ROUTES.ROOT)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Container>
      <Logo withVersion />
    <InnerWrap>
      <Section>
        <EthLogo src={EthLogoImg} />
        <Desc>
          <Trans i18nKey="mobile.description">
            Ceremony contributions are only possible in the desktop setting. See
            you there!
          </Trans>
        </Desc>
      </Section>
      </InnerWrap>
    </Container>
  )
}

const Container = styled(SingleContainer)`
  padding: 12px 24px;
`

const Desc = styled(Description)`
  font-size: ${FONT_SIZE.M};
  line-height: 1.6;
  text-align: center;
`

const EthLogo = styled.img`
  margin-bottom: 36px;
`

const Section = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 120px;
`

export default MobilePage
