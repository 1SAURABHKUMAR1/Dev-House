import { Box, Flex, Image, Text } from '@chakra-ui/react';

const ModalButtons = () => {
    return (
        <>
            <Flex pt="5" justifyContent="space-evenly">
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    objectFit="cover"
                    gap="0.2rem"
                    px="0.8rem"
                    borderRadius="0.4rem"
                    bg="main.bg.sec"
                    _focus={{
                        boxShadow: '0 0 0px 1px #3182ce',
                        borderColor: '#3182ce',
                        zIndex: '1',
                    }}
                >
                    <Image src="/images/open.svg" boxSize="14" />
                    <Text fontWeight="600">Open</Text>
                </Box>

                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    objectFit="cover"
                    gap="0.2rem"
                    px="0.8rem"
                    borderRadius="0.4rem"
                    bg="main.bg.sec"
                    _focus={{
                        boxShadow: '0 0 0px 1px #3182ce',
                        borderColor: '#3182ce',
                        zIndex: '1',
                    }}
                >
                    <Image src="/images/social.svg" boxSize="14" />
                    <Text fontWeight="600">Social</Text>
                </Box>

                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    objectFit="cover"
                    gap="0.2rem"
                    px="0.8rem"
                    borderRadius="0.4rem"
                    bg="main.bg.sec"
                    _focus={{
                        boxShadow: '0 0 0px 2px #3182ce',
                        borderColor: '#3182ce',
                        zIndex: '1',
                    }}
                >
                    <Image src="/images/private.svg" boxSize="14" />
                    <Text fontWeight="600">Private</Text>
                </Box>
            </Flex>
        </>
    );
};

export default ModalButtons;
