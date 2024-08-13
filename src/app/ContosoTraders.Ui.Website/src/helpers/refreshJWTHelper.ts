import axios from 'axios';

import { ConfigService } from '../services'
import {
    getRefreshToken,
    setAccessToken,
    setRefreshToken
} from './tokensHelper';
import { msalInstance } from '..';

let failedRequestToRetry = [];
let isAlreadyFetchingAccessToken = false;

const addSubscriber = (callback) => failedRequestToRetry.push(callback);

const fetchNewJWTokens = async (refreshToken) => {
    const dataToken = {
        token: refreshToken
    }
    const response = await axios.put(`${ConfigService._apiUrl}/auth/refresh`, dataToken);

    if (!response.data) {
        return null;
    }

    return {
        newAccessToken: response.data.access_token.token,
        newRefreshToken: response.data.refresh_token
    };
}

const onAccessTokenFetched = (accessToken) => {
    failedRequestToRetry.forEach(callback => callback(accessToken));
    failedRequestToRetry = [];
}

export const handleUnathenticatedRequest = async (authenticationError) => {
    try {
        const { response: errorResponse } = authenticationError;
        const useB2cFromEnv = process.env.REACT_APP_USE_B2C ? JSON.parse(process.env.REACT_APP_USE_B2C.toLowerCase()) : false;

        if (useB2cFromEnv) {
            return handleUnathenticatedRequestFromB2c(errorResponse, authenticationError);
        }

        return handleUnathenticatedRequestFromFake(errorResponse, authenticationError);
    } catch (err) {
        return Promise.reject(err);
    }
}

const handleUnathenticatedRequestFromFake = async (errorResponse, authenticationError) => {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
        // We can't refresh, throw the error
        return Promise.reject(authenticationError);
    }

    if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;

        const newJWTokens = await fetchNewJWTokens(refreshToken);

        if (!newJWTokens) {
            return Promise.reject(authenticationError);
        }

        setAccessToken(newJWTokens.newAccessToken);

        setRefreshToken(newJWTokens.newRefreshToken);

        isAlreadyFetchingAccessToken = false;
        onAccessTokenFetched(newJWTokens.newAccessToken);
    }

    return retryOriginalRequest(errorResponse);
}

const handleUnathenticatedRequestFromB2c = async (errorResponse, authenticationError) => {
    let accessToken;

    try {
        accessToken = getAccessToken();
    } catch (e) {
        console.error(e);
   }
 
    if (!accessToken) {
        // We can't refresh, throw the error
        return Promise.reject(authenticationError);
    }

    setAccessToken(accessToken);

    return retryOriginalRequest(errorResponse);
}

const retryOriginalRequest = (errorResponse) => {
    return new Promise(resolve => {
        addSubscriber(accessToken => {
            errorResponse.config.headers.Authorization = `Bearer ${accessToken}`;
            resolve(axios(errorResponse.config));
        });
    });
}

const acquireAccessToken = async (msalInstance) => {

    const activeAccount = msalInstance.getActiveAccount(); // This will only return a non-null value if you have logic somewhere else that calls the setActiveAccount API
    const accounts = msalInstance.getAllAccounts();

    if (!activeAccount && accounts.length === 0) {
        /*
        * User is not signed in. Throw error or wait for user to login.
        * Do not attempt to log a user in outside of the context of MsalProvider
        */   
    }
    const request = {
        scopes: ["User.Read"],
        account: activeAccount || accounts[0]
    };

    const authResult = await msalInstance.acquireTokenSilent(request);

    return authResult.accessToken
};

export const getAccessToken = async () => {
    return await acquireAccessToken(msalInstance);
}