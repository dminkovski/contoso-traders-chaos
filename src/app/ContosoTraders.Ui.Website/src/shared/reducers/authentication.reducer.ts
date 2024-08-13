import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'app/config/store';

export const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  isLoading: false,
};

export type AuthenticationState = Readonly<typeof initialState>;

export const dispatchIsLoading = (loading:boolean )=> (dispatch:Function ) => {
  dispatch(setLoading(loading));
}

export const dispatchLogout: () => AppThunk = () => (dispatch:Function) => {
  dispatch(logoutSession());
};

export const dispatchLogin = (user: any, token: string) => (dispatch:Function) => {
  const payload = {
    token,
    user
  };
  dispatch(loginSession(payload));
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
