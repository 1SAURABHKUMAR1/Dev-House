import {
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Text,
    useDisclosure,
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';

import { CopyField, QrModal } from 'Components';

import { stepShareProps } from 'Types';

import { ShareModalFooter, setRoomDefault } from 'features';

const StepShare = ({ nextModal }: stepShareProps) => {
    const { roomId, roomPassword } = useAppSelector((state) => state.rooms);
    const dispatch = useAppDispatch();
    const { onOpen, onClose, isOpen } = useDisclosure();

    const closeModel = () => {
        nextModal(1);
        dispatch(setRoomDefault());
    };

    return (
        <ModalContent>
            <ModalHeader
                justifyContent="space-between"
                alignItems="center"
                display="flex"
            >
                <Text fontSize="1.1rem" fontWeight="700">
                    Room link and password
                </Text>
                <ModalCloseButton position="unset" onClick={closeModel} />
            </ModalHeader>

            <ModalBody pb={4}>
                <CopyField
                    inputCopyValue={roomId}
                    labelText="Room Links"
                    marginTop="0rem"
                    fieldType="ROOM_URL"
                    key={'room link'}
                    type="meetp"
                />

                {roomPassword && (
                    <CopyField
                        inputCopyValue={roomPassword}
                        labelText="Room Password"
                        marginTop="0.7rem"
                        fieldType="ROOM_PASSWORD"
                        key={'room password'}
                        type="meetp"
                    />
                )}
            </ModalBody>

            <ModalFooter
                justifyContent="center"
                alignItems="center"
                display="flex"
                gap="1rem"
                borderColor="main.bg.sec"
                pt=".5rem"
            >
                <ShareModalFooter qrModalOnOpen={onOpen} />
            </ModalFooter>
            <QrModal isOpen={isOpen} onClose={onClose} />
        </ModalContent>
    );
};

export default StepShare;
