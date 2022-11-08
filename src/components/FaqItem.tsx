import { useState } from 'react'
import styled from 'styled-components'
import { FONT_SIZE } from '../constants'
import { textSerif } from '../style/utils'

type Props = {
  title: string
  content: string | React.ReactNode | JSX.Element
}

const FaqItem = ({ title, content }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <Container>
      <Title onClick={() => setOpen((prev) => !prev)} open={open}>
        {title}
      </Title>
      {open && <Content>{content}</Content>}
    </Container>
  )
}

const Container = styled.div`
  border-bottom: solid 1px ${({ theme }) => theme.primary};
  transition: background-color 0.1s linear;
  padding: 1rem 2rem;
  :hover {
    background-color: #d6d6d6;
  }
`

const Title = styled.p<{ open: boolean }>`
  font-size: ${FONT_SIZE.XXL};
  font-weight: 600;
  ${textSerif}
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 1rem;
  margin-block: 0;
  :hover {
      cursor: pointer;
  }
  ::after {
    content: "${({ open }) => open ? '-' : '+'}";
  }
`

const Content = styled.div`
  ol, li {
    margin-block-end: 0.5rem;
  }
  blockquote {
    border-inline-start: 2px solid ${({ theme }) => theme.disabled};
    margin-inline: 1.5rem;
    padding-inline: 1rem;
  }
  a {
    text-decoration: underline;
  }
`

export default FaqItem
