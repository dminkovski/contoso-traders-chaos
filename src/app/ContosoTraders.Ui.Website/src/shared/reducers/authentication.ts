import {  createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from 'app/config/store';

export const initialState = {
  loading: false,
  isAuthenticated: false,
  token: '',
  user: null,
};

export type AuthenticationState = Readonly<typeof initialState>;


export const logout: () => AppThunk = () => (dispatch:Function) => {
  dispatch(logoutSession());
};

export const login = (user: any, token: string) => (dispatch:Function) => {
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
  },
});

export const { logoutSession, loginSession } = AuthenticationSlice.actions;


export default AuthenticationSlice.reducer;
