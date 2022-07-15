import { Box, Flex, Text } from '@chakra-ui/react';
import React, { memo, useEffect, useState } from 'react';

import {
    getFileDepth,
    isFileOpenedInDirectory,
    isRootLevel,
    sortFiles,
} from 'Utils/Files';

import { codeboxIcons, fileFormat } from 'Types';

import { useAppDispatch, useAppSelector } from 'store/hooks';

import { FileIcon, setSelectedFile } from 'features';

const FileSide = () => {
    const { allFiles, selectedFile } = useAppSelector((state) => state.codebox);
    const dispatch = useAppDispatch();

    const selectFile = (file: fileFormat) =>
        dispatch(setSelectedFile({ file: file }));

    // const createFile = (file: any) => {
    //     //
    // };

    // const removeFile = (file: any) => {
    //     //
    // };

    // const renameFile = (file: any) => {
    //     //
    // };

    return (
        <>
            <RenderFileTree
                files={allFiles}
                allFiles={allFiles}
                selectedFile={selectedFile}
                selectFile={selectFile}
                //     createFile={createFile}
                //     removeFile={removeFile}
                //     renameFile={renameFile}
            />
        </>
    );
};

//
const RenderFileTree = memo(
    ({
        files,
        allFiles,
        selectedFile,
        selectFile,
    }: // createFile,
    // removeFile,
    // renameFile,
    {
        files: Array<fileFormat>;
        allFiles: Array<fileFormat>;
        selectFile: (file: fileFormat) => void;
        selectedFile: fileFormat | null;

        // createFile: (file: any) => void;
        // removeFile: (file: any) => void;
        // renameFile: (file: any) => void;
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
                                            selectFile={selectFile}
                                            selectedFile={selectedFile}
                                            currentFile={file}
                                            key={file.id}
                                        />
                                    ) : (
                                        <File
                                            icon={
                                                file.name
                                                    .split('.')
                                                    .at(-1) as codeboxIcons
                                            }
                                            allFiles={allFiles}
                                            selectedFile={selectedFile}
                                            onClick={() => selectFile(file)}
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
        selectFile,
        currentFile,
    }: {
        allFiles: Array<fileFormat>;
        selectFile: (file: fileFormat) => void;
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
                <File
                    icon={isOpen ? 'OPEN DIRECTORY' : 'CLOSED DIRECTORY'}
                    allFiles={allFiles}
                    selectedFile={selectedFile}
                    currentFile={currentFile}
                    onClick={toggleOpen}
                />
                {isOpen && (
                    <RenderFileTree
                        files={subFiles}
                        allFiles={allFiles}
                        selectFile={selectFile}
                        selectedFile={selectedFile}
                        key={currentFile.id}
                    />
                )}
            </>
        );
    },
);

const File = memo(
    ({
        allFiles,
        selectedFile,
        onClick,
        currentFile,
        icon,
    }: {
        allFiles: Array<fileFormat>;
        selectedFile: fileFormat | null;
        onClick: () => void;
        currentFile: fileFormat;
        icon: codeboxIcons;
    }) => {
        const isSelected = selectedFile && selectedFile.id === currentFile.id;
        const depth = getFileDepth(allFiles, currentFile);

        return (
            <>
                <Flex
                    alignItems="center"
                    paddingLeft={`${depth === 0 ? 0.6 : (depth + 1) * 0.75}rem`}
                    cursor="pointer"
                    gap="0.5rem"
                    _hover={{ backgroundColor: 'gray.100' }}
                    backgroundColor={isSelected ? 'gray.100' : 'inherit'}
                    onClick={onClick}
                    flex="0"
                    className="hide-scrollbar"
                    py="0.2rem"
                    key={currentFile.id}
                >
                    <FileIcon file={icon} />
                    <Text
                        as="span"
                        fontSize="1.02rem"
                        fontWeight="medium"
                        wordBreak="break-word"
                        key={currentFile.id}
                    >
                        {currentFile.name}
                    </Text>
                </Flex>
            </>
        );
    },
);

export default memo(FileSide);
