import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import type { Room, User } from 'models';

export type RoomState = {
  rooms: Room[],
  isRoomsLoading: boolean,
  selectedRoom?: Room,
  isJoinRoomModalOpen: boolean,
  currentRoom?: Room,
  users: User[],
  isUsersLoading: boolean,
};

const initialState: RoomState = {
  rooms: [],
  isRoomsLoading: false,
  isJoinRoomModalOpen: false,
  users: [],
  isUsersLoading: false,
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    roomsLoadingStarted: (state): void => {
      state.isRoomsLoading = true;
    },
    roomsLoaded: (state, { payload }: PayloadAction<Room[]>): void => {
      state.rooms = payload;
      state.isRoomsLoading = false;
    },
    roomCreated: (state, { payload }: PayloadAction<Room>): void => {
      const index = state.rooms.findIndex(room => room.id === payload.id);

      if (index === -1)
        state.rooms.push(payload);
      else
        state.rooms[index] = payload;
    },
    roomDeleted: (state, { payload }: PayloadAction<Room>): void => {
      state.rooms = state.rooms.filter(room => room.id !== payload.id);
    },
    roomSelected: (state, { payload }: PayloadAction<Room>): void => {
      state.selectedRoom = payload;
      state.isJoinRoomModalOpen = true;
    },
    roomUnselected: (state): void => {
      state.selectedRoom = undefined;
      state.isJoinRoomModalOpen = false;
    },
    roomJoined: (state, { payload }: PayloadAction<Room>): void => {
      state.currentRoom = payload;
      state.isJoinRoomModalOpen = false;
    },
    roomLeft: (state): void => {
      state.currentRoom = undefined;
    },
    usersLoadingStarted: (state): void => {
      state.isUsersLoading = true;
    },
    usersLoaded: (state, { payload }): void => {
      state.users = payload;
      state.isUsersLoading = false;
    },
  },
});

export default roomSlice.reducer;

export const {
  roomsLoadingStarted,
  roomsLoaded,
  roomCreated,
  roomDeleted,
  roomSelected,
  roomUnselected,
  roomJoined,
  roomLeft,
  usersLoadingStarted,
  usersLoaded,
} = roomSlice.actions;

export const selectRooms = ({ room }: RootState): Room[] => room.rooms;
export const selectIsRoomsLoading = ({ room }: RootState): boolean => room.isRoomsLoading;
export const selectSelectedRoom = ({ room }: RootState): Room | undefined => room.selectedRoom;
export const selectIsJoinRoomModalOpen = ({ room }: RootState): boolean => room.isJoinRoomModalOpen;
export const selectCurrentRoom = ({ room }: RootState): Room | undefined => room.currentRoom;
export const selectUsers = ({ room }: RootState): User[] => room.users;
export const selectIsUsersLoading = ({ room }: RootState): boolean => room.isUsersLoading;
