import styled from 'styled-components'

type ExternalLinkProps = {
  href: string
  children: React.ReactNode
}

const ExternalLink = ({ href, children }: ExternalLinkProps) => (
  <ArrowLink href={href} target="_blank" rel="noreferrer noopener">
    {children}
  </ArrowLink>
)

const ArrowLink = styled.a`
  ::after {
    content: "↗";
    font-size: 0.875em;
  }
`

export default ExternalLink