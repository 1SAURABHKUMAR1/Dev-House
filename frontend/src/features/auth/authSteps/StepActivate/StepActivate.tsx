import { Box, Spinner, Text } from '@chakra-ui/react';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { setActivate, resetAuthenticate } from '../../../index';

import { activateUser } from '../../../../Services';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import { AuthStepProps } from '../../../../Types';

import ErrorToast from '../../../../Toast/Error';

const StepActivate = ({ onClick }: AuthStepProps) => {
    const { name, avatar, username } = useAppSelector(
        (state) => state.activate,
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const mutation = useMutation(() => activateUser(name, avatar, username), {
        onSuccess(data: any) {
            if (data.data.user.activated) {
                dispatch(setActivate(data.data));
                dispatch(resetAuthenticate());
            }
        },
        onError(error: Error) {
            console.log(error);
            ErrorToast('Failed');
            navigate('/activate');
        },
    });

    useEffect(() => {
        const updateUser = async () => {
            await mutation.mutateAsync();
        };
        updateUser();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Box
                width="90%"
                minHeight="20rem"
                bg={'main.bg.sec'}
                padding="2rem"
                borderRadius="0.8rem"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                position="relative"
                alignItems="center"
                margin="auto"
            >
                <Spinner
                    thickness="0.27rem"
                    speed="0.70s"
                    emptyColor="main.input-bg"
                    color="main.indigo"
                    size="xl"
                />
                <Text
                    textAlign="center"
                    fontWeight="700"
                    maxWidth="15rem"
                    marginTop="1.2rem"
                    fontSize={{ ssm: '1.12rem', sm: '1rem' }}
                >
                    Activation in progress ...
                </Text>
            </Box>
        </>
    );
};

export default StepActivate;
