import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'store';
import type { User } from 'models';

export type AppState = {
  isAuthenticated: boolean,
  user?: User,
  isCheckingAuthentication: boolean,
  isLoggingOut: boolean,
};

const initialState: AppState = {
  isAuthenticated: false,
  isCheckingAuthentication: false,
  isLoggingOut: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    startedAuthenticating: (state): void => {
      state.isCheckingAuthentication = true;
    },
    authenticated: (state, { payload }: PayloadAction<User>): void => {
      state.user = payload;
      state.isAuthenticated = true;
    },
    endedAuthenticating: (state): void => {
      state.isCheckingAuthentication = false;
    },
    startedLoggingOut: (state): void => {
      state.isLoggingOut = true;
    },
    loggedOut: (state): void => {
      state.isAuthenticated = false;
      state.user = undefined;
      state.isLoggingOut = false;
    },
  },
});

export default appSlice.reducer;

export const {
  startedAuthenticating,
  authenticated,
  endedAuthenticating,
  startedLoggingOut,
  loggedOut,
} = appSlice.actions;

export const selectIsAuthenticated = ({ app }: RootState): boolean => app.isAuthenticated;
export const selectUser = ({ app }: RootState): User | undefined => app.user;
export const selectIsCheckingAuthentication = ({ app }: RootState): boolean => app.isCheckingAuthentication;
export const selectIsLoggingOut = ({ app }: RootState): boolean => app.isLoggingOut;
