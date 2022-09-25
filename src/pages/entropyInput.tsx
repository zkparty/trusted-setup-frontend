import { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useEntropy } from '../hooks/useEntropy'
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
  const updateEntropy = useEntropy((state: any) => state.updateEntropy)
  const handleSubmit = () => {
    // do submit the entropy and add to the queue
    updateEntropy(entropy)
    navigate(ROUTES.LOBBY)
  }

  return (
    <Container>
      <Wrap>
        <Logo inverse />
        <Title>Entropy & sorcery.</Title>
        <Desc>
        To conjure the magic, sacrifice is necessary. You are required to offer a secret. Consider something important, like a hint of a memory or the name of someone dear. Bring this offering to the altar and then join the others in the hallway.
        </Desc>
        <Input onChange={(e) => setEntropy(e.target.value)} />
        <Footnote>
        You can also move your cursor around on this screen.
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
