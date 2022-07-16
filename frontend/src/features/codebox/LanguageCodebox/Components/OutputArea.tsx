import { Box, Button, Flex, Image, Tooltip } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { InputField, formatCode, resetCodeFn } from 'features';

import { outputMonacoArea } from 'Types';

const OutputArea = ({
    executeCode,
    inputContent,
    outputContent,
    setInputContent,
    isExecutingCode,
}: outputMonacoArea) => {
    const { language, selectedFile, codeBoxType, codebox_id } = useAppSelector(
        (state) => state.codebox,
    );
    const dispatch = useAppDispatch();

    return (
        <Box
            display="flex"
            flexDir="column"
            flex="1 1 0px"
            px="0.5rem"
            minW="20%"
            height="100%"
        >
            <Box
                p="0.5rem"
                minW={{ sm: '20%', md: '40%' }}
                width="100%"
                display="flex"
                alignItems="center"
                gap="0.7rem"
                flexWrap="wrap"
                justifyContent="center"
            >
                <Tooltip label="Run Code">
                    <Button
                        bg="rgb(249, 249, 249)"
                        onClick={executeCode}
                        isLoading={isExecutingCode}
                        _loading={{
                            color: '#30baee',
                            fontWeight: '600',
                            fontSize: '1.2rem',
                        }}
                    >
                        Run
                    </Button>
                </Tooltip>

                <Tooltip label="Format Code">
                    <Button
                        bg="rgb(249, 249, 249)"
                        p="0rem"
                        onClick={() =>
                            formatCode(
                                dispatch,
                                language,
                                selectedFile,
                                codebox_id,
                            )
                        }
                        disabled={language !== 'JAVASCRIPT'}
                    >
                        <Image
                            src={`/images/prettier.svg`}
                            alt="logo"
                            boxSize="1.4rem"
                            _hover={{ bgColor: 'gray.200' }}
                            _focus={{ boxShadow: 'shadow.outline' }}
                        />
                    </Button>
                </Tooltip>

                <Tooltip label="Reset Code">
                    <Button
                        bg="rgb(249, 249, 249)"
                        p="0rem"
                        onClick={() =>
                            resetCodeFn(true, dispatch, language, codeBoxType)
                        }
                    >
                        <Image
                            src={`/images/reset.svg`}
                            alt="logo"
                            boxSize="1.4rem"
                            _hover={{ bgColor: 'gray.200' }}
                            _focus={{ boxShadow: 'shadow.outline' }}
                        />
                    </Button>
                </Tooltip>
            </Box>

            <Flex flexDir="column" flex="1 1 0px" height="auto">
                <InputField
                    label="Input -"
                    value={inputContent}
                    setValue={setInputContent}
                    readonly={false}
                />

                <InputField
                    label="Output -"
                    readonly={true}
                    valueRef={outputContent}
                />
            </Flex>
        </Box>
    );
};

export default OutputArea;
