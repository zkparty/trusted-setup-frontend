import styled from 'styled-components'
import { RADIUS } from '../constants'

type Props = {
  percentage: number
}

const ProgressBar = ({ percentage }: Props) => {
  return (
    <Background>
      <Progress percentage={percentage} />
    </Background>
  )
}

const Background = styled.div`
  border-radius: ${RADIUS.M};
  height: 24px;
  width: 320px;
  background-color: ${({ theme }) => theme.onPrimary};
`

const Progress = styled.div<{ percentage: number }>`
  border-radius: ${RADIUS.M};
  height: 24px;
  width: ${({ percentage }) => `${320 * (percentage / 100)}px`};
  background-color: ${({ theme }) => theme.secondary};
  transition: width ease 0.1s;
`

export default ProgressBar
