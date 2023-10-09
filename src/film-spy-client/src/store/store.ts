import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from 'features/auth';
import { gamesReducer } from 'features/games';
import { roomReducer } from 'features/room';
import { roomsReducer } from 'features/rooms';

const store = configureStore({
  reducer: {
    auth: authReducer,
    games: gamesReducer,
    room: roomReducer,
    rooms: roomsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
