import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Room } from 'models';

export type RoomState = {
  rooms: Room[],
  isLoading: boolean,
  selectedRoomId: number,
  isJoinRoomModalOpen: boolean,
};

const initialState: RoomState = {
  rooms: [],
  isLoading: false,
  selectedRoomId: 0,
  isJoinRoomModalOpen: false,
};

export const roomSlice = createSlice({
  name: 'room',
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

export default roomSlice.reducer;

export const {
  setRooms,
  setIsLoading,
  setSelectedRoomId,
  setIsJoinRoomModalOpen,
} = roomSlice.actions;

export const selectRooms = (state: RootState) => state.room.rooms;
export const selectIsLoading = (state: RootState) => state.room.isLoading;
export const selectSelectedRoomId = (state: RootState) => state.room.selectedRoomId;
export const selectIsJoinRoomModalOpen = (state: RootState) => state.room.isJoinRoomModalOpen;
