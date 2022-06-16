import {
    Box,
    Button,
    Container,
    Flex,
    Grid,
    Input,
    Text,
} from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import {
    BottomContainer,
    SingleRoomCard,
    Container as MainContainer,
} from '../../../Components';

const Rooms = () => {
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
                        >
                            Start a room
                        </Button>
                    </Flex>
                </Container>

                <Container paddingTop="3rem" maxW="container.xl">
                    <Grid
                        templateColumns={{
                            ssm: 'repeat(1,1fr)',
                            mmd: 'repeat(2,1fr)',
                            lg: 'repeat(3,1fr)',
                            xl: 'repeat(4, 1fr)',
                        }}
                        gap="1.2rem"
                    >
                        <SingleRoomCard />
                        <SingleRoomCard />
                        <SingleRoomCard />
                        <SingleRoomCard />
                        <SingleRoomCard />
                        <SingleRoomCard />
                        <SingleRoomCard />
                        <SingleRoomCard />
                        <SingleRoomCard />
                        <SingleRoomCard />
                        <SingleRoomCard />
                    </Grid>
                </Container>
            </MainContainer>

            <BottomContainer />
        </>
    );
};

export default Rooms;
