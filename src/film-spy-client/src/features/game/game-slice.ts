import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Game, Order, User } from 'models';
import type { RootState } from 'store';

export type GameState = {
  orders: Order[],
  users: User[],
  isGameLoading: boolean,
};

const initialState: GameState = {
  orders: [],
  users: [],
  isGameLoading: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    gameLoadingStarted: (state): void => {
      state.isGameLoading = true;
    },
    gameLoaded: (state, { payload }: PayloadAction<Game>): void => {
      state.isGameLoading = false;
      state.orders = payload.orders;
      state.users = payload.users;
    },
  },
});

export default gameSlice.reducer;

export const { gameLoadingStarted, gameLoaded } = gameSlice.actions;

export const selectOrders = ({ game }: RootState): Order[] => game.orders;
export const selectUsers = ({ game }: RootState): User[] => game.users;
export const selectIsGameLoading = ({ game }: RootState): boolean => game.isGameLoading;
