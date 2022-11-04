import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import {
  HomePage,
  LandingPage,
  SigninPage,
  EntropyInputPage,
  DoubleSignPage,
  LobbyFullPage,
  LobbyPage,
  ContributingPage,
  CompletePage,
  RecordPage,
  GatePage,
  MobilePage,
  SigninRedirectPage
} from './pages'
import RequireAuth from './components/helper/RequireAuth'
import usePreloadAllImages from './hooks/usePreloadAllImages'
import ROUTES from './routes'
import GlobalStyle from './style/global'

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loaded = usePreloadAllImages()
  const location = window.location
  console.log(`location hash ${location.hash}`)
  const isRedirect = location.hash.includes('redirect')
  //const hasSessionId = query.get('session_id')
  return (
    <>
      <HashRouter>
        <GlobalStyle />
        <Routes>
          <Route path={ROUTES.MOBILE} element={<MobilePage />} />

          <Route path={ROUTES.ROOT} element={<HomePage />}>
              <Route path={ROUTES.ROOT} element={
                  isRedirect ? 
                    <SigninRedirectPage /> : 
                    <LandingPage />} />
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
              path={ROUTES.DOUBLE_SIGN}
              element={
                <RequireAuth>
                  <DoubleSignPage />
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
          </Route>
          <Route path={ROUTES.RECORD} element={<RecordPage />} />
          <Route path={ROUTES.GATE} element={<GatePage />} />
          <Route path={ROUTES.REDIRECT} element={<SigninRedirectPage />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
