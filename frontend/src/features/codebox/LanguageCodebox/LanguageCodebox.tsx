import React, { useLayoutEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { executeCodebox } from 'Services';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import {
    SideDock,
    MonacoEditor,
    OutputArea,
    setSidebarComponent,
    ChatSide,
    UserSide,
    ShareSide,
    resetCodeboxState,
} from 'features';

import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

import { AxiosResponse } from 'axios';
import { languageCodeboxProps, runCodeResponse, sidebarIcons } from 'Types';

import ErrorToast from 'Utils/Toast/Error';
import { Box, Text } from '@chakra-ui/react';

const sideBarIcons: sidebarIcons = [
    {
        type: 'USERS',
        tooltipLabel: 'Users',
        icon: 'users',
    },
    {
        type: 'CHAT',
        icon: 'chat',
        tooltipLabel: 'Chat',
    },
    {
        type: 'SHARE',
        tooltipLabel: 'Collaborate',
        icon: 'share',
    },
];

const LanguageCodebox = ({
    users,
    chats,
    monacoEditorCode,
    handleCodeChange,
    resetCode,
    formatCode,
}: languageCodeboxProps) => {
    const { language } = useAppSelector((state) => state.codebox);
    const [inputContent, setInputContent] = useState('');
    const outputContent = useRef<HTMLTextAreaElement | null>(null);
    const { sidebarComponent } = useAppSelector((state) => state.codebox);
    const dispatch = useAppDispatch();

    const { mutateAsync, isLoading } = useMutation<
        AxiosResponse<runCodeResponse>,
        Error
    >(
        async () =>
            // @ts-ignore
            await executeCodebox(language, monacoEditorCode, inputContent),
        {
            onSuccess(data: AxiosResponse<runCodeResponse>) {
                outputContent.current &&
                    (outputContent.current.value = data.data.message);
            },
            onError(error: Error) {
                console.log(error);
                ErrorToast('Failed');
            },
        },
    );

    const executeCode = async () => {
        await mutateAsync();
    };

    useLayoutEffect(() => {
        dispatch(setSidebarComponent({ component: 'Users' }));

        return () => {
            dispatch(resetCodeboxState());
        };
    }, [dispatch]);

    return (
        <>
            <SideDock buttonsArray={sideBarIcons} />

            <Allotment maxSize={Infinity}>
                <Allotment.Pane
                    minSize={150}
                    maxSize={230}
                    preferredSize={200}
                    visible={sidebarComponent !== 'None'}
                >
                    <Box
                        flexDir="column"
                        flex="1"
                        display={
                            sidebarComponent !== 'None' ? 'inline-flex' : 'none'
                        }
                        height="100%"
                        width="100%"
                    >
                        {sidebarComponent === 'Users' && (
                            <>
                                <Box
                                    justifyContent="center"
                                    alignItems="center"
                                    display="flex"
                                    flex="0"
                                    pt="4"
                                    pb="4"
                                    fontSize="large"
                                    fontWeight="semibold"
                                    paddingInline="6"
                                    alignContent="center"
                                >
                                    <Text textAlign="center">All Users</Text>
                                </Box>
                                <UserSide users={users} />
                            </>
                        )}
                        {sidebarComponent === 'Chat' && (
                            <>
                                <Box
                                    justifyContent="center"
                                    alignItems="center"
                                    display="flex"
                                    flex="0"
                                    pt="4"
                                    pb="4"
                                    fontSize="large"
                                    fontWeight="semibold"
                                    paddingInline="6"
                                    alignContent="center"
                                >
                                    <Text textAlign="center">Chat Box</Text>
                                </Box>
                                <ChatSide chats={chats} />
                            </>
                        )}
                        {sidebarComponent === 'Collaborate' && (
                            <>
                                <Box
                                    justifyContent="center"
                                    alignItems="center"
                                    display="flex"
                                    flex="0"
                                    pt="4"
                                    pb="4"
                                    fontSize="large"
                                    fontWeight="semibold"
                                    paddingInline="6"
                                    alignContent="center"
                                >
                                    <Text textAlign="center">Collaborate</Text>
                                </Box>
                                <ShareSide />
                            </>
                        )}
                    </Box>
                </Allotment.Pane>

                <Allotment.Pane minSize={200} preferredSize={'70%'}>
                    <MonacoEditor
                        codeMonaco={monacoEditorCode}
                        language={
                            language === 'JAVASCRIPT' ||
                            language === 'CPP' ||
                            language === 'PYTHON'
                                ? language
                                : 'JAVASCRIPT'
                        }
                        handleCodeChange={handleCodeChange}
                    />
                </Allotment.Pane>

                <Allotment.Pane minSize={200} preferredSize={'30%'}>
                    <OutputArea
                        resetCode={resetCode}
                        formatCode={formatCode}
                        executeCode={executeCode}
                        inputContent={inputContent}
                        setInputContent={setInputContent}
                        outputContent={outputContent}
                        isExecutingCode={isLoading}
                    />
                </Allotment.Pane>
            </Allotment>
        </>
    );
};

export default LanguageCodebox;