import { Box, Button, Flex, Image, Tooltip } from '@chakra-ui/react';

import { useAppSelector } from 'store/hooks';
import { InputField } from 'features';

import { outputMonacoArea } from 'Types';

const OutputArea = ({
    resetCode,
    formatCode,
    executeCode,
    inputContent,
    outputContent,
    setInputContent,
    isExecutingCode,
}: outputMonacoArea) => {
    const { language } = useAppSelector((state) => state.codebox);

    return (
        <Box display="flex" flexDir="column" flex="1 1 0px" px="0.5rem">
            <Box
                p="0.5rem"
                minHeight="3rem"
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
                        onClick={formatCode}
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
                        onClick={resetCode}
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
