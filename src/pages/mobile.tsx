import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { SingleContainer } from '../components/Layout'
import Logo from '../components/Logo'
import { PageTitle, Description } from '../components/Text'
import ROUTES from '../routes'
import { isMobile } from '../utils'

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
      <Logo inverse />

      <Section>
        <Title>KZG Ceremony</Title>
        <Description>
          This experience only avaliable on the desktop setting. See you there.
        </Description>
      </Section>
    </Container>
  )
}

const Container = styled(SingleContainer)`
  padding: 12px 24px;
`

const Section = styled.div`
  position: absolute;
  bottom: 40px;
`

const Title = styled(PageTitle)`
  color: ${({ theme }) => theme.onPrimary};
  margin-top: 0;
  font-size: 54px;
  line-height: 54px;
`

export default MobilePage
