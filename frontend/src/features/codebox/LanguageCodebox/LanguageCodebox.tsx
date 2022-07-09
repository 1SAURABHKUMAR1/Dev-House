import { Box } from '@chakra-ui/react';

import React, { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { executeCodebox } from 'Services';
import { useAppSelector } from 'store/hooks';

import { SideDock, MonacoEditor, OutputArea, Resizable } from 'features';

import { AxiosResponse } from 'axios';
import { languageCodeboxProps, runCodeResponse, sidebarIcons } from 'Types';

import ErrorToast from 'Utils/Toast/Error';

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

    return (
        <>
            <SideDock buttonsArray={sideBarIcons} users={users} chats={chats} />

            <Box pos="relative" width="auto" height="100%">
                <Resizable minWidthPercent={45}>
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
                </Resizable>
            </Box>

            <OutputArea
                resetCode={resetCode}
                formatCode={formatCode}
                executeCode={executeCode}
                inputContent={inputContent}
                setInputContent={setInputContent}
                outputContent={outputContent}
                isExecutingCode={isLoading}
            />
        </>
    );
};

export default LanguageCodebox;
