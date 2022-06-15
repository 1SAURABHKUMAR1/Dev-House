import { configureStore } from '@reduxjs/toolkit';

import {
    activateReducer,
    authReducer,
    homeReducer,
    roomsReducer,
} from '../features';

export const store = configureStore({
    reducer: {
        home: homeReducer,
        auth: authReducer,
        activate: activateReducer,
        rooms: roomsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
