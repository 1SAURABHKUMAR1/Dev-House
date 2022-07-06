import { Flex } from '@chakra-ui/react';

import { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { executeCodebox } from 'Services';
import Prettier from 'prettier';
import prettierParser from 'prettier/parser-babel';
import { useAppSelector } from 'store/hooks';

import { SideDock, MonacoEditor, OutputArea } from 'features';

import { AxiosResponse } from 'axios';
import { runCodeResponse } from 'Types';

import { codes } from 'Utils/Code';
import ErrorToast from 'Utils/Toast/Error';

const LanguageCodebox = () => {
    const { language } = useAppSelector((state) => state.codebox);
    const [code, setCode] = useState(() =>
        language === 'JAVASCRIPT' ||
        language === 'CPP' ||
        language === 'JAVA' ||
        language === 'PYTHON'
            ? codes[language]
            : '',
    );
    const [inputContent, setInputContent] = useState('');
    const outputContent = useRef<HTMLTextAreaElement | null>(null);

    const resetCode = () => {
        setCode(() =>
            language === 'JAVASCRIPT' ||
            language === 'CPP' ||
            language === 'JAVA' ||
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
        () => executeCodebox(language, code, inputContent),
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
            <Flex flex="1 1 0" flexBasis="0" height="calc(100vh - 3.8rem)">
                {/* <SideDock />  FIXME:*/}

                <MonacoEditor
                    codeMonaco={code}
                    language={
                        language === 'JAVASCRIPT' ||
                        language === 'CPP' ||
                        language === 'JAVA' ||
                        language === 'PYTHON'
                            ? language
                            : 'JAVASCRIPT'
                    }
                    setCodeMonaco={setCode}
                />
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
