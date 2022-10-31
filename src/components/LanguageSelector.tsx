import TranslatorImg from '../assets/translator.svg'
import Select, { StylesConfig } from 'react-select'
import { useTranslation } from 'react-i18next'
import { FONT_SIZE } from '../constants'
import styled from 'styled-components'
import { languages } from '../i18n'

const LanguageSelector = () => {
  const { i18n } = useTranslation()

  const handleChange = (event: any) => {
    i18n.changeLanguage(event.value)
  }

  const MAIN_COLOR = 'black'

  const getOptions = () => {
    const keys = Object.keys(languages)
    const options = keys.map((language) => ({
        'value': language,
        'label' : (languages as any)[language].nativeName as string,
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
      width: '125px',
    }),
    indicatorSeparator: (styles: any) => ({
      ...styles,
      display: 'none'
    }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      color: MAIN_COLOR,
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: MAIN_COLOR,
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
    }),
  };

  return (
    <Container>
      <img src={TranslatorImg} alt="translator logo"></img>
      <Select
        isSearchable={false}
        styles={selectStyles}
        options={getOptions()}
        onChange={handleChange}
        defaultValue={ {'value': 'en', 'label': 'English'} }
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

export default LanguageSelector