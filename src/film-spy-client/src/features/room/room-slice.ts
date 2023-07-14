import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Room, User } from 'models';

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
    roomsLoadingStarted: state => {
      state.isRoomsLoading = true;
    },
    roomsLoaded: (state, { payload }: PayloadAction<Room[]>) => {
      state.rooms = payload;
      state.isRoomsLoading = false;
    },
    roomSelected: (state, { payload }: PayloadAction<Room>) => {
      state.selectedRoom = payload;
      state.isJoinRoomModalOpen = true;
    },
    roomUnselected: state => {
      state.selectedRoom = undefined;
      state.isJoinRoomModalOpen = false;
    },
    roomJoined: (state, { payload }: PayloadAction<Room>) => {
      state.currentRoom = payload;
      state.isJoinRoomModalOpen = false;
    },
    roomLeft: state => {
      state.currentRoom = undefined;
    },
    usersLoadingStarted: state => {
      state.isUsersLoading = true;
    },
    usersLoaded: (state, { payload }) => {
      state.users = payload;
      state.isUsersLoading = false;
    },
  },
});

export default roomSlice.reducer;

export const {
  roomsLoadingStarted,
  roomsLoaded,
  roomSelected,
  roomUnselected,
  roomJoined,
  roomLeft,
  usersLoadingStarted,
  usersLoaded,
} = roomSlice.actions;

export const selectRooms = ({ room }: RootState) => room.rooms;
export const selectIsRoomsLoading = ({ room }: RootState) =>
  room.isRoomsLoading;
export const selectSelectedRoom = ({ room }: RootState) => room.selectedRoom;
export const selectIsJoinRoomModalOpen = ({ room }: RootState) =>
  room.isJoinRoomModalOpen;
export const selectCurrentRoom = ({ room }: RootState) => room.currentRoom;
export const selectUsers = ({ room }: RootState) => room.users;
export const selectIsUsersLoading = ({ room }: RootState) =>
  room.isUsersLoading;
