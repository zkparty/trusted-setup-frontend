import { useMutation } from '@tanstack/react-query'
import api from '../api'
import { useAuthStore } from '../store/auth'

/// when user is in the lobby,
/// user needs to periodically post try_contribute request to sequencer.
/// if successfully took the spot, now the user is ready to contribute.
export default function useTryContribute() {
  const { sessionId } = useAuthStore()

  return useMutation(async () => {
    if (!sessionId) throw new Error('Session id does not exist')

    return await api.tryContribute(sessionId)
  })
}
