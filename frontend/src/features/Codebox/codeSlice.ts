import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { intialCodebox, setLanguageAction } from 'Types';

const initialState: intialCodebox = {
    codeBoxType: 'LIBRARY',
    language: 'REACT',
};

const codeSlice = createSlice({
    name: 'code',
    initialState,
    reducers: {
        setLanguage: (
            state: intialCodebox,
            action: PayloadAction<setLanguageAction>,
        ) => {
            if (
                action.payload.language === 'JAVASCRIPT' ||
                action.payload.language === 'CPP' ||
                action.payload.language === 'JAVA' ||
                action.payload.language === 'PYTHON'
            ) {
                state.codeBoxType = 'LANGUAGE';
                state.language = action.payload.language;
            } else {
                state.codeBoxType = 'LIBRARY';
                state.language = action.payload.language;
            }
        },
        resetLanguage: (state: intialCodebox) => {
            state.codeBoxType = 'LIBRARY';
            state.language = 'REACT';
        },
        setUserJoined: (state: intialCodebox) => {
            // set codeboxtype and language
        },
        // resetState: () => {
        //     //set language and library back to libray and react on codebox page unmount
        // },
    },
    extraReducers: (builder) => {
        //
    },
});

export const codeReducer = codeSlice.reducer;
export const { setLanguage, resetLanguage } = codeSlice.actions;
