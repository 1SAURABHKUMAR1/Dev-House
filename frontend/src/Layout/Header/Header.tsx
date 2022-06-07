import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Avatar,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import { Link } from 'react-router-dom';

import MobileNav from './MobileNav';

const Header = () => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH="3.8rem"
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle="solid"
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align="center"
            >
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? (
                                <CloseIcon w={3} h={3} />
                            ) : (
                                <HamburgerIcon w={5} h={5} />
                            )
                        }
                        variant="ghost"
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex
                    flex={{ base: 1 }}
                    justify={{ base: 'center', md: 'start' }}
                >
                    <Text
                        textAlign={useBreakpointValue({
                            base: 'center',
                            md: 'left',
                        })}
                        fontFamily="heading"
                        color={useColorModeValue('gray.800', 'white')}
                    >
                        Logo
                    </Text>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify="flex-end"
                    direction="row"
                    spacing={6}
                >
                    <Button
                        fontSize="sm"
                        fontWeight={500}
                        variant="link"
                        display={{ base: 'none', md: 'inline-flex' }}
                        color={useColorModeValue('gray.600', 'gray.200')}
                    >
                        <Link to="/">Code Studio</Link>
                    </Button>
                    <Button
                        fontSize="sm"
                        fontWeight={500}
                        variant="link"
                        display={{ base: 'none', md: 'inline-flex' }}
                        color={useColorModeValue('gray.600', 'gray.200')}
                    >
                        <Link to="/">Podcast</Link>
                    </Button>
                    <Button
                        fontSize="sm"
                        fontWeight={500}
                        variant="link"
                        display={{ base: 'none', md: 'inline-flex' }}
                        color={useColorModeValue('gray.600', 'gray.200')}
                    >
                        <Link to="/">Sign In</Link>
                    </Button>
                    <Button
                        fontSize="sm"
                        fontWeight={500}
                        variant="link"
                        display={{ base: 'none', md: 'inline-flex' }}
                        color={useColorModeValue('gray.600', 'gray.200')}
                    >
                        <Link to="/">Logout</Link>
                    </Button>
                    <Button
                        display="inline-flex"
                        fontSize="sm"
                        fontWeight={600}
                        color="white"
                        bg="main.blue"
                        _hover={{
                            bg: 'main.blue.hover',
                        }}
                    >
                        <Link to="/">Sign Up</Link>
                    </Button>

                    <Button
                        variant="link"
                        display={{ base: 'none', md: 'inline-flex' }}
                    >
                        <Link to={'/'}>
                            <Avatar
                                size={'sm'}
                                name="User Profile"
                                src="https://bit.ly/kent-c-dodds"
                            />
                        </Link>
                    </Button>
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
};

export default Header;
