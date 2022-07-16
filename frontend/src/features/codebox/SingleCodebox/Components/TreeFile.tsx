import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';

import { selectFile, FileIcon } from 'features';

import { useAppDispatch } from 'store/hooks';

import { codeboxIcons, fileFormat } from 'Types';

import { getFileDepth } from 'Utils/Files';
import { memo } from 'react';

const TreeFile = ({
    allFiles,
    selectedFile,
    onClick,
    currentFile,
    icon,
}: {
    allFiles: Array<fileFormat>;
    selectedFile: fileFormat | null;
    onClick?: () => void;
    currentFile: fileFormat;
    icon: codeboxIcons;
}) => {
    const isSelected = selectedFile && selectedFile.id === currentFile.id;
    const depth = getFileDepth(allFiles, currentFile);

    const disptach = useAppDispatch();
    const onClickFn = () => {
        onClick ? onClick() : disptach(selectFile(currentFile, disptach));
    };

    return (
        <>
            <Flex
                alignItems="center"
                paddingLeft={`${depth === 0 ? 0.6 : (depth + 1) * 0.75}rem`}
                cursor="pointer"
                paddingRight="0.6rem"
                gap="0.5rem"
                _hover={{ backgroundColor: 'gray.100' }}
                backgroundColor={isSelected ? 'gray.100' : 'inherit'}
                onClick={onClickFn}
                width="100%"
                py="0.2rem"
                key={currentFile.id}
                overflow="scroll"
                flexWrap="nowrap"
                justifyContent="space-between"
                className="hide-scrollbar filetree"
            >
                <Flex alignItems="center" gap="0.5rem">
                    <FileIcon file={icon} />
                    <Text
                        className="tracking-overflow"
                        as="span"
                        minW="4.7rem"
                        fontSize="1.02rem"
                        fontWeight="medium"
                        wordBreak="break-word"
                        key={currentFile.id}
                    >
                        {currentFile.name}
                    </Text>
                </Flex>

                <Flex
                    className="tracking-overflow actions"
                    alignItems="center"
                    flexWrap="nowrap"
                    gap="0.25rem"
                    opacity="0"
                    width="0%"
                    transition="0.2s"
                    pointerEvents="none"
                >
                    <Tooltip label="Rename" placement="top">
                        <Box
                            as="span"
                            _hover={{
                                opacity: '1',
                                transform: 'scale(1.35)',
                            }}
                            // onClick={handleFolderRename}
                        >
                            <FileIcon file="rename_file" />
                        </Box>
                    </Tooltip>

                    {currentFile.type === 'directory' && (
                        <Tooltip label="New File" placement="top">
                            <Box
                                as="span"
                                _hover={{
                                    opacity: '1',
                                    transform: 'scale(1.35)',
                                }}
                                // onClick={handleFileCreation}
                            >
                                <FileIcon file="create_file" />
                            </Box>
                        </Tooltip>
                    )}

                    {currentFile.type === 'directory' && (
                        <Tooltip label="New Directory" placement="top">
                            <Box
                                as="span"
                                _hover={{
                                    opacity: '1',
                                    transform: 'scale(1.35)',
                                }}
                                // onClick={handleFolderCreation}
                            >
                                <FileIcon file="create_directory" />
                            </Box>
                        </Tooltip>
                    )}

                    <Tooltip label="Delete" placement="top">
                        <Box
                            as="span"
                            _hover={{
                                opacity: '1',
                                transform: 'scale(1.35)',
                            }}
                            //  onClick={handleDeleteFolder}
                        >
                            <FileIcon file="delete_file" />
                        </Box>
                    </Tooltip>
                </Flex>
            </Flex>
        </>
    );
};

export default memo(TreeFile);
