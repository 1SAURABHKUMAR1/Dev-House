import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAction, authSliceIntialState, emailAction } from '../../Types';

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
            action: PayloadAction<any>,
        ) => {
            // state.authType = ''
            state.login = true;
            state.userId = action.payload.user.user_id;
            state.username = action.payload.user.username;
            state.name = action.payload.user.name;
            state.email = action.payload.user.email;
            state.photo = action.payload.user.profile_photo.secure_url;
            state.id = action.payload.user._id;
            state.activated = action.payload.user.activated;
        },
    },
    extraReducers: (builders) => {
        //
    },
});

export const authReducer = authSlice.reducer;
export const { setEmail, setAuth } = authSlice.actions;
