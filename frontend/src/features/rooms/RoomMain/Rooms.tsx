import {
    Box,
    Button,
    Container,
    Flex,
    Input,
    Text,
    useDisclosure,
} from '@chakra-ui/react';

import { useRef } from 'react';
import { BsPerson } from 'react-icons/bs';

import {
    BottomContainer,
    Container as MainContainer,
} from '../../../Components';

import { AllRooms, CreateRoomModal } from '../../index';

const Rooms = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const roomRef = useRef<HTMLInputElement>(null);

    // TODO:  rooms filter

    return (
        <>
            <MainContainer marginBottom="0">
                <Container paddingTop="2rem" maxW="container.xl">
                    <Flex justifyContent="space-between" alignItems="center">
                        <Flex
                            gap={{ md: '1rem', lg: '1.5rem' }}
                            alignItems="flex-end"
                        >
                            <Box width={{ ssm: '5rem', md: '6rem' }}>
                                <Text textAlign="center">All rooms</Text>
                                <Box
                                    borderBottom="3px solid"
                                    borderBottomColor="main.blue"
                                    borderRadius="1.4rem"
                                ></Box>
                            </Box>

                            <Input
                                px="2rem"
                                maxWidth="17rem"
                                bg="main.input-bg"
                                color="main.text.white"
                                type="text"
                                borderRadius="1.4rem"
                                display={{ ssm: 'none', md: 'block' }}
                                _focus={{}}
                                _active={{}}
                                placeholder="Room Name....."
                            />
                        </Flex>
                        <Button
                            bg="main.blue"
                            textColor="white"
                            borderRadius="1.4rem"
                            _focus={{}}
                            _active={{}}
                            _hover={{ bg: 'main.blue.hover' }}
                            leftIcon={<BsPerson />}
                            onClick={onOpen}
                        >
                            Start a room
                        </Button>
                        {/* TODO: join room link */}
                    </Flex>
                </Container>

                <CreateRoomModal
                    isOpen={isOpen}
                    onClose={onClose}
                    key="CreateRoomModal"
                    inputInitalRef={roomRef}
                />

                <AllRooms />
            </MainContainer>

            <BottomContainer />
        </>
    );
};

export default Rooms;
