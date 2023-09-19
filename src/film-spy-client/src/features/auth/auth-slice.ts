import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { User } from 'models';
import type { RootState } from 'store';

export type AuthState = {
  isAuthenticated: boolean,
  isAuthenticationChecked: boolean,
  isAuthenticationChecking: boolean,
  user?: User,
  isLoggingOut: boolean,
};

const initialState: AuthState = {
  isAuthenticated: false,
  isAuthenticationChecked: false,
  isAuthenticationChecking: false,
  isLoggingOut: false,
};

const unauthenticate = (state: AuthState): void => {
  state.isAuthenticated = false;
  state.isAuthenticationChecked = true;
  state.isAuthenticationChecking = false;
  state.user = undefined;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticationCheckStarted: (state): void => {
      state.isAuthenticationChecking = true;
    },
    authenticated: (state, { payload }: PayloadAction<User>): void => {
      state.isAuthenticated = true;
      state.isAuthenticationChecked = true;
      state.isAuthenticationChecking = false;
      state.user = payload;
    },
    unauthenticated: (state): void => {
      unauthenticate(state);
    },
    logOutStarted: (state): void => {
      state.isLoggingOut = true;
    },
    loggedOut: (state): void => {
      unauthenticate(state);
      state.isLoggingOut = false;
    },
  },
});

export default authSlice.reducer;

export const {
  authenticationCheckStarted,
  authenticated,
  unauthenticated,
  logOutStarted,
  loggedOut,
} = authSlice.actions;

export const selectIsAuthenticated = ({ auth }: RootState): boolean =>
  auth.isAuthenticationChecked && auth.isAuthenticated;
export const selectIsUnauthenticated = ({ auth }: RootState): boolean =>
  auth.isAuthenticationChecked && !auth.isAuthenticated;
export const selectIsAuthenticationChecking = ({ auth }: RootState): boolean => auth.isAuthenticationChecking;
export const selectIsLoggingOut = ({ auth }: RootState): boolean => auth.isLoggingOut;
