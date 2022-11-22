import create from 'zustand'
import { persist } from 'zustand/middleware'

export type Store = {
  entropy: string | null
  receipt: string | null
  ECDSASignature: string | null
  contribution: string | null
  newContribution: string | null
  updateEntropy: (data: string | null) => void
  updateReceipt: (data: string | null) => void
  updateECDSASignature: (data: string | null) => void
  updateContribution: (data: string | null) => void
  updateNewContribution: (date: string | null) => void
}

export type EntropyStore = {
  entropy: string | null
  updateEntropy: (data: string | null) => void
}

export const useContributionStore = create<Store>((set, get) => ({
  entropy: null,
  receipt: null,
  ECDSASignature: null,
  contribution: null,
  newContribution: null,
  updateEntropy: (data: string | null) => set({ entropy: data }),
  updateReceipt: (data: string | null) => set({ receipt: data }),
  updateECDSASignature: (data: string | null) => set({ ECDSASignature: data }),
  updateContribution: (data: string | null) => set({ contribution: data }),
  updateNewContribution: (data: string | null) => set({ newContribution: data })
}))

export const useEntropyStore = create<EntropyStore>()(
  persist(
    (set) => ({
      entropy: null,
      updateEntropy: (data: string | null) => set({ entropy: data }),
    }),
    {
      name: 'kzg-temporary-entropy',
      getStorage: () => sessionStorage,
  })
)
