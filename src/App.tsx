import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  HomePage,
  LandingPage,
  SigninPage,
  OnboardingPage,
  EntropyInputPage,
  QueuePage,
  ContributingPage,
  CompletePage,
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
            <Route path={ROUTES.ENTROPY_INPUT} element={<EntropyInputPage />} />
            <Route path={ROUTES.QUEUE} element={<QueuePage />} />
            <Route path={ROUTES.CONTRIBUTING} element={<ContributingPage />} />
            <Route path={ROUTES.COMPLETE} element={<CompletePage />} />
            <Route path={ROUTES.RECORD} element={<RecordPage />} />
            <Route path={ROUTES.GATE} element={<GatePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
