import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Room } from 'models';
import type { RootState } from 'store';

export type RoomsState = {
  isRoomsLoading: boolean,
  rooms: Room[],
};

const initialState: RoomsState = {
  isRoomsLoading: false,
  rooms: [],
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    roomsLoadingStarted: (state): void => {
      state.isRoomsLoading = true;
    },
    roomsLoaded: (state, { payload }: PayloadAction<Room[]>): void => {
      state.isRoomsLoading = false;
      state.rooms = payload;
    },
  },
});

export default roomsSlice.reducer;

export const { roomsLoadingStarted, roomsLoaded } = roomsSlice.actions;

export const selectIsRoomsLoading = ({ rooms }: RootState): boolean => rooms.isRoomsLoading;
export const selectRooms = ({ rooms }: RootState): Room[] => rooms.rooms;
