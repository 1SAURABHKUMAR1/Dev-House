import {
    Flex,
    Text,
    Stack,
    useColorModeValue,
    useDisclosure,
    Avatar,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

interface NavItem {
    label: string;
    href?: string;
}

const MobileNav = () => {
    const greyColor = useColorModeValue('gray.600', 'gray.200');
    const { login, photo, username } = useAppSelector((state) => state.auth);

    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}
        >
            <MobileNavItem label={'Code Studio'} href="/" />

            <MobileNavItem label={'Podcast'} href="/" />

            {login && (
                <Flex
                    borderRadius="0.3rem"
                    _hover={{
                        bg: 'main.light.blue.hover',
                    }}
                    gap={'1rem'}
                    p={2}
                    align={'center'}
                >
                    <Avatar size={'sm'} name="User Profile" src={photo} />
                    <Text fontWeight={600} color={greyColor}>
                        @{username}
                    </Text>
                </Flex>
            )}

            {login && <MobileNavItem label={'Profile Settings'} href="/" />}

            {login && <MobileNavItem label={'Logout'} href="/logout" />}
        </Stack>
    );
};

const MobileNavItem = ({ label, href = '#' }: NavItem) => {
    const { onToggle } = useDisclosure();

    return (
        <Link to={href}>
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
                    <Text
                        fontWeight={600}
                        color={useColorModeValue('gray.600', 'gray.200')}
                    >
                        {label}
                    </Text>
                </Flex>
            </Stack>
        </Link>
    );
};

export default MobileNav;
