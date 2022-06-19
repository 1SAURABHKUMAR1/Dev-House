import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createRoomResponse, RoomSliceIntial } from '../../Types';

const initialState: RoomSliceIntial = {
    roomId: '',
    roomPassword: '',
    qrcode: '',
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
export const { setRoomLink, setRoomDefault } = roomsSlice.actions;
