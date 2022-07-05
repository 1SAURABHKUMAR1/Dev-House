import { Flex } from '@chakra-ui/react';

import { SideDock, MonacoEditor, OutputArea } from 'features';
import { useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { codes } from 'Utils/Code';

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
                <OutputArea />
            </Flex>
        </>
    );
};

export default LanguageCodebox;
