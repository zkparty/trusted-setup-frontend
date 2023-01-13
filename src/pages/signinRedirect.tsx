import ROUTES from '../routes'
import { useEffect } from 'react'
import { useAuthStore } from '../store/auth'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useEntropyStore } from '../store/contribute'
import { toParams, validateSigninParams } from '../utils'
import useQueryParamLanguage from '../hooks/useQueryParamLanguage'

const SigninRedirect = (props: any) => {
  useQueryParamLanguage()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { ECDSASigner } = useEntropyStore()
  const { signin, setError } = useAuthStore()

  useEffect(() => {

    const isSameWallet = async (nickname: string): Promise<boolean> => {
      if ( ECDSASigner === nickname.toLowerCase() ){
        return true;
      } else {
        return false;
      }
    }

    (async () => {
      const params = toParams(props.search.replace(/^\?/, '') )
      window.history.replaceState(null, '', window.location.pathname)
      // check if login was succesful
      if (validateSigninParams(params)) {
        const notSameWallet = !(await isSameWallet(params.nickname))
        if ( params.provider === 'Ethereum' && notSameWallet ){
          setError(t('error.notSameWallet'))
          navigate(ROUTES.SIGNIN)
          return
        }
        // store signin data and redirect to entropy input page
        signin(params)
        navigate(ROUTES.LOBBY)
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
    })();
  }, [ECDSASigner, navigate, setError, signin, t, props.search])

  return <div>Signin processing</div>
}

export default SigninRedirect
