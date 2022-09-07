import { useState } from 'react'
import styled from 'styled-components'
import { SingleContainer } from '../components/Layout'
import { PrimaryButtonLarge } from '../components/Button'
import Logo from '../components/Logo'
import GateImg from '../assets/gate.png'
import { textSerif } from '../style/utils'
import { FONT_SIZE } from '../constants'

const GatePage = () => {
  const [passcode, setPasscode] = useState('')
  const handleSubmit = () => {
    console.log(passcode)
  }

  return (
    <Container>
      <div>
        <Logo inverse />
      </div>
      <Body>
        <Img src={GateImg} alt="this is your gate" />
        <FormSection>
          <AskPasscode>
            Summoner,
            <br /> your passcode, please.
          </AskPasscode>
          <Input onChange={(e) => setPasscode(e.target.value)} />
          <PrimaryButtonLarge inverse onClick={handleSubmit}>
            Enter
          </PrimaryButtonLarge>
        </FormSection>
      </Body>
    </Container>
  )
}

const Container = styled(SingleContainer)`
  padding: 12px 24px;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Img = styled.img`
  height: 420px;
`

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const AskPasscode = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: ${FONT_SIZE.XXL};
  line-height: ${FONT_SIZE.XXL};
  ${textSerif}
`

const Input = styled.input`
  ${textSerif};
  font-size: 32px;
  padding: 8px 16px;
  border: solid 1px ${({ theme }) => theme.onPrimary};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.onPrimary};
  margin-bottom: 24px;
`

export default GatePage
