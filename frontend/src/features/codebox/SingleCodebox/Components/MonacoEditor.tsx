import { SingleMonaco } from 'features';
import { useAppSelector } from 'store/hooks';
import { codeBoxType } from 'Types';

const MonacoEditorBox = () => {
    const { selectedFile, allFiles, codebox_id } = useAppSelector(
        (state) => state.codebox,
    );

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
