import create from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Store = {
  receipt: string | null
  contribution: string | null
  newContribution: string | null
  sequencerSignature: string | null
  updateReceipt: (data: string | null) => void
  updateContribution: (data: string | null) => void
  updateNewContribution: (data: string | null) => void
  updateSequencerSignature: (data: string | null) => void
}

export type EntropyStore = {
  entropy: string | null
  potPubkeys: string[] | null
  ECDSASigner: string | null
  ECDSASignature: string | null
  updateEntropy: (data: string | null) => void
  updatePotPubkeys: (data: string[] | null) => void
  updateECDSASigner: (data: string | null) => void
  updateECDSASignature: (data: string | null) => void
}

export const useContributionStore = create<Store>((set, _get) => ({
  receipt: null,
  contribution: null,
  newContribution: null,
  sequencerSignature: null,
  updateReceipt: (data: string | null) => set({ receipt: data }),
  updateContribution: (data: string | null) => set({ contribution: data }),
  updateNewContribution: (data: string | null) => set({ newContribution: data }),
  updateSequencerSignature: (data: string | null) => set({ sequencerSignature: data }),
}))

export const useEntropyStore = create<EntropyStore>()(
  persist(
    (set) => ({
      entropy: null,
      potPubkeys: null,
      ECDSASigner: null,
      ECDSASignature: null,
      updateEntropy: (data: string | null) => set({ entropy: data }),
      updatePotPubkeys: (data: string[] | null) => set({ potPubkeys: data }),
      updateECDSASigner: (data: string | null) => set({ ECDSASigner: data }),
      updateECDSASignature: (data: string | null) => set({ ECDSASignature: data }),
    }),
    {
      name: 'kzg-temporary-entropy',
      storage: createJSONStorage(() => sessionStorage),
  })
)
