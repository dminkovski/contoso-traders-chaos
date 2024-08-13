import './index.css';

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from "@azure/msal-react";
import msalConfig from "app/config/authConfig";
import setupAxiosInterceptors from 'app/config/axiosInterceptors';
import reportWebVitals from 'app/config/reportWebVitals';
import getStore from 'app/config/store';
import React from 'react';
import { Container, createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import App from './app';

export const publicClientApplication = new PublicClientApplication(msalConfig);
const store = getStore();
setupAxiosInterceptors(store);


const initialize = async () => {
  await publicClientApplication.initialize();    
    
  const rootElem = document.getElementById('root') as Container;
  const root = createRoot(rootElem);

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
}
initialize();



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
