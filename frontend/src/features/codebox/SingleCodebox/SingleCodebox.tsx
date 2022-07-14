import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { joinCodebox } from 'Services';

import {
    LanguageCodebox,
    LibraryCodebox,
    resetCodeboxState,
    setUserJoinedCodebox,
    ShareModal,
} from 'features';
import {
    Container as MainContainer,
    MainLoader,
    NotFoundTemplate,
} from 'Components';

import useSocketCodebox from 'Hooks/useSocketCodebox';

import { codeBoxCreateResponse } from 'Types';
import { AxiosResponse } from 'axios';

import ErrorToast from 'Utils/Toast/Error';
import { codes } from 'Utils/Code';

import Prettier from 'prettier';
import prettierParser from 'prettier/parser-babel';

import { socket } from 'Socket/socket';
import { ACTIONS_CODE_CLIENT_CODE } from 'Socket/actions';

const SingleCodebox = () => {
    const { codeboxId } = useParams();
    const { codeBoxType, language, codebox_id } = useAppSelector(
        (state) => state.codebox,
    );
    const { photo, username, userId } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const {
        users,
        chats,
        setSelectedFile,
        selectedFile,
        allFiles,
        setAllFiles,
    } = useSocketCodebox(
        // @ts-ignore
        codeboxId,
        {
            photo,
            userId,
            username,
        },
    );

    const resetCode = () => {
        const finalCode =
            language === 'JAVASCRIPT' ||
            language === 'CPP' ||
            language === 'PYTHON'
                ? codes[language]
                : '';

        // setMonacoCode(finalCode);

        socket.emit(ACTIONS_CODE_CLIENT_CODE, {
            codebox_id,
            code: finalCode,
        });
    };

    const formatCode = () => {
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

            // setMonacoCode(() => prettifiedCode);
        } else {
            ErrorToast('Failed');
        }
    };

    const handleCodeChange = (event: string | undefined) => {
        // setMonacoCode(() => event ?? '');
        socket.emit(ACTIONS_CODE_CLIENT_CODE, {
            codebox_id,
            code: event ?? '',
        });
    };

    const { isLoading, isError } = useQuery<
        AxiosResponse<codeBoxCreateResponse>,
        Error
    >(
        '/codebox/singleRoom',
        // @ts-ignore
        async () => await joinCodebox(codeboxId),
        {
            retry: 3,
            refetchOnWindowFocus: false,
            onSuccess: (data: AxiosResponse<codeBoxCreateResponse>) => {
                dispatch(setUserJoinedCodebox(data.data.room));

                // chnage all file
                setAllFiles(() => {
                    if (language === 'CPP') {
                        return codes[language];
                    }
                    if (language === 'PYTHON') return codes[language];
                    if (language === 'JAVASCRIPT') return codes[language];
                    if (language === 'VANILLA') return codes[language];
                    if (language === 'REACT') return codes[language];
                    if (language === 'REACT TYPESCRIPT') return codes[language];

                    return [
                        {
                            id: 'error',
                            directory: null,
                            name: 'Error',
                            type: 'directory',
                        },
                    ];
                });

                // change selected file
                const language = data.data.room.language;
                const allFile = codes[language];
                const selectFile = allFile.find((file) => {
                    if (file.name === 'index.js') return file;
                    if (file.name === 'index.ts') return file;
                    if (file.name === 'index.jsx') return file;
                    if (file.name === 'index.tsx') return file;
                    if (file.name === 'index.cpp') return file;
                    if (file.name === 'index.py') return file;

                    return null;
                });
                setSelectedFile(
                    selectFile ?? {
                        id: '',
                        directory: '',
                        name: '',
                        type: 'directory',
                    },
                );
            },
            onError: (error: Error) => {
                console.log(error);
                ErrorToast('Failed');
            },
        },
    );

    useEffect(() => {
        return () => {
            dispatch(resetCodeboxState());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <MainLoader />;
    } else if (isError) {
        return (
            <NotFoundTemplate
                mainContent="Codebox not found"
                buttonLink="/codebox"
                buttonText="Return to home"
            />
        );
    }

    return (
        <>
            <MainContainer center={false} marginBottom="0">
                <Flex
                    pos="relative"
                    display="flex"
                    flex="1 1 0px"
                    width="100%"
                    height="100%"
                >
                    {codeBoxType === 'LIBRARY' ? (
                        <LibraryCodebox
                            users={users}
                            chats={chats}
                            formatCode={formatCode}
                            handleCodeChange={handleCodeChange}
                            resetCode={resetCode}
                            allFiles={allFiles}
                            selectedFile={selectedFile}
                            setSelectedFile={setSelectedFile}
                        />
                    ) : (
                        <LanguageCodebox
                            users={users}
                            chats={chats}
                            formatCode={formatCode}
                            handleCodeChange={handleCodeChange}
                            resetCode={resetCode}
                            allFiles={allFiles}
                            selectedFile={selectedFile}
                            setSelectedFile={setSelectedFile}
                        />
                    )}
                </Flex>

                {/* share modal on page load */}
                <ShareModal />
            </MainContainer>
        </>
    );
};

export default SingleCodebox;
