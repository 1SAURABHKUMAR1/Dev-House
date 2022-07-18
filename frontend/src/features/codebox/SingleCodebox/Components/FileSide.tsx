import { Box } from '@chakra-ui/react';
import React, { memo, useEffect, useState } from 'react';

import { isFileOpenedInDirectory, isRootLevel, sortFiles } from 'Utils/Files';

import { TreeFile, NewFileFolder } from 'features';

import { useAppSelector } from 'store/hooks';

import { codeboxIcons, fileFormat } from 'Types';

import { customAlphabet } from 'nanoid';

const FileSide = () => {
    const { allFiles } = useAppSelector((state) => state.codebox);

    return (
        <>
            <RenderFileTree files={allFiles} />
        </>
    );
};

const RenderFileTree = memo(
    ({
        files,
        createFileFolder,
        setNewFileFolder,
    }: {
        files: Array<fileFormat>;
        createFileFolder?: 'file' | 'directory' | 'none';
        setNewFileFolder?: React.Dispatch<
            React.SetStateAction<'file' | 'directory' | 'none'>
        >;
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
                                    {file.name === '' &&
                                    createFileFolder !== 'none' ? (
                                        <NewFileFolder
                                            currentFile={file}
                                            setNewFileFolder={setNewFileFolder}
                                        />
                                    ) : (
                                        <>
                                            {file.type === 'directory' ? (
                                                <Folder
                                                    currentFile={file}
                                                    key={file.id}
                                                />
                                            ) : (
                                                <>
                                                    <TreeFile
                                                        icon={
                                                            file.name
                                                                .split('.')
                                                                .at(
                                                                    -1,
                                                                ) as codeboxIcons
                                                        }
                                                        currentFile={file}
                                                        key={file.id}
                                                    />
                                                </>
                                            )}
                                        </>
                                    )}
                                </React.Fragment>
                            ))}
                    </>
                </Box>
            </>
        );
    },
);

const Folder = memo(({ currentFile }: { currentFile: fileFormat }) => {
    const { allFiles, selectedFile } = useAppSelector((state) => state.codebox);
    const subFiles = allFiles.filter(
        (file) => file.directory === currentFile.id,
    );

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [createNewFileFolder, setCreateNewFileFolder] = useState<
        'file' | 'directory' | 'none'
    >('none');

    const toggleOpen = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (!isOpen) {
            setIsOpen(() =>
                isFileOpenedInDirectory(allFiles, currentFile, selectedFile),
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allFiles, currentFile]);

    return (
        <>
            <TreeFile
                icon={isOpen ? 'OPEN DIRECTORY' : 'CLOSED DIRECTORY'}
                currentFile={currentFile}
                onClick={toggleOpen}
                setIsOpen={setIsOpen}
                setNewFileFolder={setCreateNewFileFolder}
            />
            {isOpen && (
                <>
                    <RenderFileTree
                        files={
                            createNewFileFolder === 'directory'
                                ? [
                                      ...subFiles,
                                      {
                                          directory: currentFile.id,
                                          id: customAlphabet(
                                              'abcdefghijklmnopqrstuviwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
                                              5,
                                          )(),
                                          name: '',
                                          type: 'directory',
                                      },
                                  ]
                                : createNewFileFolder === 'file'
                                ? [
                                      ...subFiles,
                                      {
                                          directory: currentFile.id,
                                          id: customAlphabet(
                                              'abcdefghijklmnopqrstuviwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
                                              5,
                                          )(),
                                          name: '',
                                          type: 'file',
                                          code: '',
                                      },
                                  ]
                                : [...subFiles]
                        }
                        createFileFolder={createNewFileFolder}
                        setNewFileFolder={setCreateNewFileFolder}
                        key={currentFile.id}
                    />
                </>
            )}
        </>
    );
});

export default memo(FileSide);
