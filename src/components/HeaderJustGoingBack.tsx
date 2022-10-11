import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../routes'
import LeftArrow from '../assets/left-arrow.svg'
import { FONT_SIZE } from '../constants'
import { textSerif } from '../style/utils'

const HeaderJustGoingBack = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <LeftSection onClick={() => navigate(ROUTES.ROOT)}>
        <img src={LeftArrow} alt="go back" />

      </LeftSection>
      <CenterSection>
        TESTNET CEREMONY
      </CenterSection>
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

const CenterSection = styled.div`
  display: flex;
  color: #3E70BC;
  align-items: start;
  font-size: ${FONT_SIZE.XXL};
  ${textSerif}
  font-weight: 500;
  letter-spacing: 2px;
`

export default HeaderJustGoingBack
