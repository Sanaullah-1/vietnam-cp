import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/js/bootstrap.bundle.min";

import store from './redux/store';

import i18n from './i18n/i18n';

import './styles/main.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { I18nextProvider } from 'react-i18next';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback="Loading...">
          <App />
        </Suspense>
      </I18nextProvider>
    </Provider>
    {/* </React.StrictMode> */}
  </BrowserRouter>
)
