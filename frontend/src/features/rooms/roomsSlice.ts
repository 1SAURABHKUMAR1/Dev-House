import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createRoomResponse, RoomSliceIntial } from '../../Types';

const initialState: RoomSliceIntial = {
    roomId: '',
    roomPassword: '',
    qrcode: '',

    authenticated: false,
    _id: '',
    name: '',
    room_id: '',
    speakers: [],
    type: 'OPEN',
};

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setRoomLink: (
            state: RoomSliceIntial,
            action: PayloadAction<createRoomResponse>,
        ) => {
            state.roomId = action.payload.room.room_id;
            state.qrcode = action.payload.room.qrcode.secure_url;
            action.payload.room.type !== 'OPEN' &&
                (state.roomPassword = action.payload.room?.password ?? '');
        },
        setRoom: (
            state: RoomSliceIntial,
            action: PayloadAction<createRoomResponse>,
        ) => {
            state._id = action.payload.room._id;
            state.name = action.payload.room.name;
            state.room_id = action.payload.room.room_id;
            state.speakers = action.payload.room.speakers;
            state.type = action.payload.room.type;

            if (action.payload.room.type === 'OPEN') {
                state.authenticated = true;
            } else {
                state.authenticated = false;
            }
        },
        setUserAuthenticatedToJoin: (state: RoomSliceIntial) => {
            state.authenticated = true;
        },
        resetUserAuthRoom: (state: RoomSliceIntial) => {
            state.authenticated = false;
            state._id = '';
            state.name = '';
            state.room_id = '';
            state.speakers = [];
            state.type = 'OPEN';
        },
        setRoomDefault: (state: RoomSliceIntial) => {
            state.roomId = '';
            state.roomPassword = '';
            state.qrcode = '';
        },
    },
    extraReducers: (builders) => {
        //
    },
});

export const roomsReducer = roomsSlice.reducer;
export const {
    setRoomLink,
    setRoomDefault,
    setRoom,
    setUserAuthenticatedToJoin,
    resetUserAuthRoom,
} = roomsSlice.actions;
