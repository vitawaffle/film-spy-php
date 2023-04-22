import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

export type AppState = {
  isAuthenticated: boolean,
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
    },
  },
});

export default appSlice.reducer;

export const { authenticate, unauthenticate } = appSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.app.isAuthenticated;
