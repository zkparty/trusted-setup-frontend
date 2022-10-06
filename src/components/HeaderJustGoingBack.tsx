import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../routes'
import LeftArrow from '../assets/left-arrow.svg'

const HeaderJustGoingBack = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <LeftSection onClick={() => navigate(ROUTES.ROOT)}>
        <img src={LeftArrow} alt="go back" />
      </LeftSection>
    </Container>
  )
}

const Container = styled.header`
  background-color: ${({ theme }) => theme.surface2};
  height: 80px;
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
