import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { setItemValue } from 'app/helpers/localStorage';

export const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  isLoading: false,
};

export type AuthenticationState = Readonly<typeof initialState>;

export const dispatchIsLoading = (loading:boolean )=> {
  return {
    type: 'setLoading',
    payload: { loading }
  }
}

export const dispatchLogout = () => {
//  localStorage.clear();
  return {
    type: 'logoutSession',
    payload: {}
  }
};

export const dispatchLogin = (user: any, token: string) => {
  const payload = {
    token,
    user
  };
  setItemValue("token", token);
  setItemValue("user", user);
  return {
    type: 'loginSession',
    payload
  }
};

export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialState as AuthenticationState,
  reducers: {
    logoutSession() {
      return {
        ...initialState,
      };
    },
    loginSession(state:AuthenticationState, action: PayloadAction<any>) {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user
      };
    },
    setLoading(state: AuthenticationState, action: PayloadAction<boolean>) {
      return {
        ...state,
        isLoading: action.payload
      };
    }
  },
});

export const { logoutSession, loginSession, setLoading } = AuthenticationSlice.actions;


export default AuthenticationSlice.reducer;
