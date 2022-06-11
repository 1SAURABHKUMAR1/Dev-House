import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    authAction,
    authSliceIntialState,
    emailAction,
    refreshTokenAction,
} from '../../Types';

const initialState: authSliceIntialState = {
    login: false,
    id: '',
    userId: '',
    username: '',
    name: '',
    email: '',
    mobile: '',
    photo: '',
    activated: false,
    authType: 'EMAIL',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEmail: (
            state: authSliceIntialState,
            action: PayloadAction<emailAction>,
        ) => {
            state.authType = action.payload.authType;
            if (action.payload.authType === 'MOBILE') {
                state.mobile = action.payload.mobile;
            } else {
                state.email = action.payload.email;
            }
        },

        setAuth: (
            state: authSliceIntialState,
            action: PayloadAction<authAction>,
        ) => {
            state.login = true;
            state.id = action.payload._id;
            state.userId = action.payload.user_id;
        },

        refreshToken: (
            state: authSliceIntialState,
            action: PayloadAction<refreshTokenAction>,
        ) => {
            if (action.payload.user.mobile) {
                state.authType = 'MOBILE';
                state.mobile = action.payload.user.mobile;
            } else if (action.payload.user.email) {
                state.authType = 'EMAIL';
                state.email = action.payload.user.email;
            }

            state.login = true;
            state.userId = action.payload.user.user_id;
            state.id = action.payload.user._id;
            state.activated = action.payload.user.activated;

            // state.photo = action.payload.user.profile_photo.secure_url;
            // // state.name = action.payload.user.name;
            // state.username = action.payload.user.username;
        },
    },
    extraReducers: (builders) => {
        //
    },
});

export const authReducer = authSlice.reducer;
export const {
    setEmail,
    setAuth,
    refreshToken: setRefreshToken,
} = authSlice.actions;
