import 'app/index.css';

import ReactDOM, { Container, createRoot } from 'react-dom/client';

import App from './app';
import { BrowserRouter } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { Provider } from 'react-redux';
import { PublicClientApplication } from '@azure/msal-browser';
import React from 'react';
import getStore from 'app/config/store';
import msalConfig from "app/config/authConfig";
import reportWebVitals from 'app/config/reportWebVitals';
import setupAxiosInterceptors from 'app/config/axiosInterceptors';

const rootElem = document.getElementById('root') as Container;
const root = createRoot(rootElem);

export const publicClientApplication = new PublicClientApplication(msalConfig);
const initialize = async () => {
  await publicClientApplication.initialize();  
}
initialize();
const store = getStore();
setupAxiosInterceptors(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MsalProvider instance={publicClientApplication}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MsalProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
