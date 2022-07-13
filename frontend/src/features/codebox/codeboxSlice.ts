import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from 'console-feed/lib/definitions/Component';
import { codeBoxResponseType, intialCodebox, setLanguageAction } from 'Types';

const initialState: intialCodebox = {
    codeBoxType: 'LIBRARY',
    language: 'REACT',

    authenticated: 'IDLE',
    qrcode: {
        id: '',
        secure_url: '',
    },
    _id: '',
    name: '',
    codebox_id: '',
    creator: {
        name: '',
        _id: '',
        email: '',
        profile_photo: {
            id: '',
            secure_url: '',
        },
        user_id: '',
        username: '',
    },

    sidebarComponent: 'None',
    compiling: false,
    consoleLogs: [],
};

const codeSlice = createSlice({
    name: 'codebox',
    initialState,
    reducers: {
        setLanguage: (
            state: intialCodebox,
            action: PayloadAction<setLanguageAction>,
        ) => {
            if (
                action.payload.language === 'JAVASCRIPT' ||
                action.payload.language === 'CPP' ||
                action.payload.language === 'PYTHON'
            ) {
                state.codeBoxType = 'LANGUAGE';
                state.language = action.payload.language;
            } else {
                state.codeBoxType = 'LIBRARY';
                state.language = action.payload.language;
            }
        },
        setUserJoined: (
            state: intialCodebox,
            action: PayloadAction<codeBoxResponseType>,
        ) => {
            if (
                action.payload.language === 'JAVASCRIPT' ||
                action.payload.language === 'CPP' ||
                action.payload.language === 'PYTHON'
            ) {
                state.codeBoxType = 'LANGUAGE';
                state.language = action.payload.language;
            } else {
                state.codeBoxType = 'LIBRARY';
                state.language = action.payload.language;
            }

            state.authenticated = 'AUTHENTICATED';
            state.qrcode = action.payload.qrcode;
            state.name = action.payload.name;
            state.codebox_id = action.payload.codebox_id;
            state.creator = action.payload.creator;
            state._id = action.payload._id;
        },
        resetState: (state: intialCodebox) => {
            state.codeBoxType = 'LIBRARY';
            state.language = 'REACT';

            state.authenticated = 'IDLE';
            state.qrcode = {
                id: '',
                secure_url: '',
            };
            state._id = '';
            state.name = '';
            state.codebox_id = '';
            state.creator = {
                name: '',
                _id: '',
                email: '',
                profile_photo: {
                    id: '',
                    secure_url: '',
                },
                user_id: '',
                username: '',
            };

            state.sidebarComponent = 'None';
            state.compiling = false;
            state.consoleLogs = [];
        },

        setConsoleLogs: (
            state: intialCodebox,
            action: PayloadAction<Message>,
        ) => {
            state.consoleLogs = [...state.consoleLogs, action.payload];
        },
        clearConsoleLogs: (state: intialCodebox) => {
            state.consoleLogs = [];
        },
        setSidebarComponent: (
            state: intialCodebox,
            action: PayloadAction<{
                component: 'Files' | 'Users' | 'Chat' | 'Collaborate' | 'None';
            }>,
        ) => {
            state.sidebarComponent = action.payload.component;
        },
    },
    extraReducers: (builder) => {
        //
    },
});

export const codeReducer = codeSlice.reducer;
export const {
    setLanguage,
    setUserJoined: setUserJoinedCodebox,
    resetState: resetCodeboxState,
    setConsoleLogs,
    clearConsoleLogs,
    setSidebarComponent,
} = codeSlice.actions;