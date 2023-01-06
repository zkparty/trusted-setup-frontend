import create from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type OAuthProvider = 'github' | 'eth'

export type OAuthRes = {
  exp: string
  nickname: string
  provider: string
  session_id: string
  sub: string
}

type Store = {
  provider: string | null
  sessionId: string | null
  nickname: string | null
  exp: string | null
  sub: string | null
  error: string | null
  signin: (res: OAuthRes) => void
  signout: () => void
  setError: (msg: string) => void
}

export const useAuthStore = create<Store>()(
  persist(
    (set) => ({
      provider: null,
      sessionId: null,
      nickname: null,
      exp: null,
      sub: null,
      error: null,
      signin: (res: OAuthRes) =>
        set({
          ...res,
          sessionId: res.session_id,
          error: null
        }),
      signout: () =>
        set({
          provider: null,
          sessionId: null,
          nickname: null,
          exp: null,
          sub: null,
          error: null
        }),
      setError: (msg: string) => set({ error: msg })
    }),
    {
      name: 'kzg-temporary-session',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
