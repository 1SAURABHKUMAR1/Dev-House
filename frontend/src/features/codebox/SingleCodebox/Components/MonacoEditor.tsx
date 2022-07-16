import { SingleMonaco } from 'features';
import { useAppSelector } from 'store/hooks';
import { codeBoxType } from 'Types';

const MonacoEditorBox = () => {
    const { selectedFile, allFiles, codebox_id } = useAppSelector(
        (state) => state.codebox,
    );

    return (
        <>
            {allFiles.map(
                (file) =>
                    file.type === 'file' &&
                    file.id === selectedFile.id && (
                        <SingleMonaco
                            file={file}
                            language={
                                (file.name
                                    .split('.')
                                    .at(-1)
                                    ?.toUpperCase() as codeBoxType) ??
                                'JAVASCRIPT'
                            }
                            codebox_id={codebox_id}
                            key={`monaoc ${file.id}`}
                        />
                    ),
            )}
        </>
    );
};

export default MonacoEditorBox;
