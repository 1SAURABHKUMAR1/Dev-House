import { SingleMonaco, compileCode } from 'features';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { codeBoxType } from 'Types';

const MonacoEditorBox = () => {
    const {
        selectedFile,
        allFiles,
        codebox_id,
        esbuildReady,
        initializationCompilationState,
    } = useAppSelector((state) => state.codebox);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (
            allFiles &&
            esbuildReady &&
            initializationCompilationState !== 'COMPILING'
        ) {
            compileCode(dispatch, allFiles, ''); //TODO:
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allFiles, esbuildReady]);

    return (
        <>
            {Object.keys(allFiles).map(
                (filePath) =>
                    filePath &&
                    filePath === selectedFile && (
                        <SingleMonaco
                            filePath={filePath}
                            language={
                                (filePath
                                    .split('.')
                                    .at(-1)
                                    ?.toUpperCase() as codeBoxType) ??
                                'JAVASCRIPT'
                            }
                            codebox_id={codebox_id}
                            allFiles={allFiles}
                            key={`monaoc ${filePath}`}
                        />
                    ),
            )}
        </>
    );
};

export default MonacoEditorBox;
