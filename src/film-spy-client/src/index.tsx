import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import App from 'app';
import store from 'store';
import reportWebVitals from 'report-web-vitals';
import './index.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcast: 'pusher',
  key: process.env.REACT_APP_PUSHER_APP_KEY,
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
  forceTLS: true,
});

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo;
  }
}
