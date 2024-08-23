/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel, PublicClientApplication } from "@azure/msal-browser";
import * as Constants from "app/config/constants";

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */

const msalConfig = {
    auth: {
        validateAuthority: false,
        clientId: Constants.CLIENT_ID || "NO_CLIENT_SPECIFIED",
        authority: Constants.AUTHORITY_URL || "https://login.microsoftonline.com",
        redirectUri: `${window.location.origin}`
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level, message, containsPii) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        //console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }	
            }	
        }	
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: [ "openid", "profile", Constants.AUTH_SCOPES]
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

// Create MSAL Instance
export const msalInstance = new PublicClientApplication(msalConfig);


export  interface MsalAuthenticationPayload {
    accessToken: string;
    account: any;
    authority: string;
    cloudGraphHostName: string;
    code?: string;
    correlationId: string;
    expiresOn: Date;
    extExpiresOn: Date;
    familyId: string;
    fromCache: boolean;
    fromNativeBroker: boolean;
    idToken: string;
    idTokenClaims: any;
    msGraphHost: string;
    refreshOn?: Date;
    requestId: string;
    scopes: string[];
    state: string;
    tenantId: string;
    tokenType: string;
    uniqueId: string;
}


export default msalConfig;