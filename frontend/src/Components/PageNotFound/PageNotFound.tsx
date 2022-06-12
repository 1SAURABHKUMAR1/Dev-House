import { Box, Button, Container, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Container as MainContainer } from '../index';

const PageNotFound = () => {
    return (
        <MainContainer center={true}>
            <Container width="max-content" position="relative">
                <Text
                    fontSize="8rem"
                    fontWeight="extrabold"
                    color="main.input-bg"
                    letterSpacing="0.1rem"
                    position="relative"
                >
                    404
                </Text>
                <Box
                    backgroundColor="main.blue"
                    paddingX="0.5rem"
                    fontSize="0.85rem"
                    borderRadius="0.25rem"
                    color="white"
                    position="absolute"
                    top="50%"
                    left="30%"
                    style={{ transform: 'rotate(12deg)' }}
                >
                    Page Not Found
                </Box>
                <Box
                    display="flex"
                    fontSize="0.85rem"
                    fontWeight="medium"
                    marginTop="-0.55rem"
                >
                    <Link to="/" style={{ margin: 'auto' }}>
                        <Button
                            backgroundColor="main.blue"
                            color="white"
                            _hover={{
                                backgroundColor: 'main.light.blue.hover',
                            }}
                        >
                            Go To Home
                        </Button>
                    </Link>
                </Box>
            </Container>
        </MainContainer>
    );
};

export default PageNotFound;
