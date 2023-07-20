import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Game } from 'models';
import type { RootState } from 'store';

export type GameState = {
  game?: Game,
  isGameLoading: boolean,
};

const initialState: GameState = {
  isGameLoading: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    gameStartedLoading: (state): void => {
      state.isGameLoading = true;
    },
    gameLoaded: (state, { payload }: PayloadAction<Game>): void => {
      state.game = payload;
      state.isGameLoading = false;
    },
  },
});

export default gameSlice.reducer;

export const {
  gameStartedLoading,
  gameLoaded,
} = gameSlice.actions;

export const selectGame = ({ game }: RootState): Game | undefined => game.game;
export const selectIsGameLoading = ({ game }: RootState): boolean => game.isGameLoading;
