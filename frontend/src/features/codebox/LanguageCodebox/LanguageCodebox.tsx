import React, { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { executeCodebox } from 'Services';
import { useAppSelector } from 'store/hooks';

import { SideDock, MonacoEditor, OutputArea } from 'features';

import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

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
            <SideDock
                buttonsArray={sideBarIcons}
                users={users}
                chats={chats}
                defaultOpen="Users"
            />

            <Allotment maxSize={Infinity}>
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
