import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../routes'
import { isMobile } from '../utils'

const MobilePage = () => {
  const navigate = useNavigate()

  // check useragent and if user agent isn't mobile,
  // redirect to landing page
  useEffect(() => {
    const mobile = isMobile()
    if (!mobile) {
      navigate(ROUTES.ROOT)
    }
    // eslint-disable-next-line
  }, [])

  return <div>Mobile is not supported</div>
}

export default MobilePage
