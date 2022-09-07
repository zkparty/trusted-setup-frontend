import { useQuery } from '@tanstack/react-query'

export default function useQueueNumber() {
  return useQuery(['queue_number'], async () => {
    // todo: fetch from nodejs API
    return 2
  })
}
