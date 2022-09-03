import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage, SigninPage, OnboardingPage } from './pages'
import ROUTES from './routes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LANDING} element={<LandingPage />} />
        <Route path={ROUTES.SIGNIN} element={<SigninPage />} />
        <Route path={ROUTES.ONBOARDING} element={<OnboardingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
