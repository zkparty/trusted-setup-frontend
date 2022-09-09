import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FONT_SIZE } from '../constants'
import { textSerif } from '../style/utils'

const PageTitle = styled.h1`
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  font-size: ${FONT_SIZE.HERO};
  line-height: 153px;
  ${textSerif}
  font-weight: 700;
  margin-top: 200px;
  margin-bottom: 24px;
`

const SectionTitle = styled.h2`
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  font-size: ${FONT_SIZE.HERO};
  line-height: 153px;
  ${textSerif}
  font-weight: 700;
  margin: 24px 0;
  overflow-wrap: break-word;
`

const Description = styled.p`
  font-weight: 400;
  font-size: ${FONT_SIZE.L};
`

const LinkText = styled(Link)`
  color: ${({ theme }) => theme.primary};
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-weight: 600;
  font-size: ${FONT_SIZE.L};
  line-height: 24px;
  padding-bottom: 4px;
  :hover {
    border-bottom: solid 2px ${({ theme }) => theme.primary};
  }
  transition: all 0.2s ease;
`

export { PageTitle, SectionTitle, Description, LinkText }
