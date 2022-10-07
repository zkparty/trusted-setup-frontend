import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { SingleContainer } from '../components/Layout'
import Logo from '../components/Logo'
import EthLogoImg from '../assets/eth-logo-purple.svg'
import { PageTitle, Description } from '../components/Text'
import ROUTES from '../routes'
import { isMobile } from '../utils'
import { FONT_SIZE } from '../constants'

const MobilePage = () => {
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

      <Section>
        <EthLogo src={EthLogoImg} />
        <Desc>
          Ceremony contributions are only possible in the desktop setting. See
          you there!
        </Desc>
      </Section>
    </Container>
  )
}

const Container = styled(SingleContainer)`
  padding: 12px 24px;
`

const Desc = styled(Description)`
  font-size: ${FONT_SIZE.XS};
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
