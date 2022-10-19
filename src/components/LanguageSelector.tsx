import { useTranslation } from 'react-i18next'
import {languages} from '../i18n'


const LanguageSelector = () => {
    const { i18n } = useTranslation()
    return (
        <div>
          {Object.keys(languages).map((language) => (
            <button
              type="submit"
              key={language}
              onClick={() => i18n.changeLanguage(language)}
              disabled={i18n.resolvedLanguage === language}
            >
              {(languages as any)[language].nativeName}
            </button>
          ))}
        </div>
    )
}

export default LanguageSelector