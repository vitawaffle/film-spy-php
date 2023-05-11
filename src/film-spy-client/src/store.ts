import { configureStore } from '@reduxjs/toolkit';
import app from 'app-slice';
import { roomsReducer as rooms } from 'features/rooms';
import { roomReducer as room } from 'features/room';

const store = configureStore({
  reducer: {
    app,
    rooms,
    room,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
