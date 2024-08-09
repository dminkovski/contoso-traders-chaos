import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const setupAxiosInterceptors = (store:any) => {
  const onRequestSuccess = (config: InternalAxiosRequestConfig) => {
    // do something with headers
    
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