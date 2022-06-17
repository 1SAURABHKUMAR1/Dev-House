import { Modal, ModalOverlay } from '@chakra-ui/react';

import React, { useState } from 'react';

import { StepShare, OpenRoomModal } from '../../../index';

import { CreateRoomModalProps } from '../../../../Types';

const CreateRoomModal = ({
    isOpen,
    onClose,
    inputInitalRef,
}: CreateRoomModalProps) => {
    const [roomModalSteps] = useState({
        1: OpenRoomModal,
        2: StepShare,
    });
    const [modalNumber, setModalNumber] = useState(1);
    const CurrentStep =
        roomModalSteps[modalNumber as keyof typeof roomModalSteps];

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                blockScrollOnMount
                isCentered
                initialFocusRef={inputInitalRef}
                closeOnOverlayClick={false}
            >
                <ModalOverlay backdropFilter="blur(3px)" />

                <CurrentStep
                    inputInitalRef={inputInitalRef}
                    onClose={onClose}
                    nextModal={setModalNumber}
                />
            </Modal>
        </>
    );
};

export default CreateRoomModal;
