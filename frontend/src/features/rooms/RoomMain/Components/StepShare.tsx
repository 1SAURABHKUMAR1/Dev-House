import {
    Button,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Text,
} from '@chakra-ui/react';

import { stepShareProps } from '../../../../Types';

const StepShare = ({ nextModal }: stepShareProps) => {
    // TODO:

    // if roomType === 'GLOBAL' => generate  qr code from backend and redirect to stepShare to share link for room qr code and add icons for share to whatsapp , twitter or copy from clipboarrd or download qr code
    // if roomType === 'Private' | 'Social' => generate password and qr code from backend and redirect to stepShare to share link for room link, password and qr code and add icons for share to whatsapp , twitter or copy from clipboarrd or download qr code

    return (
        <ModalContent>
            <ModalHeader
                justifyContent="space-between"
                alignItems="center"
                display="flex"
            >
                <Text fontSize="1.1rem" fontWeight="700">
                    Room User Name and Id
                </Text>
                <ModalCloseButton
                    position="unset"
                    onClick={() => {
                        nextModal(1);
                    }}
                />
            </ModalHeader>

            <ModalBody pb={7} mt="4" textAlign="center">
                username is -- and password is ----
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
                    Copy
                </Button>
            </ModalFooter>
        </ModalContent>
    );
};

export default StepShare;
