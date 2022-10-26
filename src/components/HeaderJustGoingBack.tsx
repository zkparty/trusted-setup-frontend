import ROUTES from '../routes'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import LeftArrow from '../assets/left-arrow.svg'
import LanguageSelector from './LanguageSelector'

const HeaderJustGoingBack = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <LeftSection onClick={() => navigate(ROUTES.ROOT)}>
        <img src={LeftArrow} alt="go back" />
      </LeftSection>
      <LanguageSelector></LanguageSelector>
    </Container>
  )
}

const Container = styled.header`
  z-index: 3;
  position: absolute;
  top: 0;
  width: 100vw;
  background-color: ${({ theme }) => theme.surface2};
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
`

const LeftSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

export default HeaderJustGoingBack
