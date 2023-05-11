import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Room } from 'models';

export type RoomsState = {
  rooms: Room[],
  isLoading: boolean,
  selectedRoomId: number,
  isJoinRoomModalOpen: boolean,
};

const initialState: RoomsState = {
  rooms: [],
  isLoading: false,
  selectedRoomId: 0,
  isJoinRoomModalOpen: false,
};

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms: (state, { payload }: PayloadAction<Room[]> ) => {
      state.rooms = payload;
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setSelectedRoomId: (state, { payload }: PayloadAction<number>) => {
      state.selectedRoomId = payload;
    },
    setIsJoinRoomModalOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isJoinRoomModalOpen = payload;
    },
  },
});

export default roomsSlice.reducer;

export const {
  setRooms,
  setIsLoading,
  setSelectedRoomId,
  setIsJoinRoomModalOpen,
} = roomsSlice.actions;

export const selectRooms = (state: RootState) => state.rooms.rooms;
export const selectIsLoading = (state: RootState) => state.rooms.isLoading;
export const selectSelectedRoomId = (state: RootState) => state.rooms.selectedRoomId;
export const selectIsJoinRoomModalOpen = (state: RootState) => state.rooms.isJoinRoomModalOpen;
