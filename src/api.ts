import wasm from './wasm'
import { toParams } from './utils'
import { OAuthProvider, OAuthRes } from './store/auth'
import { API_ROOT } from './constants'
import type { ErrorRes, ContributeRes, TryContributeRes } from './types'

class APIClient {
  async getRequestLink(path: string) {
    const encodedPath = encodeURIComponent(`${path}#/redirect`)
    console.log(`path is ${encodedPath}`)
    const res = await fetch(
      `${API_ROOT}/auth/request_link?redirect_to=${encodedPath}`,
      {
        mode: 'cors'
      }
    )
    return await res.json()
  }

  async getAuthorized(
    provider: OAuthProvider,
    code: string,
    state: string
  ): Promise<ErrorRes | OAuthRes> {
    const res = await fetch(
      `${API_ROOT}/auth/callback/${provider}?code=${code}&state=${state}`
    )
    let result: ErrorRes | OAuthRes = { error: '', code: '' }
    try {
      result = await res.json()
    } catch (error) {
      result = toParams(res.url.split('?')[1]) as ErrorRes | OAuthRes
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
        Authorization: `Bearer ${session_id}`
      },
      body: JSON.stringify({
        session_id
      })
    })
    return await res.json()
  }

  async contribute(
    session_id: string,
    preContribution: string,
    entropy: string,
    signature: string | null
  ): Promise<ErrorRes | ContributeRes> {
    const { contribution } = await wasm.contribute(preContribution, entropy)
    let contributionObj = null
    /* TODO: activate the following line
    if (signature) {
      contributionObj = JSON.parse(contribution!)
      contributionObj.ecdsaSignature = signature
      contributionObj = JSON.stringify(contributionObj)
    }*/

    const res = await fetch(`${API_ROOT}/contribute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session_id}`
      },
      body: contributionObj || contribution
    })
    return {
      ...(await res.json()),
      contribution
    } as ContributeRes
  }

  async checkContribution(contribution: string, newContribution: string) {
    return new Promise<any>((resolve) => {
      const worker = new Worker('./wasm/wasm-worker.js', {
        type: 'module'
      })
      const data = {
        action: 'subgroupCheck',
        contribution: contribution,
        newContribution: newContribution
      }

      worker.onmessage = async (event) => {
        const { checkContribution, checkNewContribution } = event.data
        resolve({
          checkContribution,
          checkNewContribution
        })
        worker.terminate()
      }

      worker.postMessage(data)
    })
  }
}

export default new APIClient()
