import { useCallback } from 'react'
import api from '../api'
import OAuthPopup from '../OAuthPopup'
import { useAuthStore } from '../store/auth'

type SuccessRes = {
  result: true
  data: {
    id_token: string
    session_id: string
  }
}

type FailRes = {
  result: false
  data: {
    error: string
  }
}

export type AuthRes = SuccessRes | FailRes
function isAuthSuccess(res: AuthRes): res is SuccessRes {
  return res.result
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
        'github',
        result.code,
        result.state
      )) as AuthRes
      if (isAuthSuccess(res)) {
        authStore.signin(
          result.code,
          'github',
          res.data.id_token,
          res.data.session_id
        )
        return true
      } else {
        authStore.setError(res.data.error)
        return false
      }
    } catch (e) {
      authStore.setError((e! as Error).message)
      return false
    }
  }, [])

  // TODO: implement
  const signinSIE = useCallback(async () => {
    try {
      const requestLinks = await api.getRequestLink()

      const popupHeight = '600px'
      const popupWidth = '440px'
      const top = '0px'
      const left = '0px'

      const popup = OAuthPopup.open(
        'oauth2-authorize-popup',
        requestLinks.auth_url,
        {
          height: popupHeight,
          width: popupWidth,
          top: top,
          left: left
        }
      )
      const result = await popup.wait()
      const res = (await api.getAuthorized(
        'siwe',
        result.code,
        result.state
      )) as AuthRes
      console.log(res)
      if (isAuthSuccess(res)) {
        authStore.signin(
          result.code,
          'siwe',
          res.data.id_token,
          res.data.session_id
        )
        return true
      } else {
        authStore.setError(res.data.error)
        return false
      }
    } catch (e) {
      authStore.setError((e! as Error).message)
      return false
    }
  }, [])

  return {
    signinGithub,
    signinSIE
  }
}
