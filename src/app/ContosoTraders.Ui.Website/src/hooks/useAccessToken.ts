import React, { useState, useEffect } from "react"
import { useMsal, useAccount } from "@azure/msal-react";
import { graphConfig } from "../config/authConfig";
import { AuthenticationResult } from "@azure/msal-browser";


/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken 
 */
export async function callMsGraph(accessToken:any) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
      method: "GET",
      headers: headers
  };

  return fetch(graphConfig.graphMeEndpoint, options)
      .then(response => response.json())
      .catch(error => console.log(error));
}


const useAccessToken = () => {
    const { instance, accounts } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [apiData, setApiData] = useState(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (account) {
            instance.acquireTokenSilent({
                scopes: ["User.Read"],
                account: account
            }).then((tokenResponse:AuthenticationResult) => {
                setToken(tokenResponse?.accessToken);
                /*if(tokenResponse) {
                    callMsGraph(response.accessToken).then((result:any) => setApiData(result));
                }*/
            });
        }
    }, [account, instance]);

    return token;
}

export default useAccessToken;