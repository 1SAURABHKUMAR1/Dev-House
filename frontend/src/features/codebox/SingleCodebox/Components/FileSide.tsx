import { Box } from '@chakra-ui/react';
import React, { memo, useEffect, useState } from 'react';

import { isFileOpenedInDirectory, isRootLevel, sortFiles } from 'Utils/Files';

import { TreeFile } from 'features';

import { useAppSelector } from 'store/hooks';

import { codeboxIcons, fileFormat } from 'Types';

const FileSide = () => {
    const { allFiles, selectedFile } = useAppSelector((state) => state.codebox);

    return (
        <>
            <RenderFileTree
                files={allFiles}
                allFiles={allFiles}
                selectedFile={selectedFile}
            />
        </>
    );
};

const RenderFileTree = memo(
    ({
        files,
        allFiles,
        selectedFile,
    }: {
        files: Array<fileFormat>;
        allFiles: Array<fileFormat>;
        selectedFile: fileFormat | null;
    }) => {
        return (
            <>
                <Box overflowY="auto" className="hide-scrollbar">
                    <>
                        {files
                            ?.filter((file) => isRootLevel(files, file))
                            ?.sort((file1, file2) => sortFiles(file1, file2))
                            ?.map((file) => (
                                <React.Fragment key={file.id}>
                                    {file.type === 'directory' ? (
                                        <Folder
                                            allFiles={allFiles}
                                            selectedFile={selectedFile}
                                            currentFile={file}
                                            key={file.id}
                                        />
                                    ) : (
                                        <TreeFile
                                            icon={
                                                file.name
                                                    .split('.')
                                                    .at(-1) as codeboxIcons
                                            }
                                            allFiles={allFiles}
                                            selectedFile={selectedFile}
                                            key={file.id}
                                            currentFile={file}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                    </>
                </Box>
            </>
        );
    },
);

const Folder = memo(
    ({
        allFiles,
        selectedFile,
        currentFile,
    }: {
        allFiles: Array<fileFormat>;
        selectedFile: fileFormat | null;
        currentFile: fileFormat;
    }) => {
        const subFiles = allFiles.filter(
            (file) => file.directory === currentFile.id,
        );

        const [isOpen, setIsOpen] = useState<boolean>(false);
        const toggleOpen = () => setIsOpen(!isOpen);

        useEffect(() => {
            if (!isOpen) {
                setIsOpen(() =>
                    isFileOpenedInDirectory(
                        allFiles,
                        currentFile,
                        selectedFile,
                    ),
                );
            }

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [allFiles, currentFile]);

        return (
            <>
                <TreeFile
                    icon={isOpen ? 'OPEN DIRECTORY' : 'CLOSED DIRECTORY'}
                    allFiles={allFiles}
                    selectedFile={selectedFile}
                    currentFile={currentFile}
                    onClick={toggleOpen}
                    setIsOpen={setIsOpen}
                />
                {isOpen && (
                    <RenderFileTree
                        files={subFiles}
                        allFiles={allFiles}
                        selectedFile={selectedFile}
                        key={currentFile.id}
                    />
                )}
            </>
        );
    },
);

export default memo(FileSide);
