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
import client from 'client';

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
  broadcaster: 'pusher',
  key: process.env.REACT_APP_PUSHER_APP_KEY,
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
  encrypted: true,
  authorizer: (channel: any, options: any) => ({
    authorize: (
      socketId: any,
      callback: any,
    ) => client.post('/api/broadcasting/auth', {
      socket_id: socketId,
      channel_name: channel.name,
    }).then(response => callback(false, response.data))
      .catch(error => callback(true, error)),
  }),
});

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo;
  }
}
