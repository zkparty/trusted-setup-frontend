import { createGlobalStyle } from 'styled-components'
import { FONT_SIZE } from '../constants'

const GlobalStyle = createGlobalStyle`
body {
  font-family: 'Inter', sans-serif;
  font-size: ${FONT_SIZE.M};
  color: ${({ theme }) => theme.text};
  margin: 0;
  min-width: 100vw;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.background}
}
input {
  appearance: textfield;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input:invalid {
  box-shadow: none;
}
input:focus {
  outline: none;
}
a {
  color: inherit;
  text-decoration: none;
}
* {
  box-sizing: border-box;
}
`

export default GlobalStyle
