import { useQuery } from '@tanstack/react-query'
import { API_ROOT } from '../constants'
import { SequencerStatus } from '../types'

export default function useSequencerStatus() {
  return useQuery(['status'], async () => {
    let result: SequencerStatus
    try {
      result = await fetch(API_ROOT + '/info/status')
      .then((_res) => _res.json())
      result.status = 'Online'
    } catch (error) {
      result = {
        lobby_size: 0,
        num_contributions: 0,
        sequencer_address: '0x000',
        status: 'Offline',
      }
    }
    return result
  })
}
