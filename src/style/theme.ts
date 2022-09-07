export type Theme = {
  background: string
  surface: string
  primary: string
  secondary: string
  border: string
  error: string
  warning: string
  disabled: string
  control: string
  onPrimary: string
  onSecondary: string
  onBackground: string
  onSurface: string
  onError: string
  onWarning: string
  onDisabled: string

  textBlack: string
}

const theme: Theme = {
  background: '#F0F0F0',
  surface: '#FCFCFC',
  error: '#ff0f0f',
  warning: '#f4512c',
  primary: '#0C5B29',
  secondary: '#c9e977',
  border: '#2A3D46',
  disabled: 'gray',
  control: '#e8dcff',
  onBackground: '#0C5B29',
  onSurface: '#FFFFFF',
  onError: '#FFFFFF',
  onWarning: '#FFFFFF',
  onPrimary: '#FCFCFC',
  onSecondary: '#000000',
  onDisabled: '#FFFFFF',
  textBlack: '#151616'
}

export default theme
