import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'store';
import type { Game, Room, User } from 'models';

export type AppState = {
  user?: User,
  isCheckingAuthentication: boolean,
  isLoggingOut: boolean,
  rooms: Room[],
  isRoomsLoading: boolean,
  selectedRoom?: Room,
  users: User[],
  isUsersLoading: boolean,
  isJoinRoomModalOpen: boolean,
  isGameLoading: boolean,
};

const initialState: AppState = {
  isCheckingAuthentication: true,
  isLoggingOut: false,
  rooms: [],
  isRoomsLoading: true,
  users: [],
  isUsersLoading: true,
  isJoinRoomModalOpen: false,
  isGameLoading: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    startedAuthenticating: (state): void => {
      state.isCheckingAuthentication = true;
    },
    endedAuthenticating: (state, { payload }: PayloadAction<User | undefined>): void => {
      state.user = payload;
      state.isCheckingAuthentication = false;
    },
    startedLoggingOut: (state): void => {
      state.isLoggingOut = true;
    },
    loggedOut: (state): void => {
      state.user = undefined;
      state.users = [];
      state.rooms = [];
      state.selectedRoom = undefined;
      state.isLoggingOut = false;
    },
    roomJoined: (state, { payload }: PayloadAction<Room>): void => {
      if (state.user)
        state.user.room = payload;
      state.isJoinRoomModalOpen = false;
    },
    roomLeft: (state): void => {
      if (state.user)
        state.user.room = undefined;
    },
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
      if (state.user && state.user.room && state.user.room.id === payload.id)
        state.user.room = undefined;
      state.rooms = state.rooms.filter(room => room.id !== payload.id);
    },
    roomSelected: (state, { payload }: PayloadAction<Room>): void => {
      state.selectedRoom = payload;
      state.isJoinRoomModalOpen = true;
    },
    roomUnselected: (state): void => {
      state.isJoinRoomModalOpen = false;
      state.selectedRoom = undefined;
    },
    usersLoadingStarted: (state): void => {
      state.isUsersLoading = true;
    },
    usersLoaded: (state, { payload }: PayloadAction<User[]>): void => {
      state.users = payload;
      state.isUsersLoading = false;
    },
    userJoined: (state, { payload }: PayloadAction<User>): void => {
      const index = state.users.findIndex(user => user.id === payload.id);

      if (index === -1)
        state.users.push(payload);
      else
        state.users[index] = payload;
    },
    userLeft: (state, { payload }: PayloadAction<User>): void => {
      state.users = state.users.filter(user => user.id !== payload.id);
    },
    userKicked: (state, { payload }: PayloadAction<User>): void => {
      if (state.user && state.user.room && state.user.id === payload.id)
        state.user.room = undefined;

      state.users = state.users.filter(user => user.id !== payload.id);
    },
    gameLoadingStarted: (state): void => {
      state.isGameLoading = true;
    },
    gameLoaded: (state, { payload }: PayloadAction<Game | undefined>): void => {
      if (state.user)
        state.user.game = payload;
      state.isGameLoading = false;
    },
  },
});

export default appSlice.reducer;

export const {
  startedAuthenticating,
  endedAuthenticating,
  startedLoggingOut,
  loggedOut,
  roomJoined,
  roomLeft,
  roomsLoadingStarted,
  roomsLoaded,
  roomCreated,
  roomDeleted,
  roomSelected,
  roomUnselected,
  usersLoadingStarted,
  usersLoaded,
  userJoined,
  userLeft,
  userKicked,
  gameLoadingStarted,
  gameLoaded,
} = appSlice.actions;

export const selectIsAuthenticated = ({ app }: RootState): boolean => !!app.user;
export const selectUser = ({ app }: RootState): User | undefined => app.user;
export const selectIsCheckingAuthentication = ({ app }: RootState): boolean => app.isCheckingAuthentication;
export const selectIsLoggingOut = ({ app }: RootState): boolean => app.isLoggingOut;
export const selectRoom = ({ app }: RootState): Room | undefined => app.user?.room;
export const selectGame = ({ app }: RootState): Game | undefined => app.user?.game;
export const selectRooms = ({ app }: RootState): Room[] => app.rooms;
export const selectIsRoomsLoading = ({ app }: RootState): boolean => app.isRoomsLoading;
export const selectSelectedRoom = ({ app }: RootState): Room | undefined => app.selectedRoom;
export const selectIsJoinRoomModalOpen = ({ app }: RootState): boolean => app.isJoinRoomModalOpen;
export const selectUsers = ({ app }: RootState): User[] => app.users;
export const selectIsUsersLoading = ({ app }: RootState): boolean => app.isUsersLoading;
export const selectIsGameLoading = ({ app }: RootState): boolean => app.isGameLoading;
export const selectIsGameStarted = (state: RootState): boolean => !!selectGame(state);
export const selectPlayers = (state: RootState): User[] => selectGame(state)?.users ?? [];
