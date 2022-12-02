import wasm from './wasm'
import { API_ROOT } from './constants'
import { useEntropyStore } from './store/contribute'
import type { ErrorRes, ContributeRes, TryContributeRes, RequestLinkRes, SequencerStatus, Transcript } from './types'

class APIClient {
  async getRequestLink(): Promise<RequestLinkRes | ErrorRes> {
    const path = window.location.href.replace(/#?\/signin/, '');
    const res = await fetch(
      `${API_ROOT}/auth/request_link?redirect_to=${encodeURIComponent(path)}`,
      {
        mode: 'cors'
      }
    )
    return await res.json()
  }

  async getStatus(): Promise<SequencerStatus> {
    let result: SequencerStatus
    try {
      result = await fetch(API_ROOT + '/info/status')
      .then((_res) => _res.json())
      result.status = 'Online'
    } catch (error) {
      result = {
        lobby_size: 0,
        num_contributions: 0,
        sequencer_address: '0x000',
        status: 'Offline',
      }
    }
    return result
  }

  async getCurrentState(): Promise<Transcript | null> {
    let result: Transcript | null
    try {
      result = await fetch(`${API_ROOT}/info/current_state`)
      .then((_res) => _res.json())
    } catch (error) {
      result = null
    }
    return result
  }

  async tryContribute(
    session_id: string
  ): Promise<ErrorRes | TryContributeRes> {
    const res = await fetch(`${API_ROOT}/lobby/try_contribute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session_id}`
      }
    })
    return await res.json()
  }

  async contribute(
    session_id: string,
    preContribution: string,
    entropy: string,
    identity: string,
    signature: string | null
  ): Promise<ErrorRes | ContributeRes> {
    const contribution  = await wasm.contribute(preContribution, entropy, identity)
    useEntropyStore.persist.clearStorage()
    let contributionObj = null
    if (signature) {
      contributionObj = JSON.parse(contribution!)
      contributionObj.ecdsa_signature = signature // TODO: change this when PR is merged https://github.com/ethereum/kzg-ceremony-sequencer/pull/127
      contributionObj = JSON.stringify(contributionObj)
    }

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
}

export default new APIClient()
