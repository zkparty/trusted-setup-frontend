import type {
    ContributeResWasm,
    SubgroupCheckResWasm,
} from './types'

class Wasm {
    async contribute(
        contribution: string,
        entropy: string[],
      ): Promise<ContributeResWasm> {
        return new Promise<ContributeResWasm>((resolve) => {
          const worker = new Worker('./wasm/wasm-worker.js', {
            type: 'module'
          })
          const data = {
            action: 'contribute',
            contributionString: contribution,
            entropy: entropy
          }
          worker.onmessage = async (event) => {
            resolve(event.data as ContributeResWasm)
            worker.terminate()
          }
          worker.postMessage(data)
        })
    }
    async checkContributions(
        contribution: string,
        newContribution: string
      ): Promise<SubgroupCheckResWasm> {
        return new Promise<SubgroupCheckResWasm>((resolve) => {
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
    async getPotPubkeys(entropy: string[]){
      return new Promise<string[]>((resolve) => {
        const worker = new Worker('./wasm/wasm-worker.js', {
          type: 'module'
        })
        const data = {
          action: 'getPotPubkeys',
          entropy: entropy
        }
        worker.onmessage = async (event) => {
          resolve(event.data)
          worker.terminate()
        }
        worker.postMessage(data)
      })
    }
}

export default new Wasm()