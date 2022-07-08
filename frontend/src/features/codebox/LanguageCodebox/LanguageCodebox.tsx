import { Box, Flex } from '@chakra-ui/react';

import { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { executeCodebox } from 'Services';
import Prettier from 'prettier';
import prettierParser from 'prettier/parser-babel';
import { useAppSelector } from 'store/hooks';

import { SideDock, MonacoEditor, OutputArea, Resizable } from 'features';

import { AxiosResponse } from 'axios';
import {
    initialChatType,
    runCodeResponse,
    sidebarIcons,
    socketCodeboxUser,
} from 'Types';

import { codes } from 'Utils/Code';
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
}: {
    users: socketCodeboxUser[];
    chats: initialChatType;
}) => {
    const { language } = useAppSelector((state) => state.codebox);
    const [code, setCode] = useState(() =>
        language === 'JAVASCRIPT' || language === 'CPP' || language === 'PYTHON'
            ? codes[language]
            : '',
    );
    const [inputContent, setInputContent] = useState('');
    const outputContent = useRef<HTMLTextAreaElement | null>(null);

    const resetCode = () => {
        setCode(() =>
            language === 'JAVASCRIPT' ||
            language === 'CPP' ||
            language === 'PYTHON'
                ? codes[language]
                : '',
        );
    };

    const formatCode = () => {
        if (language === 'JAVASCRIPT') {
            const prettifiedCode = Prettier.format(code, {
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
            });

            setCode(() => prettifiedCode);
        } else {
            ErrorToast('Failed');
        }
    };

    const { mutateAsync, isLoading } = useMutation<
        AxiosResponse<runCodeResponse>,
        Error
    >(
        // @ts-ignore
        async () => await executeCodebox(language, code, inputContent),
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
            <Flex
                pos="relative"
                display="flex"
                flex="1 1 0px"
                width="100%"
                height="100%"
            >
                <SideDock
                    buttonsArray={sideBarIcons}
                    users={users}
                    chats={chats}
                />

                <Box pos="relative" width="auto" height="100%">
                    <Resizable minWidthPercent={45}>
                        <MonacoEditor
                            codeMonaco={code}
                            language={
                                language === 'JAVASCRIPT' ||
                                language === 'CPP' ||
                                language === 'PYTHON'
                                    ? language
                                    : 'JAVASCRIPT'
                            }
                            setCodeMonaco={setCode}
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
            </Flex>
        </>
    );
};

export default LanguageCodebox;
