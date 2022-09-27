import { OAuthProvider } from './store/auth'
import type { ErrorRes, GetAuthorizedRes, TryContributeRes } from './types'

const API_ROOT = process.env.REACT_APP_API_URL

class APIClient {
  async getRequestLink() {
    const res = await fetch(`${API_ROOT}/auth/request_link`)
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

  contribute(sessionid: string, contribution: string, entropy: string[], callback: () => void): void {
    const worker = new Worker('./wasm/wasm-worker.js', {
      type: 'module'
    });
    const data = JSON.stringify({
      contribution: contribution,
      entropy: entropy,
    });
    // start worker
    worker.postMessage(data);
    worker.onmessage = async (event) => {
      // TODO: upload new contribution
      await fetch(`${API_ROOT}/contribute`,{
        method: 'POST',
        body: JSON.stringify({
          contribution: event.data,
          session_id: sessionid,
          /*
          Extension(contributor_state): Extension<SharedContributorState>,
          Extension(options): Extension<Options>,
          Extension(shared_transcript): Extension<SharedTranscript>,
          Extension(storage): Extension<PersistentStorage>,
          Extension(num_contributions): Extension<SharedCeremonyStatus>,
          Extension(keys): Extension<SharedKeys>,
          */
        }),
      }).then(_res => _res.json());
      callback();
    };
  }
}

export default new APIClient()
