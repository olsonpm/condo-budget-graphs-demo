import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Login from './login.jsx'
import { theme } from './utils'

import './styles/login-index.css'

createRoot(document.getElementById('login')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Login />
    </ThemeProvider>
  </StrictMode>
)
