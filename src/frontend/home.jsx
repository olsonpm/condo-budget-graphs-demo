import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import AppContext from './app-context'
import AnnualDataPage from './annual-data-page'
import { theme } from './utils'

import './styles/home-index.css'

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContext>
        <AnnualDataPage name="Single Year" />
      </AppContext>
    </ThemeProvider>
  </StrictMode>
)
