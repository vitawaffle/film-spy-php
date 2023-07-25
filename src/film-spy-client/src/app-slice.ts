import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'store';
import type { Game, Room, User } from 'models';

export type AppState = {
  user?: User,
  isCheckingAuthentication: boolean,
  isLoggingOut: boolean,
};

const initialState: AppState = {
  isCheckingAuthentication: true,
  isLoggingOut: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    startedAuthenticating: (state): void => {
      state.isCheckingAuthentication = true;
    },
    endedAuthenticating: (state, { payload }: PayloadAction<User | undefined>): void => {
      state.user = payload;
      state.isCheckingAuthentication = false;
    },
    startedLoggingOut: (state): void => {
      state.isLoggingOut = true;
    },
    loggedOut: (state): void => {
      state.user = undefined;
      state.isLoggingOut = false;
    },
  },
});

export default appSlice.reducer;

export const {
  startedAuthenticating,
  endedAuthenticating,
  startedLoggingOut,
  loggedOut,
} = appSlice.actions;

export const selectIsAuthenticated = ({ app }: RootState): boolean => !!app.user;
export const selectUser = ({ app }: RootState): User | undefined => app.user;
export const selectIsCheckingAuthentication = ({ app }: RootState): boolean => app.isCheckingAuthentication;
export const selectIsLoggingOut = ({ app }: RootState): boolean => app.isLoggingOut;
export const selectRoom = ({ app }: RootState): Room | undefined => app.user?.room;
export const selectGame = ({ app }: RootState): Game | undefined => app.user?.game;
