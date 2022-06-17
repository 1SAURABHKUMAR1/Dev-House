import { Box, Container, Flex, Text, useDisclosure } from '@chakra-ui/react';

import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { BsArrowLeftShort } from 'react-icons/bs';

import { Container as MainContainer } from '../../../Components';
import { ChatBox, Users, Controls } from '../../index';

const SingleRoom = () => {
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const { onOpen, isOpen, onClose } = useDisclosure();

    //if roomType ==='PRIVATE' | 'SOCIAL"  -> open a dialog box for password

    return (
        <>
            <MainContainer marginBottom="0">
                <Container paddingTop="2rem" maxW="container.xl">
                    <Flex alignItems="center" gap="0.8rem">
                        <Link to="/rooms">
                            <BsArrowLeftShort fontSize={'1.5rem'} />
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
                >
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
                                fontWeight="700"
                            >
                                Artifical intelligence is the fututr
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

                        <Users />
                    </Container>
                </Container>

                <ChatBox btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
            </MainContainer>
        </>
    );
};

export default SingleRoom;
