import { createSlice } from '@reduxjs/toolkit';
import { authSliceIntialState } from '../../Types';

const initialState: authSliceIntialState = {
    login: false,
    userId: '',
    username: '',
    name: '',
    email: '',
    photo: '',
    id: '',
    getAuthState: 'IDLE',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builders) => {
        //
    },
});

export const authReducer = authSlice.reducer;
