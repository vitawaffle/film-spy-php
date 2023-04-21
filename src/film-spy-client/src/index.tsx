import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from 'app';
import reportWebVitals from 'report-web-vitals';
import './index.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
).render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);

reportWebVitals();
