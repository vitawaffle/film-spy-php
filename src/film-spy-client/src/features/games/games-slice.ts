import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Game } from 'models';
import type { RootState } from 'store';

export type GamesState = {
  games: Game[],
};

const initialState: GamesState = {
  games: [],
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    gamesLoaded: (state, { payload }: PayloadAction<Game[]>): void => {
      state.games = payload;
    },
    gameStarted: (state, { payload }: PayloadAction<Game>): void => {
      state.games.push(payload);
    },
  },
});

export default gamesSlice.reducer;

export const { gamesLoaded, gameStarted } = gamesSlice.actions;

export const selectGames = ({ games }: RootState): Game[] => games.games;
