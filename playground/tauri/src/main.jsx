import React from 'react';
import { invoke } from '@tauri-apps/api';
import Astrolytics from 'astrolytics-desktop';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

invoke('get_device_id').then((deviceId) => {
  Astrolytics.init('64ceee22fae4ff6d90291cc0', {
    endpoint: 'ws://localhost:3002',
    deviceId,
    debug: true,
  });
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
