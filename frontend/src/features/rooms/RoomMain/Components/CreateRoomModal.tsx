import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';

import { ModalButtons } from '../../../index';

import { CreateRoomModalProps } from '../../../../Types';

const CreateRoomModal = ({
    isOpen,
    onClose,
    createRef,
}: CreateRoomModalProps) => {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                blockScrollOnMount
                isCentered
            >
                <ModalOverlay backdropFilter="blur(3px)" />
                <ModalContent>
                    <ModalHeader
                        justifyContent="space-between"
                        alignItems="center"
                        display="flex"
                    >
                        <Text fontSize="1.1rem" fontWeight="700">
                            Enter the topic to be discussed
                        </Text>
                        <ModalCloseButton position="unset" />
                    </ModalHeader>

                    <ModalBody pb={6}>
                        <Input
                            px="2rem"
                            bg="main.input-bg"
                            color="main.text.white"
                            type="text"
                            borderRadius="0.4rem"
                            placeholder="Enter room name"
                        />

                        <Text pt="5" fontWeight="700" fontSize="1.05rem">
                            Room Type
                        </Text>

                        <ModalButtons />
                    </ModalBody>

                    <ModalFooter
                        justifyContent="center"
                        alignItems="center"
                        display="flex"
                        gap="2rem"
                        borderTop="2px solid black"
                        borderColor="main.bg.sec"
                        pt="1.5rem"
                    >
                        <Button
                            bg="main.blue"
                            textColor="white"
                            borderRadius="1.4rem"
                            _focus={{}}
                            _active={{}}
                            _hover={{ bg: 'main.blue.hover' }}
                        >
                            Lets Go
                        </Button>

                        <Button onClick={onClose} borderRadius="1.4rem">
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateRoomModal;
