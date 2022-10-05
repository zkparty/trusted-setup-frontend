import { OAuthProvider } from './store/auth'
import type {
  ErrorRes,
  GetAuthorizedRes,
  TryContributeRes,
  ContributeRes
} from './types'

const API_ROOT = process.env.REACT_APP_API_URL
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3001'

class APIClient {
  async getRequestLink() {
    const res = await fetch(
      `${API_ROOT}/auth/request_link?redirect_to=${FRONTEND_URL}/auth/callback`
    )
    return await res.json()
  }

  async getAuthorized(
    provider: OAuthProvider,
    code: string,
    state: string
  ): Promise<ErrorRes | GetAuthorizedRes> {
    const res = await fetch(
      `${API_ROOT}/auth/callback/${provider}?code=${code}&state=${state}`
    )
    return await res.json()
  }

  async getStatus() {}

  async getCurrentState() {}

  async tryContribute(
    session_id: string
  ): Promise<ErrorRes | TryContributeRes> {
    const res = await fetch(`${API_ROOT}/lobby/try_contribute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session_id}`
      },
      body: JSON.stringify({ session_id })
    })
    return await res.json()
  }

  async contribute(
    sessionId: string,
    contribution: string,
    entropy: string[]
  ): Promise<ErrorRes | ContributeRes> {
    return new Promise<ErrorRes | ContributeRes>((resolve) => {
      const worker = new Worker('./wasm/wasm-worker.js', {
        type: 'module'
      })
      const data = JSON.stringify({
        contributionString: contribution,
        entropy: entropy
      })

      worker.onmessage = async (event) => {
        // TODO: upload new contribution
        const { contribution } = event.data
        const res = await fetch(`${API_ROOT}/contribute`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionId}`
          },
          body: JSON.stringify({
            ...JSON.parse(contribution),
            session_id: sessionId
          })
        })
        resolve((await res.json()) as ContributeRes)
      }

      worker.postMessage(data)
    })
  }
}

export default new APIClient()
