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
  /* Considerations for the IPFS build: 
    - IPFS gateways comsider anything after the / a path to a folder. So our preferred method
    of using route names to route to a page won't work. Solution is to use HashRouter in lieu of
    BrowserRouter. Now, pages can be router using /#/<page> at the end of the URL.
    A couple of problems arise with the redirect URL we need to send along with the sign-in request.
    - As the URL is an IPFS CID, it's not known until it is built. It can't be hard-coded. We cam
    use window.location to solve that. 
    - We want to route to the /redirect logic upon return from sign-in, so we need to 
    pass /#/redirect at the end of the URL. The sequencer sees the # as an in-page reference, and
    repositions it at the end of the URL, following the query string parameters it returns. This messes up the routing
    a bit: the request goes to redirect page OK, but without the query parameters. We need to 
    customise the routing to fix this. 
*/

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
