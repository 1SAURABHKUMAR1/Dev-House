import { Box, Container, Flex, Text, useDisclosure } from '@chakra-ui/react';

import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { singleRoom } from '../../../Services';

import { BsArrowLeftShort } from 'react-icons/bs';

import {
    Container as MainContainer,
    ContainerLoader,
    MainLoader,
    NotFoundTemplate,
} from '../../../Components';
import {
    ChatBox,
    SingleRoomUsers,
    Controls,
    setRoom,
    resetUserAuthRoom,
    PasswordModal,
} from '../../index';

import { AxiosResponse } from 'axios';
import { createRoomResponse } from '../../../Types';

import ErrorToast from '../../../Toast/Error';

const SingleRoom = () => {
    const { roomId } = useParams();
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const { onOpen, isOpen, onClose } = useDisclosure();
    const { name } = useAppSelector((state) => state.rooms);
    const { authenticated } = useAppSelector((state) => state.rooms);
    const dispatch = useAppDispatch();

    const { isLoading, isError } = useQuery<
        AxiosResponse<createRoomResponse>,
        Error
    >(
        'rooms/getRooms',
        // @ts-ignore
        async () => await singleRoom(roomId),
        {
            retry: 1,
            refetchOnWindowFocus: false,
            onSuccess: (data: AxiosResponse<createRoomResponse>) => {
                dispatch(setRoom(data.data));
            },
            onError: (error: Error) => {
                console.log(error);
                ErrorToast('Failed');
            },
        },
    );

    const handleAllRoomsButton = () => {
        dispatch(resetUserAuthRoom());
    };

    if (isLoading) {
        return <MainLoader />;
    } else if (isError) {
        return (
            <NotFoundTemplate
                mainContent="Room Not Found"
                buttonText="Go To Rooms"
                buttonLink="/rooms"
            />
        );
    }

    return (
        <>
            <MainContainer marginBottom="0">
                <Container paddingTop="2rem" maxW="container.xl">
                    <Flex alignItems="center" gap="0.8rem">
                        <Link to="/rooms">
                            <BsArrowLeftShort
                                fontSize={'1.5rem'}
                                onClick={handleAllRoomsButton}
                            />
                        </Link>
                        <Box width="5rem">
                            <Text textAlign="center">All rooms</Text>
                            <Box
                                borderBottom="3px solid"
                                borderBottomColor="main.blue"
                                borderRadius="1.4rem"
                            ></Box>
                        </Box>
                    </Flex>
                </Container>

                <Container
                    marginTop="3rem"
                    maxW="100%"
                    bg="main.bg.sec"
                    flex="1 1 0%"
                    borderRadius="1rem 1rem 0rem 0rem"
                    paddingTop="2rem"
                    position="relative"
                >
                    {authenticated && (
                        <Container maxW="container.xl">
                            <Flex
                                justifyContent="space-between"
                                rowGap={'1rem'}
                                alignItems={{ ssm: '', md: 'center' }}
                                flexDirection={{ ssm: 'column', md: 'row' }}
                            >
                                <Text
                                    textAlign="center"
                                    maxWidth={{
                                        ssm: '100%',
                                        md: '18rem',
                                        lg: '20rem',
                                    }}
                                    fontSize="1.2rem"
                                    fontWeight="700"
                                >
                                    {name}
                                </Text>
                                <Flex
                                    gap="1rem"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                    display="flex"
                                    flexWrap="wrap"
                                >
                                    <Controls btnRef={btnRef} onOpen={onOpen} />
                                </Flex>
                            </Flex>

                            <SingleRoomUsers />
                        </Container>
                    )}

                    {!authenticated && <ContainerLoader />}
                </Container>

                <ChatBox btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
            </MainContainer>
            <PasswordModal />
        </>
    );
};

export default SingleRoom;
