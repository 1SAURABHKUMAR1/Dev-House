import { configureStore } from '@reduxjs/toolkit';

import { activateReducer, authReducer, roomsReducer } from '../features';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        activate: activateReducer,
        rooms: roomsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
