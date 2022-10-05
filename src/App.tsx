import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import {
  HomePage,
  LandingPage,
  SigninPage,
  EntropyInputPage,
  LobbyFullPage,
  LobbyPage,
  ContributingPage,
  CompletePage,
  RecordPage,
  GatePage,
  MobilePage
} from './pages'
import RequireAuth from './components/helper/RequireAuth'
import ROUTES from './routes'
import GlobalStyle from './style/global'

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path={ROUTES.MOBILE} element={<MobilePage />} />

          <Route path={ROUTES.ROOT} element={<HomePage />}>
            <Route path={ROUTES.ROOT} element={<LandingPage />} />
            <Route path={ROUTES.SIGNIN} element={<SigninPage />} />
            <Route
              path={ROUTES.ENTROPY_INPUT}
              element={
                <RequireAuth>
                  <EntropyInputPage />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTES.LOBBY_FULL}
              element={
                <RequireAuth>
                  <LobbyFullPage />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTES.LOBBY}
              element={
                <RequireAuth>
                  <LobbyPage />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTES.CONTRIBUTING}
              element={
                <RequireAuth>
                  <ContributingPage />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTES.COMPLETE}
              element={
                <RequireAuth>
                  <CompletePage />
                </RequireAuth>
              }
            />
            <Route path={ROUTES.RECORD} element={<RecordPage />} />
            <Route path={ROUTES.GATE} element={<GatePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
