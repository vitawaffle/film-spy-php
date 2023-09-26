import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { User } from 'models';
import type { RootState } from 'store';

export type RoomState = {
  isUsersLoading: boolean,
  users: User[],
};

const initialState: RoomState = {
  isUsersLoading: false,
  users: [],
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    usersLoadingStarted: (state): void => {
      state.isUsersLoading = true;
    },
    usersLoaded: (state, { payload }: PayloadAction<User[]>): void => {
      state.isUsersLoading = false;
      state.users = payload;
    },
    userJoined: (state, { payload }: PayloadAction<User>): void => {
      state.users.push(payload);
    },
    userLeft: (state, { payload }: PayloadAction<User>): void => {
      state.users = state.users.filter(user => user.id !== payload.id);
    },
    userKicked: (state, { payload }: PayloadAction<User>): void => {
      state.users = state.users.filter(user => user.id !== payload.id);
    },
  },
});

export default roomSlice.reducer;

export const {
  usersLoadingStarted,
  usersLoaded,
  userJoined,
  userLeft,
  userKicked,
} = roomSlice.actions;

export const selectIsUsersLoading = ({ room }: RootState): boolean => room.isUsersLoading;
export const selectUsers = ({ room }: RootState): User[] => room.users;
