import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { joinCodebox } from 'Services';

import {
    Container as MainContainer,
    MainLoader,
    NotFoundTemplate,
} from 'Components';

import { codeBoxCreateResponse } from 'Types';
import { AxiosResponse } from 'axios';

import {
    LanguageCodebox,
    LibraryCodebox,
    resetCodeboxState,
    setUserJoinedCodebox,
} from 'features';

import ErrorToast from 'Utils/Toast/Error';
import { useAppSelector } from 'store/hooks';
import { useDispatch } from 'react-redux';

const SingleCodebox = () => {
    const { codeboxId } = useParams();
    const { codeBoxType } = useAppSelector((state) => state.codebox);
    const dispatch = useDispatch();

    const { isLoading, isError } = useQuery<
        AxiosResponse<codeBoxCreateResponse>,
        Error
    >(
        'rooms/singleRoom',
        // @ts-ignore
        async () => await joinCodebox(codeboxId),
        {
            retry: 1,
            refetchOnWindowFocus: false,
            onSuccess: (data: AxiosResponse<codeBoxCreateResponse>) => {
                dispatch(setUserJoinedCodebox(data.data.room));
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
                {codeBoxType === 'LIBRARY' ? (
                    <LibraryCodebox />
                ) : (
                    <LanguageCodebox />
                )}
            </MainContainer>
        </>
    );
};

export default SingleCodebox;
