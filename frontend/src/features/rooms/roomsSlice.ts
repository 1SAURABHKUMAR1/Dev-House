import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {} from '../../Types';

const initialState = {};

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builders) => {
        //
    },
});

export const roomsReducer = roomsSlice.reducer;
export const {} = roomsSlice.actions;
