import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from 'features/auth';
import { roomsReducer } from 'features/rooms';

const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
