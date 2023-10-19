import { useQuery } from '@tanstack/react-query'
import api from '../api'

export default function useRecord() {
  return useQuery(
    ['record'],
    async () => {
      return api.getCurrentState()
    },
    {
      cacheTime: Infinity,
      networkMode: 'offlineFirst',
      staleTime: Infinity,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  )
}

export function useRecordAsString() {
  return useQuery(
    ['recordAsString'],
    async () => {
      return api.getCurrentStateAsString()
    },
    {
      cacheTime: Infinity,
      networkMode: 'offlineFirst',
      staleTime: Infinity,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  )
}
