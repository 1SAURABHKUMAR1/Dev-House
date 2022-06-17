import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomSliceIntial } from '../../Types';

const initialState: RoomSliceIntial = {};

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {},
    extraReducers: (builders) => {
        //
    },
});

export const roomsReducer = roomsSlice.reducer;
// export const {} = roomsSlice.actions;
