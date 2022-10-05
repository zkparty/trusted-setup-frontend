import create from 'zustand'

export type OAuthProvider = 'Github' | 'Ethereum'

export type OAuthRes = {
  exp: string
  nickname: string
  provider: OAuthProvider
  session_id: string
  sub: string
}

type Store = {
  provider: OAuthProvider | null
  sessionId: string | null
  nickname: string | null
  exp: string | null
  sub: string | null
  error: string | null
  signin: (res: OAuthRes) => void
  signout: () => void
  setError: (msg: string) => void
}

export const useAuthStore = create<Store>((set) => ({
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
}))
