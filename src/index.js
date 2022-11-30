import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/style.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import fr from "./translation/fr.json";

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'fr',                              // language to use
        resources: {
            fr: {
                common: fr               // 'common' is our custom namespace
            },
        },
});

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();