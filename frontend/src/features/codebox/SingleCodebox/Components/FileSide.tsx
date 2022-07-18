import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import React, { memo, useEffect, useState } from 'react';

import { isFileOpenedInDirectory, isRootLevel, sortFiles } from 'Utils/Files';

import { TreeFile, NewFileFolder, FileIcon } from 'features';

import { useAppSelector } from 'store/hooks';

import { codeboxIcons, fileFormat } from 'Types';

import { customAlphabet } from 'nanoid';

const FileSide = () => {
    const { allFiles } = useAppSelector((state) => state.codebox);
    const [createNewFileFolder, setCreateNewFileFolder] = useState<
        'file' | 'directory' | 'none'
    >('none');

    const createFileFolder = (type: 'file' | 'directory') => {
        setCreateNewFileFolder((prev) => (prev === type ? 'none' : type));
    };

    return (
        <>
            <Box
                justifyContent="space-between"
                alignItems="center"
                display="flex"
                borderBottom="2px solid"
                borderColor="gray.300"
                margin="0 0 0.8rem 0"
                p="0.3rem 0.7rem"
                gap="2rem"
            >
                <Text as="span" fontWeight="600" lineHeight="20px">
                    Files
                </Text>
                <Flex
                    className="tracking-overflow actions"
                    alignItems="center"
                    flexWrap="nowrap"
                    gap="0.4rem"
                    width="fit-content"
                    transition="0.2s"
                >
                    <Tooltip label="New File" placement="top">
                        <Box
                            as="span"
                            _hover={{
                                opacity: '1',
                                transform: 'scale(1.35)',
                            }}
                            transition="0.2s all linear"
                            cursor="pointer"
                            opacity="0.8"
                            onClick={() => createFileFolder('file')}
                        >
                            <FileIcon file="create_file" />
                        </Box>
                    </Tooltip>

                    <Tooltip label="New Directory" placement="top">
                        <Box
                            as="span"
                            _hover={{
                                opacity: '1',
                                transform: 'scale(1.35)',
                            }}
                            transition="0.2s all linear"
                            cursor="pointer"
                            opacity="0.8"
                            onClick={() => createFileFolder('directory')}
                        >
                            <FileIcon file="create_directory" />
                        </Box>
                    </Tooltip>
                </Flex>
            </Box>

            <RenderFileTree
                files={
                    createNewFileFolder === 'directory'
                        ? [
                              ...allFiles,
                              {
                                  directory: null,
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
                              ...allFiles,
                              {
                                  directory: null,
                                  id: customAlphabet(
                                      'abcdefghijklmnopqrstuviwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
                                      5,
                                  )(),
                                  name: '',
                                  type: 'file',
                                  code: '',
                              },
                          ]
                        : allFiles
                }
                createFileFolder={createNewFileFolder}
                setNewFileFolder={setCreateNewFileFolder}
            />
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
