import { Avatar, Box, Flex, Text, Tooltip } from '@chakra-ui/react';

const UserSide = () => {
    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                gap="0.7rem"
                scrollBehavior="smooth"
                role="chat"
                px="0.6rem"
                paddingInlineStart="2"
                paddingInlineEnd="2"
                paddingTop="2"
                paddingBottom="2"
                flex="1"
                overflow="auto"
                flexDir="column"
                marginTop="1rem"
            >
                <Flex
                    // gridTemplateColumns="repeat(auto-fill, 5.5rem)"
                    gap="1rem"
                    width="100%"
                    alignItems="center"
                    flexWrap="wrap"
                    columnGap="0.5rem"
                >
                    <Box width="max-content" textAlign="center" margin="auto">
                        <Tooltip label="name" placement="right">
                            <Avatar
                                height="3rem"
                                width="3rem"
                                showBorder
                                name="user avatar"
                                borderColor="main.blue"
                                borderWidth="0.14rem"
                                overflow="hidden"
                                src="/images/share.svg"
                                mb="0.2rem"
                                bg="transparent"
                                borderRadius="0.4rem"
                                p="0.4rem"
                            />
                        </Tooltip>
                        <Text fontSize="0.9rem" fontWeight="700">
                            Name
                        </Text>
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default UserSide;
