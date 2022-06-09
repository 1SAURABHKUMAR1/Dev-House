import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        //
    },
});

export const homeReducer = homeSlice.reducer;
