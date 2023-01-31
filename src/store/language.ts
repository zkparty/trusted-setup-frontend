import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Store = {
  selectedLanguage: string | null
  updateSelectedLanguage: (data: string | null) => void
}
export const useLanguageStore = create<Store>()(
  persist(
    (set) => ({
      selectedLanguage: null,
      updateSelectedLanguage: (data: string | null) => set({ selectedLanguage: data }),
    }),
    {
      name: 'kzg-language',
      storage: createJSONStorage(() => sessionStorage),
  })
)
