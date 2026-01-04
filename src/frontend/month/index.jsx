import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MonthContext from './context'
import Page from './page'
import { theme } from '@/utils'

import './index.css'

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MonthContext>
        <Page />
      </MonthContext>
    </ThemeProvider>
  </StrictMode>
)
