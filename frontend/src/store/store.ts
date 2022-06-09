import { configureStore } from '@reduxjs/toolkit';

import { authReducer, homeReducer } from '../features';

export const store = configureStore({
    reducer: {
        home: homeReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
