import create from 'zustand'

export type OAuthProvider = 'github' | 'siwe'

type Store = {
  provider: OAuthProvider | null
  oauthToken: string | null
  idToken: string | null
  sessionId: string | null
  error: string | null
  signin: (
    oauthToken: string,
    provider: OAuthProvider,
    idToken: string,
    sessionId: string
  ) => void
  signout: () => void
  setError: (msg: string) => void
}

export const useAuthStore = create<Store>((set) => ({
  oauthToken: null,
  provider: null,
  idToken: null,
  sessionId: null,
  error: null,
  signin: (oauthToken, provider, idToken, sessionId) =>
    set({
      oauthToken,
      provider,
      idToken,
      sessionId,
      error: null
    }),
  signout: () =>
    set({
      oauthToken: null,
      provider: null,
      idToken: null,
      sessionId: null,
      error: null
    }),
  setError: (msg: string) => set({ error: msg })
}))
