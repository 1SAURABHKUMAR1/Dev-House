import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react';

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
} from 'features';
import {
    Container as MainContainer,
    CopyField,
    MainLoader,
    NotFoundTemplate,
} from 'Components';

// import useSocketCodebox from 'Hooks/useSocketCodebox';

import { codeBoxCreateResponse } from 'Types';
import { AxiosResponse } from 'axios';

import ErrorToast from 'Utils/Toast/Error';

const SingleCodebox = () => {
    const { codeboxId } = useParams();
    const { codeBoxType, codebox_id } = useAppSelector(
        (state) => state.codebox,
    );
    const dispatch = useAppDispatch();
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    // const ab = useSocketCodebox();

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

                {/* share modal on page load */}
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    blockScrollOnMount
                    isCentered
                    closeOnOverlayClick={false}
                >
                    <ModalOverlay backdropFilter="blur(3px)" />

                    <ModalContent>
                        <ModalHeader
                            justifyContent="space-between"
                            alignItems="center"
                            display="flex"
                        >
                            <Text fontSize="1.1rem" fontWeight="700">
                                Codebox link and password
                            </Text>
                            <ModalCloseButton
                                position="unset"
                                onClick={onClose}
                            />
                        </ModalHeader>

                        <ModalBody pb={4}>
                            <CopyField
                                inputCopyValue={codebox_id}
                                labelText="Room Link"
                                marginTop="0rem"
                                fieldType="ROOM_URL"
                                key={'room link'}
                                type="code-box"
                            />

                            <CopyField
                                inputCopyValue={codebox_id}
                                labelText="Room Id"
                                marginTop="0.7rem"
                                fieldType="ROOM_PASSWORD"
                                key={'room password'}
                                type="code-box"
                            />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </MainContainer>
        </>
    );
};

export default SingleCodebox;
