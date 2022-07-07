import { Box } from '@chakra-ui/react';

import Editor from '@monaco-editor/react';
import { ContainerLoader } from 'Components';

import { monacoEditorBox } from 'Types';

import { editorConfig } from 'Utils/Editor';

const MonacoEditorBox = ({
    language,
    codeMonaco,
    setCodeMonaco,
}: monacoEditorBox) => {
    return (
        <Box flex="1 1 0px" width="100%" height="100%">
            <Editor
                language={language.toLowerCase()}
                value={codeMonaco}
                height="100%"
                loading={<ContainerLoader />}
                onChange={(event) => setCodeMonaco(event ?? '')}
                options={editorConfig}
                beforeMount={(monaco) => {
                    language === 'JAVASCRIPT' &&
                        monaco.languages.typescript.javascriptDefaults.setCompilerOptions(
                            {
                                target: monaco.languages.typescript.ScriptTarget
                                    .Latest,
                                module: monaco.languages.typescript.ModuleKind
                                    .ES2015,
                                allowNonTsExtensions: true,
                                lib: ['es2018'],
                            },
                        );
                }}
            />
        </Box>
    );
};

export default MonacoEditorBox;
