import { Avatar, Box, Flex, GridItem, Text } from '@chakra-ui/react';
import { BsPersonFill } from 'react-icons/bs';

const SingleRoomCard = () => {
    return (
        <GridItem bg="main.bg.sec" borderRadius="0.7rem" padding="1rem 1.3rem">
            <Text fontSize="0.97rem" fontWeight="700">
                Which framework best for frontend?
            </Text>

            <Flex marginTop="1rem" gap="1.2rem">
                <Flex display="flex" flexDirection="column">
                    <Avatar
                        showBorder
                        name="user avatar"
                        borderColor="main.blue"
                        borderWidth="0.12rem"
                        overflow="hidden"
                        src="https://bit.ly/kent-c-dodds"
                    />
                    <Avatar
                        size="md"
                        showBorder
                        name="user avatar"
                        borderColor="main.blue"
                        borderWidth="0.12rem"
                        overflow="hidden"
                        src="https://bit.ly/kent-c-dodds"
                        marginTop="-20px"
                        marginLeft="20px"
                    />
                </Flex>
                <Flex
                    display="flex"
                    flexDirection="column"
                    fontWeight="600"
                    fontSize="0.93rem"
                    maxW="10rem"
                >
                    <Text
                        className="tracking-overflow"
                        as="span"
                        marginTop="0.5rem"
                    >
                        Kent C dos Kent C dos Kent C dos
                    </Text>
                    <Text
                        as="span"
                        className="tracking-overflow"
                        transform="translateX(15px)"
                        marginTop="0.5rem"
                    >
                        Kent C dos Kent C dos Kent C dos
                    </Text>
                </Flex>
            </Flex>

            <Box justifyContent="flex-end" alignItems="center" display="flex">
                <Flex alignItems="center" gap="0.2rem">
                    <Text as="span" fontWeight="700">
                        5
                    </Text>
                    <BsPersonFill />
                </Flex>
            </Box>
        </GridItem>
    );
};

export default SingleRoomCard;
