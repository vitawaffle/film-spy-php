import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Room } from 'models';
import type { RootState } from 'store';

export type RoomsState = {
  isRoomsLoading: boolean,
  isRoomsLoaded: boolean,
  rooms: Room[],
  selectedRoom?: Room,
  isJoinedRoomsLoading: boolean,
  isJoinedRoomsLoaded: boolean,
  joinedRooms: Room[],
  lastDeletedRoomId?: number,
};

const initialState: RoomsState = {
  isRoomsLoading: false,
  isRoomsLoaded: false,
  rooms: [],
  isJoinedRoomsLoading: false,
  isJoinedRoomsLoaded: false,
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
      state.isRoomsLoaded = true;
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
      state.isJoinedRoomsLoaded = true;
      state.joinedRooms = payload;
    },
    roomJoined: (state, { payload }: PayloadAction<Room>): void => {
      state.joinedRooms.push(payload);
      state.selectedRoom = undefined;
    },
    roomDeleted: (state, { payload }: PayloadAction<Room>): void => {
      state.joinedRooms = state.joinedRooms.filter(room => room.id !== payload.id);
      state.rooms = state.rooms.filter(room => room.id !== payload.id);
      state.lastDeletedRoomId = payload.id;
    },
    roomLeft: (state, { payload }: PayloadAction<number>): void => {
      state.joinedRooms = state.joinedRooms.filter(room => room.id !== payload);
    },
    roomKicked: (state, { payload }: PayloadAction<Room>): void => {
      state.joinedRooms = state.joinedRooms.filter(room => room.id !== payload.id);
    },
    navigatedAfterDeletion: (state): void => {
      state.lastDeletedRoomId = undefined;
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
  roomDeleted,
  roomLeft,
  roomKicked,
  navigatedAfterDeletion,
} = roomsSlice.actions;

export const selectIsRoomsLoading = ({ rooms }: RootState): boolean => rooms.isRoomsLoading;
export const selectIsRoomsLoaded = ({ rooms }: RootState): boolean => rooms.isRoomsLoaded;
export const selectRooms = ({ rooms }: RootState): Room[] => rooms.rooms;
export const selectSelectedRoom = ({ rooms }: RootState): Room | undefined => rooms.selectedRoom;
export const selectIsJoinedRoomsLoading = ({ rooms }: RootState): boolean => rooms.isJoinedRoomsLoading;
export const selectIsJoinedRoomsLoaded = ({ rooms }: RootState): boolean => rooms.isJoinedRoomsLoaded;
export const selectJoinedRooms = ({ rooms }: RootState): Room[] => rooms.joinedRooms;
export const selectRoomById = (id: number) => ({ rooms }: RootState): Room | undefined =>
  rooms.rooms.find(room => room.id === id);
export const selectLastDeletedRoomId = ({ rooms }: RootState): number | undefined =>
  rooms.lastDeletedRoomId;
