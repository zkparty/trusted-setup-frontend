import { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { PrimaryButtonLarge } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import {
  SingleContainer as Container,
  SingleWrap as Wrap
} from '../components/Layout'
import Logo from '../components/Logo'
import { textSerif } from '../style/utils'
import ROUTES from '../routes'
import { FONT_SIZE } from '../constants'

const EntropyInputPage = () => {
  // TODO: add validation

  const navigate = useNavigate()
  const [entropy, setEntropy] = useState('')
  const handleSubmit = () => {
    // do submit the entropy and add to the queue
    console.log('entropy', entropy)
    navigate(ROUTES.LOBBY)
  }

  return (
    <Container>
      <Wrap>
        <Logo inverse />
        <Title>Entropy & sorcery.</Title>
        <Desc>
          You are the one put the sorcery in work, input what’s in your mind to
          compose the spell so you can join others in the hallway.
        </Desc>
        <Input onChange={(e) => setEntropy(e.target.value)} />
        <Footnote>
          Ideas for you: Name of the love ones, most memorable things you did to
          anything.
        </Footnote>
        <ButtonSection>
          <PrimaryButtonLarge inverse onClick={handleSubmit}>
            Enter hallway
          </PrimaryButtonLarge>
        </ButtonSection>
      </Wrap>
    </Container>
  )
}

const Title = styled(PageTitle)`
  color: ${({ theme }) => theme.onPrimary};
  margin-top: 0;
`

const Desc = styled(Description)`
  color: ${({ theme }) => theme.onPrimary};
`

const Footnote = styled(Description)`
  color: ${({ theme }) => theme.onPrimary};
  font-size: ${FONT_SIZE.S};
`

const Input = styled.input`
  ${textSerif};
  font-size: 32px;
  padding: 8px 16px;
  border: solid 1px ${({ theme }) => theme.onPrimary};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.onPrimary};
  width: 100%;
`

const ButtonSection = styled.div`
  padding-bottom: 24px;
`

export default EntropyInputPage
