import Select, { StylesConfig } from 'react-select'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import TranslatorImg from '../assets/translator.svg'

import { BREAKPOINT, FONT_SIZE } from '../constants'
import { locales } from '../locales'

const LanguageSelector = () => {
  const { i18n, t } = useTranslation()

  const handleChange = (event: any) => {
    i18n.changeLanguage(event.value)
  }

  const MAIN_COLOR = 'black'

  const getOptions = () => {
    const options = Object.keys(locales).map((language) => ({
      value: language,
      label: t(`language.${language}`, { lng: language })
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
      width: '125px'
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
      <img src={TranslatorImg} alt="translator logo"></img>
      <Select
        isSearchable={false}
        styles={selectStyles}
        options={getOptions()}
        onChange={handleChange}
        defaultValue={{ value: 'en', label: t('language.en', { lng: 'en' }) }}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  div {
    width: fit-content;
  }
  [class*=ValueContainer] {
    @media (max-width: ${BREAKPOINT.S}) {
      display: none;
    }
  }

`

export default LanguageSelector
