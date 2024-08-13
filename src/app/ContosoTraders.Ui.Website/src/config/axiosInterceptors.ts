import { getItemValue } from 'app/helpers/localStorage';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const setupAxiosInterceptors = () => {
  const onRequestSuccess = (config: InternalAxiosRequestConfig) => {
    // do something with headers
   
    const token = getItemValue("token");
    const user = getItemValue("user");
    const email = user.username;
    
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