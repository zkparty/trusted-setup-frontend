import { useCallback } from 'react'
import api from '../api'
import OAuthPopup from '../OAuthPopup'
import { useAuthStore } from '../store/auth'

export type AuthRes = {
  id_token: string
  session_id: string
}

export default function useAuthenticate() {
  const authStore = useAuthStore()
  const signinGithub = useCallback(async () => {
    try {
      const requestLinks = await api.getRequestLink()

      const popupHeight = '600px'
      const popupWidth = '400px'
      const top = '0px'
      const left = '0px'

      const popup = OAuthPopup.open(
        'oauth2-authorize-popup',
        requestLinks.github_auth_url,
        {
          height: popupHeight,
          width: popupWidth,
          top: top,
          left: left
        }
      )

      const result = await popup.wait()
      const res = (await api.getAuthorized(
        result.code,
        result.state
      )) as AuthRes
      authStore.signin(result.code, 'github', res.id_token, res.session_id)
      return true
    } catch (e) {
      return false
    }
  }, [])

  // TODO: implement
  const signinSIE = useCallback(async () => {
    const requestLinks = await api.getRequestLink()
    console.log(requestLinks)

    const popupHeight = '600px'
    const popupWidth = '400px'
    const top = '0px'
    const left = '0px'

    const popup = OAuthPopup.open(
      'oauth2-authorize-popup',
      requestLinks.github_auth_url,
      {
        height: popupHeight,
        width: popupWidth,
        top: top,
        left: left
      }
    )
    const result = await popup.wait()
    return (await api.getAuthorized(result.code, result.state)) as AuthRes
  }, [])

  return {
    signinGithub,
    signinSIE
  }
}
