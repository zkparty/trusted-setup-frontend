import { useQuery } from '@tanstack/react-query'
import { API_ROOT } from '../constants'
import { Transcript } from '../types'

export default function useRecord() {
  return useQuery(['record'], async () => {
    const result: Transcript = await fetch(API_ROOT + '/info/current_state').then((_res) => _res.json())
    return result
  })
}
