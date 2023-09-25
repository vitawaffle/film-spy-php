import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Room } from 'models';
import type { RootState } from 'store';

export type RoomsState = {
  isRoomsLoading: boolean,
  rooms: Room[],
  selectedRoom?: Room,
  isJoinedRoomsLoading: boolean,
  joinedRooms: Room[],
};

const initialState: RoomsState = {
  isRoomsLoading: false,
  rooms: [],
  isJoinedRoomsLoading: false,
  joinedRooms: [],
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
    roomCreated: (state, { payload }: PayloadAction<Room>): void => {
      state.rooms.push(payload);
    },
    roomSelected: (state, { payload }: PayloadAction<Room>): void => {
      state.selectedRoom = payload;
    },
    roomUnselected: (state): void => {
      state.selectedRoom = undefined;
    },
    joinedRoomsLoadingStarted: (state): void => {
      state.isJoinedRoomsLoading = true;
    },
    joinedRoomsLoaded: (state, { payload }: PayloadAction<Room[]>): void => {
      state.isJoinedRoomsLoading = false;
      state.joinedRooms = payload;
    },
    roomJoined: (state, { payload }: PayloadAction<Room>): void => {
      state.joinedRooms.push(payload);
      state.selectedRoom = undefined;
    },
  },
});

export default roomsSlice.reducer;

export const {
  roomsLoadingStarted,
  roomsLoaded,
  roomCreated,
  roomSelected,
  roomUnselected,
  joinedRoomsLoadingStarted,
  joinedRoomsLoaded,
  roomJoined,
} = roomsSlice.actions;

export const selectIsRoomsLoading = ({ rooms }: RootState): boolean => rooms.isRoomsLoading;
export const selectRooms = ({ rooms }: RootState): Room[] => rooms.rooms;
export const selectSelectedRoom = ({ rooms }: RootState): Room | undefined => rooms.selectedRoom;
export const selectIsJoinedRoomsLoading = ({ rooms }: RootState): boolean => rooms.isJoinedRoomsLoading;
export const selectJoinedRooms = ({ rooms }: RootState): Room[] => rooms.joinedRooms;
