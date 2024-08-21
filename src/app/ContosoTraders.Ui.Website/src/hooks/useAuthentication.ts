import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "app/config/msalConfig";
import getStore, { IRootState } from "app/config/store";
import { AuthenticationSlice, AuthenticationState, dispatchLogout } from "app/shared/reducers/authentication.reducer";
import { useSelector } from "react-redux";

const useAuthentication = () => {
  const user = useSelector((state:IRootState) => (state.authentication as AuthenticationState).user);
  const isAuthenticated = useIsAuthenticated();

  const { instance, accounts } = useMsal();

  // Tries to acquire the token using the existing account - response is handled by callback: msalInstance.addEventCallback
  const loginSilent = async():Promise<void> => {
    if (accounts.length > 0){
      getStore().dispatch(AuthenticationSlice.actions.logoutSession());
      const account = accounts[0];
      await instance.acquireTokenSilent({
        scopes: loginRequest.scopes,
        account
      });
    } else {
      console.warn("No logged in MSAL account present. Background token acquisition is not possible.");
    }
  };

  // Tries to login the user using the MSAL popup - response is handled by callback: msalInstance.addEventCallback
  const login = async ():Promise<void> => {
      getStore().dispatch(AuthenticationSlice.actions.logoutSession());
      await instance.loginPopup();
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
      logout,
      loginSilent
    }
  }

  
}
export default useAuthentication;