import { useQuery } from '@tanstack/react-query'
import { API_ROOT } from '../constants'
import { SequencerStatus } from '../types'

export default function useSequencerStatus() {
  return useQuery(['status'], async () => {
    return new Promise<SequencerStatus>((resolve) => {
      fetch(API_ROOT + '/info/status')
      .then( async (_res) => {
        if (_res.ok) {
          return {
            ...(await _res.json()),
            status: 'Online'
          } as SequencerStatus
        }
        else {
          return {
            lobby_size: 0,
            num_contributions: 0,
            sequencer_address: '0x000',
            status: 'Offline',
          } as SequencerStatus
        }
      })
      .then((data) => {
        resolve(data)
      })
    })
  })
}
