import { configureStore } from '@reduxjs/toolkit';
import app from 'app-slice';
import { roomReducer as room } from 'features/rooms';

const store = configureStore({
  reducer: {
    app,
    room,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
