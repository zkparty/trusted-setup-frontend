import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../store/auth'

// fetch github user info from github api
export function useGithubUserInfo() {
  const token = useAuthStore((state) => state.idToken)
  return useQuery(
    ['github_user'],
    async () => {
      if (!token) throw new Error('session closed')

      // TODO: fix
      const res = await fetch('https://api.github.com/user', {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`
        }
      })
      return await res.json()
    },

    {
      enabled: !!token
    }
  )
}
