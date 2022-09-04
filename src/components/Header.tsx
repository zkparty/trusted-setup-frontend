import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from './Button'
import { LinkText } from './Text'
import ROUTES from '../routes'
import Logo from '../assets/logo.svg'
import { textSerif } from '../style/utils'
import { FONT_SIZE } from '../constants'

const Header = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <LogoSection>
        <img src={Logo} alt="Logo" />
        <LogoTextGroup>
          <LogoTextMain>KZG</LogoTextMain>
          <LogoTextMain>Ceremony</LogoTextMain>
          <LogoTextSub>Alpha</LogoTextSub>
        </LogoTextGroup>
      </LogoSection>
      <ButtonGroup>
        <LinkText to={ROUTES.RECORD}>Record</LinkText>
        <PrimaryButton onClick={() => navigate(ROUTES.SIGNIN)}>
          Sign in
        </PrimaryButton>
      </ButtonGroup>
    </Container>
  )
}

const Container = styled.header`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LogoSection = styled.div`
  display: flex;
  align-items: center;
`

const LogoTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`

const LogoTextMain = styled.span`
  font-size: ${FONT_SIZE.M};
  font-weight: 600;
  ${textSerif};
  line-height: 14px;
`

const LogoTextSub = styled.span`
  font-size: ${FONT_SIZE.XS};
  color: #494e53;
  ${textSerif};
`

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
`

export default Header
