import { useState } from 'react'
import styled from 'styled-components'
import { FONT_SIZE } from '../constants'
import { textSerif } from '../style/utils'

type Props = {
  title: string
  content: string
}

const FaqItem = ({ title, content }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <Container onClick={() => setOpen(!open)}>
      <Title>
        <span>{title}</span>
        <span>{open ? '-' : '+'}</span>
      </Title>
      {open && <Content>{content}</Content>}
    </Container>
  )
}

const Container = styled.div`
  border-bottom: solid 1px ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: background-color 0.1s linear;

  :hover {
    background-color: #d6d6d6;
  }
`

const Title = styled.p`
  font-size: ${FONT_SIZE.XXL};
  font-weight: 600;
  ${textSerif}
  display: flex;
  justify-content: space-between;
`

const Content = styled.p``

export default FaqItem
