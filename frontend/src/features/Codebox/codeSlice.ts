import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const codeSlice = createSlice({
    name: 'code',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        //
    },
});

export const codeReducer = codeSlice.reducer;
