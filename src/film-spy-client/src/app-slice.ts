import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { User } from 'models';

export type AppState = {
  isAuthenticated: boolean,
  user?: User,
};

const initialState: AppState = {
  isAuthenticated: false,
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
  },
});

export default appSlice.reducer;

export const { authenticate, unauthenticate, setUser } = appSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.app.isAuthenticated;
export const selectUser = (state: RootState) => state.app.user;
