import {
    Flex,
    Text,
    Stack,
    useColorModeValue,
    useDisclosure,
    Avatar,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface NavItem {
    label: string;
    href?: string;
}

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}
        >
            <MobileNavItem label={'Code Studio'} href="/" />
            <MobileNavItem label={'Podcast'} href="/signup" />
            <Flex
                borderRadius="0.3rem"
                _hover={{
                    bg: 'main.light.blue.hover',
                }}
                gap={'1rem'}
                p={2}
                align={'center'}
            >
                <Avatar
                    size={'sm'}
                    name="User Profile"
                    src="https://bit.ly/kent-c-dodds"
                />
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}
                >
                    @username
                </Text>
            </Flex>
            <MobileNavItem label={'Profile Settings'} href="/" />
            <MobileNavItem label={'Logout'} href="/" />
        </Stack>
    );
};

const MobileNavItem = ({ label, href = '#' }: NavItem) => {
    const { onToggle } = useDisclosure();

    return (
        <Stack
            spacing={4}
            onClick={onToggle}
            px={2}
            borderRadius="0.3rem"
            _hover={{
                bg: 'main.light.blue.hover',
            }}
        >
            <Flex py={2} justify={'space-between'} align={'center'}>
                <Link to={href}>
                    <Text
                        fontWeight={600}
                        color={useColorModeValue('gray.600', 'gray.200')}
                    >
                        {label}
                    </Text>
                </Link>
            </Flex>
        </Stack>
    );
};

export default MobileNav;
