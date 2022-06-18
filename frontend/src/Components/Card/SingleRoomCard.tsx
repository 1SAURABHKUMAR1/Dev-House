import { Avatar, Box, Flex, GridItem, Text } from '@chakra-ui/react';
import { BsPersonFill } from 'react-icons/bs';
import { singleRoomCardType, userMiniType } from '../../Types';

const SingleRoomCard = ({ roomName, speakers }: singleRoomCardType) => {
    return (
        <GridItem bg="main.bg.sec" borderRadius="0.7rem" padding="1rem 1.3rem">
            <Text fontSize="0.97rem" fontWeight="700">
                {roomName}
            </Text>

            <Flex marginTop="1rem" gap="1.2rem">
                <Flex display="flex" flexDirection="column">
                    {speakers.map(
                        (speaker: userMiniType, index: number) =>
                            index < 2 && (
                                <Avatar
                                    size="md"
                                    showBorder
                                    name="user avatar"
                                    borderColor="main.blue"
                                    borderWidth="0.12rem"
                                    overflow="hidden"
                                    src={speaker?.profile_photo?.secure_url}
                                    style={{
                                        marginTop: `${
                                            index === 1 ? '-20px' : ''
                                        }`,
                                        marginLeft: `${
                                            index === 1 ? '20px' : ''
                                        }`,
                                    }}
                                />
                            ),
                    )}
                </Flex>
                <Flex
                    display="flex"
                    flexDirection="column"
                    fontWeight="600"
                    fontSize="0.93rem"
                    maxW="10rem"
                >
                    {speakers.map(
                        (speaker: userMiniType, index: number) =>
                            index < 2 && (
                                <Text
                                    className="tracking-overflow"
                                    as="span"
                                    marginTop="0.5rem"
                                    style={{
                                        transform: `${
                                            index === 1
                                                ? 'translateX(15px)'
                                                : ''
                                        }`,
                                    }}
                                >
                                    Kent C dos Kent C dos Kent C dos
                                </Text>
                            ),
                    )}
                </Flex>
            </Flex>

            <Box justifyContent="flex-end" alignItems="center" display="flex">
                <Flex alignItems="center" gap="0.2rem">
                    <Text as="span" fontWeight="700">
                        {speakers.length}
                    </Text>
                    <BsPersonFill />
                </Flex>
            </Box>
        </GridItem>
    );
};

export default SingleRoomCard;
