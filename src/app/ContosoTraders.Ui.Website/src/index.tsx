import './index.css';

import { EventMessage, EventType, PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from "@azure/msal-react";
import msalConfig from "app/config/authConfig";
import setupAxiosInterceptors from 'app/config/axiosInterceptors';
import reportWebVitals from 'app/config/reportWebVitals';
import getStore from 'app/config/store';
import { AuthenticationSlice, dispatchLogin } from 'app/shared/reducers/authentication.reducer';
import React from 'react';
import { Container, createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import App from './app';

export const msalInstance = new PublicClientApplication(msalConfig);
msalInstance.addEventCallback((message: EventMessage) => {
  if (message.eventType === EventType.LOGIN_SUCCESS || message.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) {
      console.log("msalInstance addEventCallback");
      const payload = {user: (message.payload as any)?.account, token: (message.payload as any)?.accessToken};
      getStore().dispatch(AuthenticationSlice.actions.loginSession(payload));
  }
});

const store = getStore();
setupAxiosInterceptors();


const initialize = async () => {
  await msalInstance.initialize();    
    
  const rootElem = document.getElementById('root') as Container;
  const root = createRoot(rootElem);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <MsalProvider instance={msalInstance}>
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
