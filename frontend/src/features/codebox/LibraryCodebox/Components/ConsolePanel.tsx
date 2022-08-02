import { Box, Flex, Text } from '@chakra-ui/react';

import { Console } from 'console-feed';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearConsoleLogs } from 'features/codebox/codeboxSlice';

const ConsolePanel = () => {
    const { consoleLogs } = useAppSelector((state) => state.codebox);
    const dispatch = useAppDispatch();

    const clearConsole = () => {
        dispatch(clearConsoleLogs());
    };

    return (
        <>
            <Box
                color="hsl(210deg,10%,40%)"
                pos="relative"
                height="100%"
                flex="1"
                pb="2rem"
            >
                <Flex
                    alignItems="center"
                    justifyContent="flex-end"
                    px="0.75rem"
                    py="0.2rem"
                    color="#1f2937"
                    bg="#f9fafb"
                    fontSize="0.9rem"
                    borderBottom="2px solid hsl(210deg,14%,66%)"
                    width="100%"
                >
                    <Text
                        as="span"
                        fontWeight="700"
                        cursor="pointer"
                        onClick={clearConsole}
                    >
                        Clear Console
                    </Text>
                </Flex>

                <Box overflow="auto" height="100%">
                    <Console
                        styles={{
                            BASE_FONT_FAMILY: 'League Mono, sans-serif;',
                            BASE_FONT_SIZE: 13,
                            LOG_ERROR_COLOR: 'hsl(0deg 99% 57% / 90%)',
                            LOG_WARN_COLOR: 'hsl(60deg 91% 57% / 90%)',
                        }}
                        logs={consoleLogs}
                        variant="light"
                    />
                </Box>
            </Box>
        </>
    );
};

export default ConsolePanel;
