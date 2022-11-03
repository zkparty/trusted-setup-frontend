import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SERVER_ERROR } from '../constants'
import ROUTES from '../routes'
import { useAuthStore } from '../store/auth'
import { toParams, validateSigninParams } from '../utils'

const SigninRedirect = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { signin, setError } = useAuthStore((store) => ({
    signin: store.signin,
    setError: store.setError
  }))

  useEffect(() => {
    const params = toParams(location.search.replace(/^\?/, ''))
    if (validateSigninParams(params)) {
      // store signin data and redirect to entropy input page
      signin(params)
      navigate(ROUTES.ENTROPY_INPUT)
    } else if (
      params.message.replaceAll('+', ' ') === SERVER_ERROR.LOBBY_IS_FULL
    ) {
      navigate(ROUTES.LOBBY_FULL)
    } else {
      // set signin error and redirect back to signin page
      setError(params.message.replaceAll('+', ' '))
      navigate(ROUTES.SIGNIN)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>Signin processing</div>
}

export default SigninRedirect
