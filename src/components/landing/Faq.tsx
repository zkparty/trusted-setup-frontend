import FaqItem from './FaqItem'
import { PageTitle } from '../Text'
import { Trans } from 'react-i18next'
import styled from 'styled-components'
import ExternalLink from '../ExternalLink'
import { START_DATE, END_DATE } from '../../constants'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [from, to] = [START_DATE, END_DATE].map((date: string) =>
  new Date(date).toLocaleDateString()
)

// FAQ question array
const faqQuestions = [
  {
    title: (
      <Trans i18nKey="faq.q1.title">
        What is EIP-4844, a.k.a. Proto-Danksharding, and how does it relate to
        scaling Ethereum
      </Trans>
    ),
    content: (
      <Trans i18nKey="faq.q1.content">
        <p>
          The Ethereum community is scaling to global accessibility through{' '}
          <ExternalLink href="https://ethereum.org/en/layer-2/">
            Layer-2s (L2s)
          </ExternalLink>
          . L2s increase the total block space available to users while still
          maintaining the security offered by the Ethereum Layer 1 (L1).
        </p>
        <p>
          L2s need to publish a lot of data on Ethereum, and the network
          currently charges high fees for doing so. To fix this, Ethereum will
          create a new data layer, often referred to as <em>sharding</em>. This
          provides what is called &quot;data availability&quot; guarantees to L2
          users. The L1 only holds the data for a limited time, which means we
          can scale the chain without sacrificing decentralization for smaller
          L1 node operators.
        </p>
        <p>
          The current leading design for this is called Danksharding. The
          rollout for this will happen in several steps, with the first one
          being{' '}
          <ExternalLink href="https://www.eip4844.com/">EIP-4844</ExternalLink>,
          also known as ProtoDanksharding.{' '}
        </p>
      </Trans>
    )
  },
  {
    title: (
      <Trans i18nKey="faq.q2.title">
        What is a Summoning Ceremony?
      </Trans>
    ),
    content: (
      <Trans i18nKey="faq.q2.content">
        <p>
          Ceremonies use secret inputs to produce an output in a way that makes
          it impossible to reverse-engineer and discover the initial secrets.{' '}
        </p>
        <p>Here&#39;s a very brief summary of how they work: </p>
        <ol>
          <li>
            Participant 1 chooses a random number (eg 5.) and then runs a
            computation on it.
          </li>
          <li>
            The output from that computation is passed to Participant 2, where
            they repeat Step 1 with their own secret input (e.g. 3) and mix it
            with the output from the 1st Participant (eg. 5x3=15).
          </li>
          <li>
            This repeats until there is a sufficient number of participants, at
            which point the last output in the sequence becomes the final
            output.
          </li>
        </ol>
        <p>
          Ceremonies have also been called &quot;Trusted Setups,&quot; most
          famously used by Zcash to bootstrap their privacy features. However,
          it can also be used to add scalability mechanisms, as Ethereum is
          doing.
        </p>
        <p>
          <ExternalLink href="https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/">
            Carl Beekhuizen&#39;s Devcon Talk
          </ExternalLink>{' '}
          on this Ceremony explains both simply and in-depth how and why this
          ceremony works. Or, you can explore the{' '}
          <ExternalLink href="https://github.com/ethereum/kzg-ceremony-specs/">
            ceremony specs
          </ExternalLink>{' '}
          to really dig into the nitty-gritty, and potentially write your own
          implementation.
        </p>
      </Trans>
    )
  },
  {
    title: (
      <Trans i18nKey="faq.q3.title">
        Why does (Proto)-Danksharding need a Ceremony?
      </Trans>
    ),
    content: (
      <Trans i18nKey="faq.q3.content">
        <p>
          (Proto)-Danksharding requires a commitment scheme for the underlying
          data that is fast to prove and verify (including inside SNARKS for
          SNARK-based L2s) while having a small commitment size. The polynomial
          commitment scheme that best meets the criteria is KZG commitments.
        </p>
        <p>
          The KZG scheme commits to a polynomial by evaluating it at a secret
          value (specifically, a elliptic curve point). The point of this
          ceremony is to construct this secret value in a way that no single
          person knows what this secret is and to do so in a way where many
          people are convinced that no-one knows it even in many years time.
        </p>
      </Trans>
    )
  },
  {
    title: (
      <Trans i18nKey="faq.q4.title">How do I contribute to the Ceremony?</Trans>
    ),
    content: (
      <Trans i18nKey="faq.q4.content">
        <p>
          Right here on this site, you can sign in with your Ethereum address or
          Github account to participate, it should take less that 5 minutes of
          your time.
        </p>
        <p>
          If you&#39;d like an alternative to this interface, there are several
          other CLIs and webpages available (links + IPFS). After this public
          contribution period, we will accept special contributions from bespoke{' '}
          <ExternalLink href="https://github.com/ethereum/kzg-ceremony#client-implementations">
            implementations
          </ExternalLink>{' '}
          or unique randomness generation. Funding is available for both of
          these, more information will be shared in the coming weeks.
        </p>
      </Trans>
    )
  },
  {
    title: (
      <Trans i18nKey="faq.q5.title">
        What does KZG stand for?
      </Trans>
    ),
    content: (
      <Trans i18nKey="faq.q5.content">
        <p>
          KZG comes from Kate, Zaverucha, and Goldberg. These are the author
          surnames from the paper{' '}
          <ExternalLink href="https://www.iacr.org/archive/asiacrypt2010/6477178/6477178.pdf">
            &quot;Constant-Size Commitments to Polynomials and Their
            Applications&quot;
          </ExternalLink>
          , which outlines the underlying cryptographic mechanism that EIP-4844
          plans to utilize.
        </p>
        <p>
          To dive deep into the cryptography of KZG commitments,{' '}
          <ExternalLink href="https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html">
            Dankrad Feist&#39;s blog post
          </ExternalLink>{' '}
          is a good starting point.
        </p>
      </Trans>
    )
  },
  {
    title: (
      <Trans i18nKey="faq.q6.title">What happens during this Ceremony?</Trans>
    ),
    content: (
      <Trans i18nKey="faq.q6.content">
        <p>This interface will walk you through the following steps:</p>
        <ol>
          <li>You provide random inputs from three different sources.</li>
          <li>Log in with Ethereum or Github to prevent spam.</li>
          <li>
            Ask the Sequencer if you may participate. When it&#39;s your turn,
            the Sequencer will send you the &quot;Powers of Tau&quot; data.
          </li>
          <li>
            Your computer will mix your randomness into the Powers of Tau and
            when completed, send it back to the Sequencer.
          </li>
          <li>
            The Sequencer will verify that your computer did everything
            correctly and pass the Powers of Tau on to the next participant.
          </li>
        </ol>
        <p>
          After the ceremony is completed, you should return to verify that your
          contribution was indeed included in the final transcript.
        </p>
      </Trans>
    )
  },
  {
    title: (
      <Trans i18nKey="faq.q7.title">
        What are the Powers of Tau?
      </Trans>
    ),
    content: (
      <Trans i18nKey="faq.q7.content">
        <p>
          The name &quot;Powers of Tau&quot; comes from the cryptography
          literature on trusted setups and SRSs.
        </p>
        <p>
          &quot;Tau&quot; comes from the Greek letter &#964; which is the
          short-hand for the &quot;secret&quot; referred to in this
          documentation.
        </p>
        <p>
          &quot;Powers&quot; refers to the fact that we need not only the
          secret, but also the consecutive powers of the secret. (ie. [1,
          &#964;, &#964;<sup>2</sup>, &#964;<sup>3</sup>,..., &#964;
          <sup>
            2<sup>12-1</sup>
          </sup>
          ])
        </p>
        <p>
          It is worth noting that the Powers of Tau are not raw numbers, but
          they are encoded as elliptic curve points which &quot;encrypts&quot;
          and therefore hides them.
        </p>
      </Trans>
    )
  },
  {
    title: (
      <Trans i18nKey="faq.q8.title">
        What is the Sequencer and what does it do?
      </Trans>
    ),
    content: (
      <Trans i18nKey="faq.q8.content">
        <p>
          The Sequencer is a server hosted by the Ethereum Foundation which
          coordinates contributions. It keeps track of who is trying to
          contribute, serves them the necessary data to download, and verifies
          each contribution before sending the data to the next participant.
        </p>
        <p>
          You don&#39;t have to trust the Sequencer to produce a biased or
          invalid final output. The{' '}
          <ExternalLink href="https://sequencer.ethereum.org/info/current_state">
            transcript
          </ExternalLink>{' '}
          provides a verifiable record of all randomness contributions that you
          can verify for yourself.
        </p>
      </Trans>
    )
  },
  {
    title: (
      <Trans i18nKey="faq.q9.title">
        Couldn’t another commitment scheme without a "trusted setup" be used?
      </Trans>
    ),
    content: (
      <Trans i18nKey="faq.q9.content">
        <p>
          Using anything other than KZG (eg. IPA or SHA256) would make the
          sharding roadmap much more difficult. Learn more from Vitalik&#39;s{' '}
          <ExternalLink href="https://notes.ethereum.org/@vbuterin/proto_danksharding_faq#Couldn%E2%80%99t-we-use-some-other-commitment-scheme-without-a-trusted-setup">
            Proto-Danksharding FAQ
          </ExternalLink>
          .
        </p>
      </Trans>
    )
  },
  {
    title: (
      <Trans i18nKey="faq.q10.title">
        What needs to go wrong for the safety of the ceremony to break?
      </Trans>
    ),
    content: (
      <Trans i18nKey="faq.q10.content">
        <p>
          The ceremony has a &quot;1-of-N&quot; trust assumption, which means
          that only a single participant in the entire ceremony needs to have
          not revealed their secret input for everything to be secure.
        </p>
        <p>
          This means that every participant would have to strip apart the
          software that they are using to contribute, get that software to give
          them the secret, and then collude with every single other participant
          to reconstruct the final secret.
        </p>
        <p>
          A more realistic failure mode is a common bug which leaks the
          randomness. To combat this, this site has been audited and there are
          alternative implementations of the contribution software built on
          entirely different software stacks.
        </p>
        <p>
          This is why there will be thousands of participants using different
          pieces of software on different operating systems to help prevent
          single points of failure both in the people and hardware/software.
        </p>
      </Trans>
    )
  },
  {
    title: (
      <Trans i18nKey="faq.q11.title">
        What attacks are possible in this situation?
      </Trans>
    ),
    content: (
      <Trans i18nKey="faq.q11.content">
        <p>
          Should the secret somehow be extracted from the Powers of Tau, an
          attacker would be able to make arbitrary claims about the data in
          EIP-4844. This effectively would break all services &amp; applications
          dependent on EIP-4844 blob data.
        </p>
      </Trans>
    )
  },
  {
    title: (
      <Trans i18nKey="faq.q12.title">
        How long does it take to contribute?
      </Trans>
    ),
    content: (
      <Trans i18nKey="faq.q12.content">
        <p>
          Depending on how many others are trying to contribute at the same
          time, you could end up waiting a while for your turn to come up to
          contribute. Once it is your turn, it should only take less than 3
          minutes to complete the contribution with a standard laptop and
          internet connection.
        </p>
      </Trans>
    )
  },
  {
    title: (
      <Trans i18nKey="faq.q13.title">
        Why do I need to sign in with Ethereum or GitHub?
      </Trans>
    ),
    content: (
      <Trans i18nKey="faq.q13.content">
        <p>
          In order to reduce Sybil attacks against the Ceremony, the Sequencer
          needs to verify that you are a (somewhat) unique human otherwise one
          person could submit many different contributions preventing others
          from getting a turn to contribute.
        </p>
        <ul>
          <li>
            Sign in with Ethereum - This is the preferred choice as it something
            that all Ethereum community members should already have and it
            allows signatures for later verification of the contribution. Each
            account is required to have sent at least 3 transactions to prevent
            spinning up new accounts just for this ceremony.
          </li>
          <li>
            Sign in with GitHub - This option is offered as an alternative for
            those who are more distant to the community but who&#39;d still like
            to participate.
          </li>
        </ul>
      </Trans>
    )
  },
  {
    title: (
      <Trans i18nKey="faq.q14.title">
        How do I know my contribution was included?
      </Trans>
    ),
    content: (
      <Trans i18nKey="faq.q14.content">
        <p>
          When this ceremony is over, you should review the ceremony transcript
          (which will be hosted on this site as well as being widely available
          on the internet). This transcript will contain all the necessary data
          to verify who participated.
        </p>
        <p>
          If you used your Ethereum address to sign-in, then there will be
          cryptographic proof that you participated via a signed message from
          your account.
        </p>
      </Trans>
    )
  },
  {
    title: (
      <Trans i18nKey="faq.q15.title">
        How can I verify the final Ceremony output?
      </Trans>
    ),
    content: (
      <Trans i18nKey="faq.q15.content">
        <p>
          After this ceremony is over it is important for the community to
          verify that the ceremony ran correctly, this is comprised of two
          components:
        </p>
        <ul>
          <li>
            Verifying that either you or enough people you trust actually
            participated, by checking their identities appear in the transcript.
          </li>
          <li>
            Verifying that the transcript was constructed correctly including
            all the witnesses (proofs of correct contribution) and that the
            Powers of Tau are indeed powers.
          </li>
        </ul>
      </Trans>
    )
  },
  {
    title: (
      <Trans i18nKey="faq.q16.title">
        Why can't I contribute on a mobile device?
      </Trans>
    ),
    content: (
      <Trans i18nKey="faq.q16.content">
        <p>
          While the processing power of some mobile devices is sufficient to
          participate in this ceremony, many mobile browsers don&#39;t handle
          WASM well, lock the screen and otherwise downclock the CPU before the
          computation could complete, and generally there a lot of variance
          between devices which is hard to account for.
        </p>
      </Trans>
    )
  }
]
// FAQ section component
const FaqPage = () => (
  <FaqSection>
    <PageTitle id="faq">FAQ</PageTitle>
    {faqQuestions.map(({ title, content }, index) => (
      <FaqItem key={index} title={title} content={content} />
    ))}
  </FaqSection>
)

// Styled components
const FaqSection = styled.section`
  padding-bottom: 8rem;
  width: 55ch;
  max-width: 100%;
  margin: 0 auto;
`

export default FaqPage
