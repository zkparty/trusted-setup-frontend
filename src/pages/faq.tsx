// Import libraries
import styled from "styled-components"
// Import components
import FaqItem from "../components/FaqItem"
import ExternalLink from "../components/ExternalLink"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { PageTitle } from "../components/Text"
import { Trans } from 'react-i18next'

// FAQ question array
const faqQuestions = [
  {
    title: <Trans i18nKey="faq.q1.title">How do I contribute randomness to the Ceremony?</Trans>,
    content: (
      <Trans i18nKey="faq.q1.content">
        The Ethereum Foundation is hosting an interface at <ExternalLink href="https://ceremony.ethereum.org/">ceremony.ethereum.org</ExternalLink> during the public contribution period from X date to Y date. If you'd like an alternative to the hosted interface, you are welcome to contribute via a <ExternalLink href="https://github.com/crate-crypto/kzg-ceremony-cli.git">CLI</ExternalLink>. After this public contribution period, we will accept special contributions from bespoke <ExternalLink href="https://github.com/ethereum/kzg-ceremony#client-implementations">implementations</ExternalLink> or unique randomness generation. Funding is available for both of these, more information will be shared in the coming weeks.
      </Trans>
    ),
  },
  {
    title: <Trans i18nKey="faq.q2.title">What does KZG stand for?</Trans>,
    content: (
      <Trans i18nKey="faq.q2.content">
        KZG comes from Kate, Zaverucha, and Goldberg. These are the author surnames from the paper <ExternalLink href="https://www.iacr.org/archive/asiacrypt2010/6477178/6477178.pdf">"Constant-Size Commitments to Polynomials and Their Applications"</ExternalLink>, which outlines the underlying cryptographic mechanism that the Ethereum ceremony plans to utilize.
      </Trans>
    ),
  },
  {
    title: <Trans i18nKey="faq.q3.title">What happens during a Ceremony?</Trans>,
    content: (
      <Trans i18nKey="faq.q3.content">
        <ol>
          <li>A Summoner runs a computation using three random inputs (aka secrets) they provide. Three different kinds of secrets are required in this Ceremony: text, cursor movements, and browser generated.</li>
          <li>The output of that computation is then passed to the Sequencer - a coordinating server which orchestrates transfers between participants.</li>
          <li>The Sequencer passes the computation from step two to the next summoner, who is waiting to start. This participant computes an output using their secret inputs, and combines it with the work from Summoner 1. At this point the cycle starts again.</li>
        </ol>
        <p>While it’s important that summoners discard the random secrets they use, the Ceremony only requires one honest participant to do so. As long as one person does this, observers can be sure that the final output can never be fully reverse engineered or corrupted.</p>
        <p>Here's another framing from the <ExternalLink href="https://hackmd.io/@6iQDuIePQjyYBqDChYw_jg/SJ-08AoT5">Cryptography Rationale</ExternalLink>:</p>
        <blockquote>
          For EIP-4844, Ethereum needs four different Structured Reference Strings (SRS) each of different sizes. Each SRS has a secret associated with it. For security, the SRS’s must be computed in such a way that no single person knows the secret associated with them. The solution is to have multiple people contribute to the secret. If all of these people collude, then they can recover the secret. If even one person does not collude, then the secret is unrecoverable. The process of multiple people contributing to the secret is known as a ceremony.
        </blockquote>
      </Trans>
    )
  },
  {
    title: <Trans i18nKey="faq.q4.title">Couldn’t another commitment scheme without a "trusted setup" be used?</Trans>,
    content: (
      <Trans i18nKey="faq.q4.content">
        Using anything other than KZG (eg. IPA or SHA256) would make the sharding roadmap much more difficult. Learn more from Vitalik's <ExternalLink href="https://notes.ethereum.org/@vbuterin/proto_danksharding_faq#Couldn%E2%80%99t-we-use-some-other-commitment-scheme-without-a-trusted-setup">Proto-Danksharding FAQ</ExternalLink>.
      </Trans>
    ),
  },
  {
    title: <Trans i18nKey="faq.q5.title">What is the Sequencer and what does it do?</Trans>,
    content: (
      <Trans i18nKey="faq.q5.content">
        <p>
          The Sequencer is a server hosted by the Ethereum Foundation which coordinates contributions. It keeps track of who is trying to contribute, serves them the necessary data to download, and takes each contribution.
        </p>
        <p>
          You don't have to trust the Sequencer to produce a biased or invalid final output. The <ExternalLink href="#LINK">transcript</ExternalLink> provides a verifiable record of all randomness contributions. As long as there is one honest participant who doesn't record their randomness, the secret cannot be reconstructed.
        </p>
      </Trans>
    ),
  },

  {
    title: <Trans i18nKey="faq.q6.title">How can the Ceremony be compromised? What attacks are possible in this situation?</Trans>,
    content: <Trans i18nKey="faq.q6.content">TODO</Trans>,
  },
  {
    title: <Trans i18nKey="faq.q7.title">How long does it take to contribute?</Trans>,
    content: <Trans i18nKey="faq.q7.content">It should only take a few minutes to complete the contribution on a standard laptop and internet connection.</Trans>,
  },
  {
    title: <Trans i18nKey="faq.q8.title">How can I verify the final Ceremony output?</Trans>,
    content: (<Trans i18nKey="faq.q8.content">By reading the <ExternalLink href="#LINK">transcript</ExternalLink>.</Trans>),
  },
  {
    title: <Trans i18nKey="faq.q9.title">Why can't I contribute on a mobile device?</Trans>,
    content: <Trans i18nKey="faq.q9.content">The Ceremony isn't optimized for the mobile environment.</Trans>,
  },
]
// FAQ section component
const FaqPage = () => (
  <>
    <Header />
    <FaqSection>
      <PageTitle id="faq">FAQ</PageTitle>
      {faqQuestions.map(({ title, content }, index) => (
        <FaqItem key={index} title={title} content={content} />
        ))}
    </FaqSection>
    <Footer />
  </>
)

// Styled components
const FaqSection = styled.section`
  padding-block: 8rem;
  width: 90ch;
  max-width: 100%;
  margin: 0 auto;
`

export default FaqPage