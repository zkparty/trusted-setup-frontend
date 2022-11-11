import Select, { StylesConfig } from 'react-select'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import TranslatorImg from '../assets/translator.svg'

import { FONT_SIZE } from '../constants'
import { locales } from '../locales'
import { isMobile } from '../utils'

const LanguageSelector = () => {
  const { i18n, t } = useTranslation()

  const handleChange = (event: any) => {
    i18n.changeLanguage(event.value)
  }

  const MAIN_COLOR = 'black'

  const getOptions = () => {
    const mobile = isMobile()
    const options = Object.keys(locales).map((language) => ({
      value: language,
      label: mobile ? language : t(language, { lng: 'en' })
    }))
    return options
  }

  const selectStyles: StylesConfig = {
    control: (styles: any) => ({
      ...styles,
      boxShadow: 'none !important',
      border: 'none !important',
      fontSize: FONT_SIZE.M,
      alignItems: 'center',
      color: MAIN_COLOR,
      cursor: 'pointer',
      display: 'flex',
      width: 'fit-content'
    }),
    indicatorSeparator: (styles: any) => ({
      ...styles,
      display: 'none'
    }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      color: MAIN_COLOR
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: MAIN_COLOR
    }),
    option: (styles: any) => ({
      ...styles,
      cursor: 'pointer',
      backgroundColor: 'transparent',
      color: MAIN_COLOR,
      ':hover': {
        ...styles[':hover'],
        backgroundColor: '#FFF8E7'
      }
    })
  }

  return (
    <Container>
      <img src={TranslatorImg} alt="translator logo" />
      <Select
        isSearchable={false}
        styles={selectStyles}
        options={getOptions()}
        onChange={handleChange}
        defaultValue={{ value: 'en', label: isMobile() ? 'en' : t('en', { lng: 'en' }) }}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

export default LanguageSelector
