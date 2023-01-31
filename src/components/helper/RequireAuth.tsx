import { Navigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { useAuthStore } from '../../store/auth'
import ROUTES from '../../routes'

/**
 * check signin status and navigate to
 * appropriate route
 * accept same props type with Route element of react-router-dom
 */
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { authenticated } = useAuthStore(
    (state) => ({
      authenticated: !!state.provider
    }),
    shallow
  )

  if (!authenticated) {
    return <Navigate to={ROUTES.ROOT} replace />
  }

  return children
}

export default RequireAuth
