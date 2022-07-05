import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import Prettier from 'prettier';
import prettierParser from 'prettier/parser-babel';

import { useAppSelector } from 'store/hooks';

import { SideDock, MonacoEditor, OutputArea } from 'features';

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

    return (
        <>
            <Flex flex="1 1 0" flexBasis="0" height="calc(100vh - 3.8rem)">
                {/* <SideDock /> */}

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
                <OutputArea resetCode={resetCode} formatCode={formatCode} />
            </Flex>
        </>
    );
};

export default LanguageCodebox;
