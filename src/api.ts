import { toParams } from './utils'
import { OAuthProvider } from './store/auth'
import { API_ROOT, SIGNIN_REDIRECT_URL } from './constants'
import type { ErrorRes, GetAuthorizedRes, ContributeRes, TryContributeRes } from './types'

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
    let result: ErrorRes | GetAuthorizedRes = {'error': ''};
    try {
      result = await res.json()
    } catch (error) {
      result = toParams(res.url.split('?')[1]) as ErrorRes | GetAuthorizedRes
    }
    return result
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
        'Authorization': `Bearer ${session_id}`
      }
    })
    return await res.json()
  }

  async contribute(
    session_id: string,
    contribution: string,
    entropy: string[]
  ): Promise<ErrorRes | ContributeRes> {
    return new Promise<ErrorRes | ContributeRes>((resolve) => {
      const worker = new Worker('./wasm/wasm-worker.js', {
        type: 'module'
      })
      const data = {
        action: 'contribute',
        contributionString: contribution,
        entropy: entropy
      }

      worker.onmessage = async (event) => {
        const { contribution, proofs } = event.data
        const res = await fetch(`${API_ROOT}/contribute`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session_id}`
          },
          body: contribution,
        })
        resolve({
          ...await res.json(),
          contribution: contribution,
          proofs: proofs
        } as ContributeRes)
        worker.terminate()
      }

      worker.postMessage(data)
    })
  }

  async checkContribution(
    contribution: string,
    newContribution: string
  ){
    return new Promise<any>((resolve) => {
      const worker = new Worker('./wasm/wasm-worker.js', {
        type: 'module'
      })
      const data = {
        action: 'subgroupCheck',
        contribution: contribution,
        newContribution: newContribution,
      }

      worker.onmessage = async (event) => {
        const { checkContribution, checkNewContribution } = event.data
        resolve({
          checkContribution,
          checkNewContribution,
        })
        worker.terminate()
      }

      worker.postMessage(data)
    })
  }

}

export default new APIClient()
