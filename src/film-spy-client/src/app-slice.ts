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
    authenticate: state => {
      state.isAuthenticated = true;
    },
    unauthenticate: state => {
      state.isAuthenticated = false;
      state.user = undefined;
    },
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    setIsCheckingAuthentication: (state, { payload }: PayloadAction<boolean>) => {
      state.isCheckingAuthentication = payload;
    },
    setIsLoggingOut: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoggingOut = payload;
    },
  },
});

export default appSlice.reducer;

export const {
  authenticate,
  unauthenticate,
  setUser,
  setIsCheckingAuthentication,
  setIsLoggingOut,
} = appSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.app.isAuthenticated;
export const selectUser = (state: RootState) => state.app.user;
export const selectIsCheckingAuthentication = (state: RootState) => state.app.isCheckingAuthentication;
export const selectIsLoggingOut = (state: RootState) => state.app.isLoggingOut;
