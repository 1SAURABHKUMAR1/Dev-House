import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from 'console-feed/lib/definitions/Component';
import {
    chatType,
    codeBoxResponseType,
    codeBoxType,
    fileFormat,
    intialCodebox,
    setLanguageAction,
    socketCodeboxUser,
} from 'Types';
import { codes } from 'Utils/Code';

import Prettier from 'prettier';
import prettierParser from 'prettier/parser-babel';

import ErrorToast from 'Utils/Toast/Error';

import { socket } from 'Socket/socket';
import {
    ACTIONS_ADD_FILES_CODE_CLIENT,
    ACTIONS_CODE_CLIENT_CODE,
    ACTIONS_RENAME_CODE_FILE_CLIENT,
    ACTIONS_RESET_CODE_CLIENT,
} from 'Socket/actions';
import { AppDispatch } from 'store/store';

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

    users: [],
    chats: [],
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

            state.allFiles = [
                {
                    id: 'loading',
                    directory: null,
                    name: 'Loading....',
                    type: 'directory',
                },
            ];
            state.selectedFile = {
                id: '',
                directory: null,
                name: '',
                type: 'directory',
            };

            state.users = [];
            state.chats = [];
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
            action: PayloadAction<{ code: string; file: fileFormat }>,
        ) => {
            if (state.selectedFile.id === action.payload.file.id) {
                state.selectedFile.code = action.payload.code;
            }

            state.allFiles = state.allFiles.map((file) =>
                file.id === action.payload.file.id
                    ? {
                          ...file,
                          code: action.payload.code,
                      }
                    : file,
            );
        },
        addUsers: (
            state: intialCodebox,
            action: PayloadAction<{
                user: socketCodeboxUser | socketCodeboxUser[];
            }>,
        ) => {
            if (Array.isArray(action.payload.user)) {
                state.users = action.payload.user;
            } else {
                const isPresent = state.users.find(
                    (singleUser) =>
                        // @ts-ignore
                        singleUser.userId === action.payload.user?.userId &&
                        // @ts-ignore
                        singleUser.username === action.payload.user?.username,
                );

                if (!isPresent) {
                    state.users = [...state.users, action.payload.user];
                }
            }
        },
        removeUsers: (
            state: intialCodebox,
            action: PayloadAction<{ userId: string }>,
        ) => {
            state.users = state.users.filter(
                (user) => user.userId !== action.payload.userId,
            );
        },
        addChats: (
            state: intialCodebox,
            action: PayloadAction<{ chat: chatType | chatType[] }>,
        ) => {
            if (Array.isArray(action.payload.chat)) {
                state.chats = action.payload.chat;
            } else {
                const isPresent = state.chats.find(
                    // @ts-ignore
                    (chat) => chat.messageId === action.payload.chat.messageId,
                );

                if (!isPresent) {
                    state.chats = [...state.chats, action.payload.chat];
                }
            }
        },
        changeFileName: (
            state: intialCodebox,
            action: PayloadAction<{ file: fileFormat; fileName: string }>,
        ) => {
            state.allFiles = state.allFiles.map((file) =>
                file.id === action.payload.file.id
                    ? {
                          ...file,
                          name: action.payload.fileName,
                      }
                    : file,
            );
        },
        addFiles: (
            state: intialCodebox,
            action: PayloadAction<{ file: fileFormat | fileFormat[] }>,
        ) => {
            if (Array.isArray(action.payload.file)) {
                state.allFiles = action.payload.file;
            } else {
                const isPresent = state.allFiles.find(
                    // @ts-ignore
                    (file) => file.name === action.payload.file?.name,
                );

                if (!isPresent) {
                    state.allFiles = [...state.allFiles, action.payload.file];
                }
            }
        },
    },
    extraReducers: (builder) => {
        //
    },
});

export const resetCodeFn = (
    emit: boolean,
    dispatch: AppDispatch,
    language: codeBoxType,
    codeBoxType: 'LIBRARY' | 'LANGUAGE',
    codebox_id: string,
) => {
    dispatch(resetAllFiles());

    const selectFile = codes[language].find((file) => {
        if (codeBoxType === 'LANGUAGE') {
            if (file.name === 'index.cpp') return file;
            if (file.name === 'index.py') return file;
        } else {
            if (language === 'VANILLA' && file.name === 'index.js') return file;
            // if (language === 'VANILLA TYPESCRIPT' && file.name === 'index.ts') return file;
            if (
                language === 'REACT' &&
                (file.name === 'index.jsx' || file.name === 'index.js')
            )
                return file;
            if (
                language === 'REACT TYPESCRIPT' &&
                (file.name === 'index.tsx' || file.name === 'index.ts')
            )
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

    if (emit) {
        socket.emit(ACTIONS_RESET_CODE_CLIENT, {
            language,
            codeBoxType,
            codebox_id,
        });
    }
};

export const formatCode = (
    dispatch: AppDispatch,
    language: codeBoxType | 'js' | 'ts' | 'tsx' | 'jsx',
    selectedFile: fileFormat,
    codebox_id: string,
) => {
    if (
        language === 'JAVASCRIPT' ||
        language === 'js' ||
        language === 'jsx' ||
        language === 'ts' ||
        language === 'tsx'
    ) {
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

        dispatch(changeCode({ code: prettifiedCode, file: selectedFile }));

        socket.emit(ACTIONS_CODE_CLIENT_CODE, {
            codebox_id,
            code: prettifiedCode,
            file: selectedFile,
        });
    } else {
        ErrorToast('Failed');
    }
};

export const selectFile = (file: fileFormat, dispatch: AppDispatch) =>
    dispatch(setSelectedFile({ file: file }));

export const renameFile = (
    file: fileFormat,
    dispatch: AppDispatch,
    fileName: string,
    codebox_id: string,
) => {
    dispatch(changeFileName({ file, fileName }));

    socket.emit(ACTIONS_RENAME_CODE_FILE_CLIENT, {
        file,
        fileName,
        codebox_id,
    });
};

export const createFileFolder = (
    dispatch: AppDispatch,
    file: fileFormat,
    codebox_id: string,
) => {
    dispatch(addFiles({ file }));

    socket.emit(ACTIONS_ADD_FILES_CODE_CLIENT, {
        file,
        codebox_id,
    });
};

// const removeFile = (file: fileFormat , disptach : AppDisptach) => {
//     //
// };

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
    addUsers,
    removeUsers,
    addChats,
    changeFileName,
    addFiles,
} = codeSlice.actions;
