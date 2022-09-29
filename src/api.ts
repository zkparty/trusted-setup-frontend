import { OAuthProvider } from './store/auth'
import type { ErrorRes, GetAuthorizedRes, TryContributeRes } from './types'
import { API_ROOT, SIGNIN_REDIRECT_URL } from './constants'

class APIClient {
  async getRequestLink() {
    const res = await fetch(`${API_ROOT}/auth/request_link?redirect_to=${SIGNIN_REDIRECT_URL}`)
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

  contribute(sessionId: string, contribution: string, entropy: string[], callback: () => void): void {
    const worker = new Worker('./wasm/wasm-worker.js', {
      type: 'module'
    });
    const data = JSON.stringify({
      contributionString: contribution,
      entropy: entropy,
    });
    // start worker
    worker.postMessage(data);
    worker.onmessage = async (event) => {
      const { contribution } = event.data;
      // TODO: fix connection refuse here
      const res = await fetch(`${API_ROOT}/contribute`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionId}`
        },
        body: JSON.stringify({
          ...JSON.parse(contribution),
          session_id: sessionId,
        }),
      }).then(_res => _res.json());
      console.log(res)
      callback();
    };
  }
}

export default new APIClient()
