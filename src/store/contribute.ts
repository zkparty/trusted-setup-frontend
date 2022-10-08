import create from 'zustand';

export type Store = {
  entropy: string[],
  proofs: string | null,
  receipt: string | null,
  BLSSignatures: string[]
  ECDSASignature: string | null,
  contribution: string | null,
  newContribution: string | null,
  updateEntropy: (index: number, data: string) => void,
  updateProofs: (data: string | null) => void,
  updateReceipt: (data: string | null) => void,
  updateBLSSignatures: (index: number, data: string) => void,
  updateECDSASignature: (data: string | null) => void,
  updateContribution: (data: string | null) => void,
  updateNewContribution: (date: string | null) => void,
}

export const useContributionStore = create<Store>( (set, get) => ({
  entropy: ['','','',''],
  proofs: null,
  receipt: null,
  BLSSignatures: ['','','',''],
  ECDSASignature: null,
  contribution: null,
  newContribution: null,
  updateEntropy: (index: number, data: string) => {
    let newEntropy = get().entropy;
    newEntropy[index] = data;
    set({ entropy: newEntropy})
  },
  updateProofs: (data: string | null) => set({ proofs: data }),
  updateReceipt: (data: string | null) => set({ receipt: data }),
  updateBLSSignatures: (index: number, data: string) => {
    let newBLSSignatures = get().BLSSignatures
    newBLSSignatures[index] = data
    set({ BLSSignatures: newBLSSignatures})
  },
  updateECDSASignature: (data: string | null) => set({ ECDSASignature: data }),
  updateContribution: (data: string | null) => set({ contribution: data }),
  updateNewContribution: (data: string | null) => set({ newContribution: data }),
}))