import styled from 'styled-components'

type ExternalLinkProps = {
  href: string
  children: React.ReactNode
  style?: React.CSSProperties
}

const ExternalLink = ({
  href,
  children,
  style,
  ...props
}: ExternalLinkProps) => (
  <ArrowLink
    href={href}
    target="_blank"
    rel="noreferrer noopener"
    style={style}
    {...props}
  >
    {children}
  </ArrowLink>
)

const ArrowLink = styled.a`
  ::after {
    content: '↗';
    font-size: 0.875em;
  }
`

export default ExternalLink
