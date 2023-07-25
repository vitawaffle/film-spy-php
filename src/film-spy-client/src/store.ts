import { configureStore } from '@reduxjs/toolkit';

import app from 'app-slice';
import { gameReducer as game } from 'features/game';

const store = configureStore({
  reducer: {
    app,
    game,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
