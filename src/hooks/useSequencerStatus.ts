import { useQuery } from '@tanstack/react-query'
import api from '../api'

export default function useSequencerStatus() {
  return useQuery(['status'], async () => {
    return api.getStatus()
  })
}
