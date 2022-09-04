import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  HomePage,
  LandingPage,
  SigninPage,
  OnboardingPage,
  RecordPage,
  GatePage,
  MobilePage
} from './pages'
import ROUTES from './routes'
import GlobalStyle from './style/global'

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.MOBILE} element={<MobilePage />} />

          <Route path={ROUTES.ROOT} element={<HomePage />}>
            <Route path={ROUTES.ROOT} element={<LandingPage />} />
            <Route path={ROUTES.SIGNIN} element={<SigninPage />} />
            <Route path={ROUTES.ONBOARDING} element={<OnboardingPage />} />
            <Route path={ROUTES.RECORD} element={<RecordPage />} />
            <Route path={ROUTES.GATE} element={<GatePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
