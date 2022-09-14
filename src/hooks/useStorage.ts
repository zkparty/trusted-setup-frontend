import create from 'zustand';

export const useStorage = create(set => ({
  entropy: 'initialValue',
  updateEntropy: (data: string) => set({ entropy: data }),
}))