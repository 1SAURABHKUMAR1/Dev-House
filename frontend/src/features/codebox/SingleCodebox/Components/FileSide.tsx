import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import React, { ReactNode, useLayoutEffect, useState } from 'react';
import { AiOutlineFile, AiOutlineFolder } from 'react-icons/ai';

import { DiJavascript1, DiCss3Full, DiHtml5, DiReact } from 'react-icons/di';
import { fileFormat, fileSide } from 'Types';

import { useAppSelector } from 'store/hooks';
import {
    getFileDepth,
    isFileOpenedInDirectory,
    isRootLevel,
    sortFiles,
} from 'Utils/Files';
import { IconType } from 'react-icons/lib';
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';

const FileSide = ({ files }: fileSide) => {
    const [selectedFile, setSelectedFile] = useState<fileFormat | null>(null);

    useLayoutEffect(() => {
        const selectFile = files.find((file) => {
            if (file.name === 'index.js') return file;
            if (file.name === 'index.ts') return file;
            if (file.name === 'index.jsx') return file;
            if (file.name === 'index.tsx') return file;

            return null;
        });

        setSelectedFile(selectFile ?? null);
    }, [files]);

    const selectFile = (file: fileFormat) => setSelectedFile(file);

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
                files={files}
                allFiles={files}
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
const RenderFileTree = ({
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
            <Box
                display="flex"
                flexDirection="column"
                gap="0.7rem"
                scrollBehavior="smooth"
                role="chat"
                px="0.5rem"
                paddingInlineStart="2"
                paddingInlineEnd="2"
                paddingTop="2"
                paddingBottom="2"
                flex="1"
                overflow="auto"
                flexDir="column"
                overflowY="auto"
            >
                <>
                    {files
                        ?.filter((file) => isRootLevel(files, file))
                        ?.sort((file1, file2) => sortFiles(file1, file2))
                        ?.map((file) => (
                            <React.Fragment key={file.id}>
                                {file.type === 'directory' ? (
                                    <Folder
                                        allFiles={allFiles}
                                        files={files}
                                        selectFile={selectFile}
                                        selectedFile={selectedFile}
                                        key={file.id}
                                        currentFile={file}
                                    />
                                ) : (
                                    <File
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
};

const Folder = ({
    files,
    allFiles,
    selectedFile,
    selectFile,
    currentFile,
}: {
    files: Array<fileFormat>;
    allFiles: Array<fileFormat>;
    selectFile: (file: fileFormat) => void;
    selectedFile: fileFormat | null;
    currentFile: fileFormat;
}) => {
    const subFiles = [
        ...allFiles.filter((file) => file.directory === currentFile.id),
    ];

    const defaultDirectoryOpen = isFileOpenedInDirectory(
        allFiles,
        currentFile,
        selectedFile,
    );

    const [isOpen, setIsOpen] = useState<boolean>(defaultDirectoryOpen);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <>
            <File
                icon={isOpen ? FcOpenedFolder : FcFolder} //FIXME:
                allFiles={allFiles}
                selectedFile={selectedFile}
                currentFile={currentFile}
                onClick={toggleOpen}
            />
            {isOpen && (
                <RenderFileTree
                    files={[...subFiles]}
                    allFiles={allFiles}
                    selectFile={selectFile}
                    selectedFile={selectedFile}
                    key={currentFile.id}
                />
            )}
        </>
    );
};

const File = ({
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
    icon?: IconType;
}) => {
    const isSelected = selectedFile && selectedFile.id === currentFile.id;
    const depth = getFileDepth(allFiles, currentFile);

    return (
        <>
            <Flex
                alignItems="center"
                paddingLeft={depth + 1}
                cursor="pointer"
                gap="0.3rem"
                _hover={{ backgroundColor: 'gray.100' }}
                backgroundColor={isSelected ? 'gray.100' : 'inherit'}
                onClick={onClick}
            >
                <Icon as={icon} />
                <Text as="span">{currentFile.name}</Text>
            </Flex>
        </>
    );
};

export default FileSide;
