import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { joinCodebox } from 'Services';

import {
    LanguageCodebox,
    LibraryCodebox,
    resetCodeboxState,
    setUserJoinedCodebox,
    ShareModal,
    resetCodeFn,
} from 'features';
import {
    Container as MainContainer,
    MainLoader,
    NotFoundTemplate,
} from 'Components';

import useSocketCodebox from 'Hooks/useSocketCodebox';

import { codeBoxCreateResponse } from 'Types';
import { AxiosResponse } from 'axios';

import ErrorToast from 'Utils/Toast/Error';

const SingleCodebox = () => {
    const { codeboxId } = useParams();
    const { codeBoxType } = useAppSelector((state) => state.codebox);
    const { photo, username, userId } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { users, chats } = useSocketCodebox(
        // @ts-ignore
        codeboxId,
        {
            photo,
            userId,
            username,
        },
    );

    const { isLoading, isError } = useQuery<
        AxiosResponse<codeBoxCreateResponse>,
        Error
    >(
        '/codebox/singleRoom',
        // @ts-ignore
        async () => await joinCodebox(codeboxId),
        {
            retry: 3,
            refetchOnWindowFocus: false,
            onSuccess: (data: AxiosResponse<codeBoxCreateResponse>) => {
                dispatch(setUserJoinedCodebox(data.data.room));

                resetCodeFn(
                    false,
                    dispatch,
                    data.data.room.language,
                    data.data.room.codebox_type,
                );
            },
            onError: (error: Error) => {
                console.log(error);
                ErrorToast('Failed');
            },
        },
    );

    useEffect(() => {
        return () => {
            dispatch(resetCodeboxState());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <MainLoader />;
    } else if (isError) {
        return (
            <NotFoundTemplate
                mainContent="Codebox not found"
                buttonLink="/codebox"
                buttonText="Return to home"
            />
        );
    }

    return (
        <>
            <MainContainer center={false} marginBottom="0">
                <Flex
                    pos="relative"
                    display="flex"
                    flex="1 1 0px"
                    width="100%"
                    height="100%"
                >
                    {codeBoxType === 'LIBRARY' ? (
                        <LibraryCodebox users={users} chats={chats} />
                    ) : (
                        <LanguageCodebox users={users} chats={chats} />
                    )}
                </Flex>

                {/* share modal on page load */}
                <ShareModal />
            </MainContainer>
        </>
    );
};

export default SingleCodebox;
