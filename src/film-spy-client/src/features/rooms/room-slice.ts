import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Room } from 'models';

export type RoomState = {
  rooms: Room[],
  isLoading: boolean,
};

const initialState: RoomState = {
  rooms: [],
  isLoading: false,
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
  },
});

export default roomSlice.reducer;

export const { setRooms, setIsLoading } = roomSlice.actions;

export const selectRooms = (state: RootState) => state.room.rooms;
export const selectIsLoading = (state: RootState) => state.room.isLoading;
