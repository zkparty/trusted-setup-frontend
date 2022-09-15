import create from 'zustand'

type OAuthProvider = 'github' | 'ethereum'

type Store = {
  provider: OAuthProvider | null
  oauthToken: string | null
  idToken: string | null
  sessionId: string | null
  signin: (
    oauthToken: string,
    provider: OAuthProvider,
    idToken: string,
    sessionId: string
  ) => void
  signout: () => void
}

export const useAuthStore = create<Store>((set) => ({
  oauthToken: null,
  provider: null,
  idToken: null,
  sessionId: null,
  signin: (oauthToken, provider, idToken, sessionId) =>
    set({
      oauthToken,
      provider,
      idToken,
      sessionId
    }),
  signout: () =>
    set({
      oauthToken: null,
      provider: null,
      idToken: null,
      sessionId: null
    })
}))
