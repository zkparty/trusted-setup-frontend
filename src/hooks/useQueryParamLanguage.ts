import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LANG_QUERY_PARAM, DEFAULT_LANG } from '../constants'

export default function useQueryParamLanguage() {
  const { i18n } = useTranslation()
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const lang: string = params.get(LANG_QUERY_PARAM) || DEFAULT_LANG
    i18n.changeLanguage(lang)
  }, [i18n])
}
