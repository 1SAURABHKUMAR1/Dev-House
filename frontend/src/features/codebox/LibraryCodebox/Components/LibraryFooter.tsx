import { Flex, Spinner, Text } from '@chakra-ui/react';

import { FiTerminal } from 'react-icons/fi';

import { useAppSelector } from 'store/hooks';

import { libraryFooterProps } from 'Types';

const LibraryFooter = ({ handleConsoleVisiblity }: libraryFooterProps) => {
    const { compiling } = useAppSelector((state) => state.codebox);

    return (
        <>
            <Flex
                borderTop="2px solid hsl(210deg,14%,66%)"
                justifyContent="flex-end"
                px="0.5rem"
                py="0.3rem"
                gap="2rem"
                alignItems="center"
            >
                {compiling && <Spinner size="sm" thickness="3px" />}
                <Flex
                    alignItems="center"
                    gap="0.2rem"
                    fontSize="1rem"
                    fontWeight="700"
                    cursor="pointer"
                    onClick={handleConsoleVisiblity}
                >
                    <FiTerminal />

                    <Text fontSize="1rem" fontWeight="700" lineHeight="25px">
                        Console
                    </Text>
                </Flex>
            </Flex>
        </>
    );
};

export default LibraryFooter;
