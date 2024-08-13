import { AuthenticationResult } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "app/config/authConfig";
import { IRootState } from "app/config/store";
import { AuthenticationState, dispatchIsLoading, dispatchLogin, dispatchLogout } from "app/shared/reducers/authentication.reducer";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const useAuthentication = () => {
  const user = useSelector((state:IRootState) => (state.authentication as AuthenticationState).user);
  const reduxIsAuthenticated = useSelector((state:IRootState) => (state.authentication as AuthenticationState).isAuthenticated);
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useSelector((state:IRootState) => (state.authentication as AuthenticationState).isLoading);

  const { instance } = useMsal();

  const login = async ():Promise<void> => {
    console.log("useAuthentication - login");
    if ((!reduxIsAuthenticated || !user) && !isLoading){
      dispatchIsLoading(true);
      const authResult:AuthenticationResult = await instance.loginPopup();
      dispatchIsLoading(false);
      if (authResult) { 
        const user = authResult.account;
        const accessToken = authResult.accessToken;
        dispatchLogin(user, accessToken);
      } else {
        console.error("There was an error during the MSAL Login Popup.");
      }
   
    }
  } 

  const logout = async ():Promise<void> => {
    await instance.logout();
    dispatchLogout();
    localStorage.clear();
  }

  return {
    state: {
      user,
      isAuthenticated
    },
    actions: {
      login,
      logout
    }
  }

  
}
export default useAuthentication;