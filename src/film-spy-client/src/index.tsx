import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from 'app';
import client from 'client';
import reportWebVitals from 'report-web-vitals';
import store from 'store';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render((
  <StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </StrictMode>
));

reportWebVitals();

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.REACT_APP_PUSHER_APP_KEY,
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
  encrypted: true,
  authorizer: (channel: any): any  => ({
    authorize: (socketId: any, callback: any): any => client.post('/api/broadcasting/auth', {
      socket_id: socketId,
      channel_name: channel.name,
    }).then(response => callback(false, response.data)).catch(error => callback(true, error)),
  }),
});

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo;
  }
}
