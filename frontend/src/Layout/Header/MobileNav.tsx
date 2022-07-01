import {
    Flex,
    Text,
    Stack,
    useColorModeValue,
    useDisclosure,
    Avatar,
} from '@chakra-ui/react';

import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { logoutUserAuth } from '../../features';

import { logoutUser } from '../../Services';

import { useAppDispatch, useAppSelector } from '../../store/hooks';

import ErrorToast from '../../Utils/Toast/Error';

interface NavItem {
    label: string;
    href?: string;
}

const MobileNav = () => {
    const greyColor = useColorModeValue('gray.600', 'gray.200');
    const { login, photo, username } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { onToggle } = useDisclosure();

    const handleLogout = async () => {
        await mutation.mutateAsync();
    };

    const mutation = useMutation(() => logoutUser(), {
        onSuccess() {
            dispatch(logoutUserAuth());
        },
        onError() {
            ErrorToast('Failed');
        },
    });

    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}
        >
            <MobileNavItem label={'Code Box'} href="/code-box" />

            <MobileNavItem label={'Meetp'} href="/meetp" />

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

            {login && (
                <Link to="/">
                    <Stack
                        spacing={4}
                        onClick={() => {
                            onToggle();
                            handleLogout();
                        }}
                        px={2}
                        borderRadius="0.3rem"
                        _hover={{
                            bg: 'main.light.blue.hover',
                        }}
                        py={2}
                        fontWeight={600}
                        color={'gray.600'}
                    >
                        <Text>Logout</Text>
                    </Stack>
                </Link>
            )}
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
