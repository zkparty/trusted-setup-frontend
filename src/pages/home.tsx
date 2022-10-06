import { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import WithBg from '../components/WithBg'
import ROUTES from '../routes'
import { isMobile, isBgRoute } from '../utils'

const HomePage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // check device UA on initial render
  // redirect to mobile screen if
  useEffect(() => {
    const mobile = isMobile()
    if (mobile) {
      navigate(ROUTES.MOBILE)
    }
    // eslint-disable-next-line
  }, [])

  if (isBgRoute(location.pathname)) {
    return (
      <WithBg>
        <Outlet />
      </WithBg>
    )
  }

  return <Outlet />
}

export default HomePage
