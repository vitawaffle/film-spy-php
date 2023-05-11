import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { User } from 'models';

export type RoomState = {
  users: User[],
  isUsersLoading: boolean,
};

const initialState: RoomState = {
  users: [],
  isUsersLoading: false,
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setUsers: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload;
    },
    setIsUsersLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isUsersLoading = payload;
    },
    addUser: (state, { payload }: PayloadAction<User>) => {
      state.users = [...state.users, payload];
    },
    removeUser: (state, { payload }: PayloadAction<User>) => {
      state.users = state.users.filter(user => user.id !== payload.id);
    },
  },
});

export default roomSlice.reducer;

export const {
  setUsers,
  setIsUsersLoading,
  addUser,
  removeUser,
} = roomSlice.actions;

export const selectUsers = (state: RootState) => state.room.users;
export const selectIsUsersLoading = (state: RootState) => state.room.isUsersLoading;
