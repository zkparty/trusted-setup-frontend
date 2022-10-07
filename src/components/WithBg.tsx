import React from 'react'

type Props = {
  children: React.ReactNode
}

const WithBg = ({ children }: Props) => {
  return <div>{children}</div>
}

export default WithBg
