import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { User } from 'models';

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
    startedAuthenticating: state => {
      state.isCheckingAuthentication = true;
    },
    authenticated: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
      state.isAuthenticated = true;
    },
    endedAuthenticating: state => {
      state.isCheckingAuthentication = false;
    },
    startedLoggingOut: state => {
      state.isLoggingOut = true;
    },
    loggedOut: state => {
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

export const selectIsAuthenticated = ({ app }: RootState) =>
  app.isAuthenticated;
export const selectUser = ({ app }: RootState) => app.user;
export const selectIsCheckingAuthentication = ({ app }: RootState) =>
  app.isCheckingAuthentication;
export const selectIsLoggingOut = ({ app }: RootState) =>
  app.isLoggingOut;
