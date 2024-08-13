import { AuthenticationResult } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "app/config/authConfig";
import { IRootState } from "app/config/store";
import { AuthenticationState, dispatchLogin, dispatchLogout } from "app/shared/reducers/authentication.reducer";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useAuthentication = () => {
  const user = useSelector((state:IRootState) => (state.authentication as AuthenticationState).user);
  const reduxIsAuthenticated = useSelector((state:IRootState) => (state.authentication as AuthenticationState).isAuthenticated);
  const isAuthenticated = useIsAuthenticated();

  const { instance, accounts, inProgress } = useMsal();

  // Start a Login process if the user is not authenticated and there is no login process already going on.
  useEffect(() => {
    if (!isAuthenticated && !inProgress) {
      dispatchLogout();
      login();
    } else {
      if (accounts.length > 0 && !inProgress){
        const account = accounts[0];
        instance.acquireTokenSilent({
          scopes: loginRequest.scopes,
          account
        }).then((response) => {
            if(response) {
              dispatchLogin(account, response.accessToken);
            }
        });
      }
    }
  }, [isAuthenticated, inProgress, accounts]);

  const login = async ():Promise<void> => {
    if (!reduxIsAuthenticated || !user){
      const authResult:AuthenticationResult = await instance.loginPopup();
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