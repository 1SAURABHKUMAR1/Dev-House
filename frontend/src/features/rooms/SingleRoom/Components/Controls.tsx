import { Button, Image } from '@chakra-ui/react';

import { BsFillChatDotsFill } from 'react-icons/bs';

import { ControlsProps } from '../../../../Types';

const Controls = ({ btnRef, onOpen }: ControlsProps) => {
    return (
        <>
            <Button
                bg="main.input-bg"
                textColor="white"
                borderRadius="50%"
                padding="0px"
                _focus={{}}
                _active={{}}
                _hover={{ bg: 'main.bg.black.hover' }}
            >
                <Image src="/images/hand-icon.svg" />
            </Button>
            <Button
                bg="main.input-bg"
                textColor="white"
                borderRadius="1.4rem"
                _focus={{}}
                _active={{}}
                _hover={{ bg: 'main.bg.black.hover' }}
                gap="0.5rem"
                fontSize="0.9rem"
            >
                <Image src="/images/hand-leave.svg" />
                Leave quietly
            </Button>
            <Button
                bg="main.input-bg"
                textColor="white"
                borderRadius="1.4rem"
                _focus={{}}
                _active={{}}
                _hover={{ bg: 'main.bg.black.hover' }}
                fontSize="0.9rem"
                leftIcon={<BsFillChatDotsFill />}
                onClick={onOpen}
                ref={btnRef}
            >
                Chat Box
            </Button>
        </>
    );
};

export default Controls;
