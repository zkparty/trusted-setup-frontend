import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'
import { setAppElement } from 'react-modal'
import App from './App'
import theme from './style/theme'

setAppElement('#root')

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const client = new QueryClient()

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
)
