import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { Message } from 'console-feed/lib/definitions/Component';
import {
    codeBoxResponseType,
    codeBoxType,
    fileFormat,
    intialCodebox,
    setLanguageAction,
} from 'Types';
import { codes } from 'Utils/Code';

import Prettier from 'prettier';
import prettierParser from 'prettier/parser-babel';
import ErrorToast from 'Utils/Toast/Error';

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
    allFiles: [
        {
            id: 'loading',
            directory: null,
            name: 'Loading....',
            type: 'directory',
        },
    ],
    selectedFile: {
        id: '',
        directory: null,
        name: '',
        type: 'directory',
    },
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
        setSelectedFile: (
            state: intialCodebox,
            action: PayloadAction<{ file: fileFormat }>,
        ) => {
            state.selectedFile = action.payload.file;
        },
        resetAllFiles: (state: intialCodebox) => {
            state.allFiles = codes[state.language] ?? [
                {
                    id: 'error',
                    directory: null,
                    name: 'Error',
                    type: 'directory',
                },
            ];
        },
        changeCode: (
            state: intialCodebox,
            action: PayloadAction<{ code: string }>,
        ) => {
            state.selectedFile.code = action.payload.code;
            state.allFiles = state.allFiles.map((file) =>
                file.id === state.selectedFile.id
                    ? {
                          ...file,
                          code: action.payload.code,
                      }
                    : file,
            );
        },
    },
    extraReducers: (builder) => {
        //
    },
});

export const resetCodeFn = (
    emit: boolean,
    dispatch: Dispatch,
    language: codeBoxType,
    codeBoxType: 'LIBRARY' | 'LANGUAGE',
) => {
    dispatch(resetAllFiles());

    const selectFile = codes[language].find((file) => {
        if (codeBoxType === 'LANGUAGE') {
            if (file.name === 'index.cpp') return file;
            if (file.name === 'index.py') return file;
        } else {
            if (language === 'VANILLA' && file.name === 'index.js') return file;
            // if (language === 'VANILLA TYPESCRIPT' && file.name === 'index.ts') return file;
            if (language === 'REACT' && file.name === 'index.jsx') return file;
            if (language === 'REACT TYPESCRIPT' && file.name === 'index.tsx')
                return file;
        }

        return file;
    });

    dispatch(
        setSelectedFile({
            file: selectFile ?? {
                id: '',
                directory: '',
                name: '',
                type: 'directory',
            },
        }),
    );

    // emit code //FIXME:
};

export const formatCode = (
    dispatch: Dispatch,
    language: codeBoxType,
    codeBoxType: 'LIBRARY' | 'LANGUAGE',
    selectedFile: fileFormat,
) => {
    if (language === 'JAVASCRIPT' || codeBoxType === 'LIBRARY') {
        const prettifiedCode = Prettier.format(selectedFile.code ?? '', {
            parser: 'babel',
            plugins: [prettierParser],
            arrowParens: 'always',
            bracketSameLine: true,
            singleQuote: true,
            semi: true,
            jsxSingleQuote: false,
            tabWidth: 4,
            endOfLine: 'lf',
            htmlWhitespaceSensitivity: 'css',
            jsxBracketSameLine: false,
            printWidth: 80,
            proseWrap: 'preserve',
            quoteProps: 'as-needed',
            requirePragma: false,
            trailingComma: 'all',
            useTabs: false,
        }).replace(/\n$/, '');

        dispatch(changeCode({ code: prettifiedCode }));
        // FIXME:
    } else {
        ErrorToast('Failed');
    }
};

export const codeReducer = codeSlice.reducer;
export const {
    setLanguage,
    setUserJoined: setUserJoinedCodebox,
    resetState: resetCodeboxState,
    setConsoleLogs,
    clearConsoleLogs,
    setSidebarComponent,
    setSelectedFile,
    resetAllFiles,
    changeCode,
} = codeSlice.actions;
