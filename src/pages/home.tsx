import { useEffect, forwardRef } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Background from '../components/Background'
import ROUTES, { MOBILE_FRIENDLY_ROUTES } from '../routes'
import { isMobile } from '../utils'

const HomePage = forwardRef((_, bgRef: any) => {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    // check device UA on initial render
    const mobile = isMobile()
    // If mobile and location is not mobile friendly, redirect to root route
    if (mobile && !MOBILE_FRIENDLY_ROUTES.includes(location.pathname)) {
      navigate(ROUTES.ROOT)
    }
  }, [location.pathname, navigate])
  return (
    <Background ref={bgRef}>
      <Outlet />
    </Background>
  )
})

export default HomePage
