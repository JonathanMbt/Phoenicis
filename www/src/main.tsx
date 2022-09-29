import { ThemeProvider } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import phoenicisTheme from './components/UI/theme'
import router from './router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={phoenicisTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
