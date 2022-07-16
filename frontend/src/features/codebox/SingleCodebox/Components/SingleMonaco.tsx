import { Box } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';
import { changeCode } from 'features/codebox/codeboxSlice';

import { ContainerLoader } from 'Components';
import Editor from '@monaco-editor/react';

import { editorConfig } from 'Utils/EditorConfig';

import { codeBoxType, fileFormat } from 'Types';

import { useAppDispatch } from 'store/hooks';
import useDebouce from 'Hooks/useDebounce';

import { socket } from 'Socket/socket';
import { ACTIONS_CODE_CLIENT_CODE } from 'Socket/actions';

const SingleMonaco = ({
    file,
    language,
    codebox_id,
}: {
    file: fileFormat;
    language: codeBoxType;
    codebox_id: string;
}) => {
    const [input, setInput] = useState(file.code ?? '');
    const debouncedInput = useDebouce(input, 700);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (debouncedInput !== undefined || debouncedInput !== null) {
            socket.emit(ACTIONS_CODE_CLIENT_CODE, {
                codebox_id,
                code: debouncedInput,
                file,
            });

            dispatch(changeCode({ code: debouncedInput, file }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedInput, dispatch]);

    useEffect(() => {
        if (file.code !== input) {
            setInput(file.code ?? '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file.code]);

    const beforeMount = (
        monaco: typeof import('D:/web dev/projects/Dev-House/frontend/node_modules/monaco-editor/esm/vs/editor/editor.api'),
    ) => {
        language === 'JAVASCRIPT' &&
            monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
                target: monaco.languages.typescript.ScriptTarget.Latest,
                module: monaco.languages.typescript.ModuleKind.ES2015,
                allowNonTsExtensions: true,
                lib: ['es2018'],
                noSyntaxValidation: true, // This line disables errors in jsx tags like <div>, etc.
                jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
                jsxFactory: 'React.createElement',
                reactNamespace: 'React',
                allowJs: true,
            });
    };

    const handleChange = (event: string | undefined) => setInput(event ?? '');

    return (
        <>
            <Box flex="1 1 0px" width="100%" height="100%">
                <Editor
                    value={input}
                    height="100%"
                    loading={<ContainerLoader />}
                    onChange={handleChange}
                    language={language}
                    options={editorConfig(language)}
                    beforeMount={beforeMount}
                />
            </Box>
        </>
    );
};

export default memo(SingleMonaco);
