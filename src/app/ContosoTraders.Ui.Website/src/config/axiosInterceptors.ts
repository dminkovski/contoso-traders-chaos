import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import getStore, { IRootState } from './store';

const setupAxiosInterceptors = () => {
  const onRequestSuccess = (config: InternalAxiosRequestConfig) => {
    const state:IRootState = getStore()?.getState();
    const token = state?.authentication?.token;
    const user = state?.authentication?.user;
    const email = user?.username;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (email ) {
      config.headers['x-tt-email'] = `${email}`;
    }

    return config;
  };
  const onResponseSuccess = (response:any) => response;
  const onResponseError = (err: AxiosError) => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 401) {
      //onUnauthenticated();
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;