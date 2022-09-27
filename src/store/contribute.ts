import create from 'zustand';

export type Store = {
  entropy: string[],
  contribution: string | null,
  newContribution: string | null,
  updateEntropy: (index: number, data: string) => void,
}

export const useContributionStore = create<Store>( (set, get) => ({
  entropy: ['','','',''],
  contribution: null,
  newContribution: null,
  updateEntropy: (index: number, data: string) => {
    let newEntropy = get().entropy;
    newEntropy[index] = data;
    set({ entropy: newEntropy})
  },
  updateContribution: (data: string) => set({ contribution: data }),
  updateNewContribution: (data: string) => set({ newContribution: data }),
}))