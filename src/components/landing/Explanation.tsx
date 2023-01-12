import { isMobile } from '../../utils'
import styled from 'styled-components'
import { TextSection } from '../Layout'
import { Trans, useTranslation } from 'react-i18next'
import { Description, PageTitle } from '../Text'
import ExplanationBorder from '../../assets/explanation-border.svg'


const Explanation = ({ refFromLanding }: any) => {
  useTranslation()

  return (
    <SecondSection id="explanation" ref={refFromLanding}>
      <WhiteBackground>
      <PageTitle>
        <Trans i18nKey="explanation.title">
          PROTO-DANKSHARDING <br /> AND THE CEREMONY
        </Trans>
      </PageTitle>
      <Container>

      <SecondTextSection>
        <Trans i18nKey="explanation.description">
          <Description>
          Proto-danksharding (aka EIP-4844) is a planned change to the
          Ethereum protocol which introduces ephemeral data storage.
          Because the data does not need to be stored by the network forever,
          it will be cheaper to use than on-chain storage (i.e. CALLDATA).
          Rollups (Layer 2s) can use this storage to post transaction data or
          proofs back to Layer 1 (mainnet). The benefits are lower transaction
          fees on the L2, greater scalability and more accessibility
          to more people!
          </Description>
          <Description>
          Proto-danksharding requires a new cryptographic scheme: KZG
          Commitments. This ceremony, sometimes called a "Trusted Setup",
          will generate a structured reference string (SRS) which is needed
          for the commitments to work. An SRS is secure as long as one
          participant in the ceremony successfully conceals their secret.
          </Description>
          <Description>
          It's a multi-party ceremony: each contributor creates a secret
          and runs a computation to mix it with previous contributions.
          Then, the output is made public and passed to the next contributor.
          To guard against attempts to corrupt the ceremony, participants
          need an Ethereum address or GitHub account with an established
          history to participate. The final output of the Ceremony will
          be included in a future upgrade to help scale
          the Ethereum network.
          </Description>
        </Trans>
      </SecondTextSection>

      </Container>
      </WhiteBackground>
    </SecondSection>
  )
}

const Container = styled.div`
  display : ${ isMobile() ? '' : 'flex'};
  justify-content: center;
  height: 100%;
  width: 100%;
`

const WhiteBackground = styled.div`
  background: white;
  width: 100%;
  padding-block: 5vh;
  padding-inline: 1vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SecondSection = styled.section`
  width: 64ch;
  max-width: 100%;
  margin: 0 auto;
  margin-bottom: 5rem;

  border: min(4vw,5rem) solid;
  border-image-source: url(${ExplanationBorder});
  border-image-slice: 55;
  border-image-repeat: round;

  box-sizing: border-box;
`

const SecondTextSection = styled(TextSection)`
  margin-top: 40px;
  width: 55ch;
`

export default Explanation
