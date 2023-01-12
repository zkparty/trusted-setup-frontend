import styled from 'styled-components'
import { textSerif } from '../../style/utils'
import { FONT_SIZE, ENVIRONMENT } from '../../constants'
import { Trans, useTranslation } from 'react-i18next'

const HeaderJustGoingBack = () => {
  useTranslation()

  return (<>{ ENVIRONMENT === 'testnet' ?
    <Container>
      { ENVIRONMENT === 'testnet' ?
        <Trans i18nKey="header.ceremony">TEST CEREMONY</Trans>
        :
        <></>
      }
    </Container>
    :
    ''
    }
    </>)
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
  padding: 0 24px;
  color: #3e70bc;
  ${textSerif}
  font-weight: 800;
  letter-spacing: 2px;
  justify-content: center;
  font-size: ${FONT_SIZE.XXL};
`

export default HeaderJustGoingBack
