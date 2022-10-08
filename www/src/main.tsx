import { ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AnimatedRoutes from './AnimatedRoutes';
import phoenicisTheme from './components/UI/theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={phoenicisTheme}>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
