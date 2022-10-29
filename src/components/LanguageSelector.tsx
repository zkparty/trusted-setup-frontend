import TranslatorImg from '../assets/translator.svg'
//import Select, { StylesConfig } from 'react-select'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { languages } from '../i18n'
import { useState } from 'react'

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage ] = useState('en');
  const { i18n } = useTranslation()

  const handleChange = (event: any) => {
    const language = event.target.value
    i18n.changeLanguage(language)
    setSelectedLanguage(language)
  }

  return (
    <Container>
      <img src={TranslatorImg} alt="translator logo"></img>
      <Select onChange={handleChange} value={selectedLanguage}>
      {Object.keys(languages).map((language) => (
        <Option value={language}>
          {(languages as any)[language].nativeName}
        </Option>
      ))}
      </Select>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const Select = styled.select`
  border: none;
  background: transparent;

  option {
    color: black;
    background: white;
    font-weight: small;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }

`;

const Option = styled.option`
  font-size: 14px;
  margin-right: 15px;
  padding-bottom: 10px;
`;

export default LanguageSelector