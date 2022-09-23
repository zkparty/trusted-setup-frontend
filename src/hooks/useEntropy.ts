import create from 'zustand';

export const useEntropy = create(set => ({
  entropy: 'initialValue',
  updateEntropy: (data: string) => set({ entropy: data }),
}))