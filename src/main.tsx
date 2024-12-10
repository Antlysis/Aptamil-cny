import React from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './i18n/config';
import './index.css';
import './assets/fonts/font.css';
import Router from './routes/Router';
import { store } from './store';

// Disable React DevTools in production
if (import.meta.env.MODE === 'production') {
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined') {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {};
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
