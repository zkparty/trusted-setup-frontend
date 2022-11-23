import ROUTES from '../routes'
import { useEffect } from 'react'
import { useAuthStore } from '../store/auth'
import { useTranslation } from 'react-i18next'
import { toParams, validateSigninParams } from '../utils'
import { useLocation, useNavigate } from 'react-router-dom'
import HeaderJustGoingBack from '../components/HeaderJustGoingBack'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  Over
} from '../components/Layout'

const SigninRedirect = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { signin, setError } = useAuthStore((store) => ({
    signin: store.signin,
    setError: store.setError,
  }))

  useEffect(() => {
    const params = toParams(location.search.replace(/^\?/, ''))
    if (validateSigninParams(params)) {
      // store signin data and redirect to entropy input page
      signin(params)
      if (params.provider === 'Ethereum') {
        window.location.href = ROUTES.DOUBLE_SIGN
      } else {
        navigate(ROUTES.LOBBY)
      }
    } else {
      const code = decodeURIComponent(params.code)
      switch (code) {
        case 'AuthErrorPayload::LobbyIsFull':
          navigate(ROUTES.LOBBY_FULL)
          return
        case 'AuthErrorPayload::UserAlreadyContributed':
          setError(t('error.authErrorPayload.userAlreadyContributed'))
          break
        case 'AuthErrorPayload::InvalidAuthCode':
          setError(t('error.authErrorPayload.invalidAuthCode'))
          break
        case 'AuthErrorPayload::FetchUserDataError':
          setError(t('error.authErrorPayload.fetchUserDataError'))
          break
        case 'AuthErrorPayload::CouldNotExtractUserData':
          setError(t('error.authErrorPayload.couldNotExtractUserData'))
          break
        case 'AuthErrorPayload::UserCreatedAfterDeadline':
          setError(t('error.authErrorPayload.userCreatedAfterDeadline'))
          break
        default:
          setError(t('error.authErrorPayload.customError', {error: code}))
          break
      }
      navigate(ROUTES.SIGNIN)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <HeaderJustGoingBack />
      <Over>
        <Container>
          <Wrap></Wrap>
      </Container>
      </Over>
    </>
  )
}

export default SigninRedirect
